<?php

namespace App\Services;

use App\Traits\AiPromptTrait;
use App\Traits\AiSchemaTrait;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Prism\Prism\Prism;
use Prism\Prism\Enums\Provider;
use Prism\Prism\Schema\ObjectSchema;

class AiService
{
    use AiPromptTrait, AiSchemaTrait;

    protected const CACHE_TIME = 3600; // 1 hour

    public function generateResponse(array $data): array
    {
        try {
            $type = $data['type'] ?? 'institutional';
            $cacheKey = $this->generateCacheKey($type, $data);

            // Check cache first
            if (Cache::has($cacheKey)) {
                Log::info("Cache hit for key: {$cacheKey}");
                return Cache::get($cacheKey);
            }

            // Get schema and prompt
            $schema = $this->getJsonSchema($type);
            $prompt = $this->getPrompt($type, $data);
            $systemRole = $this->getSystemRole($type);

            // Make AI call using Prism's structured API
            $response = Prism::structured()
                ->using(Provider::OpenAI, 'gpt-4')
                ->withSystemPrompt($systemRole)
                ->withPrompt($prompt)
                ->withSchema($schema)
                ->asStructured();

            // Process and validate response
            $processedResponse = $this->processResponse($response->structured, $type);
            
            // Cache the response
            Cache::put($cacheKey, $processedResponse, self::CACHE_TIME);
            
            return $processedResponse;

        } catch (\Exception $e) {
            Log::error('AI Service Error: ' . $e->getMessage(), [
                'exception' => $e,
                'data' => $data
            ]);

            return $this->returnEmptyFallback($type);
        }
    }

    protected function processResponse($response, string $type): array
    {
        if (!is_array($response)) {
            Log::error('Invalid AI response format', [
                'response' => $response,
                'type' => $type
            ]);
            return $this->returnEmptyFallback($type);
        }

        // Validate required fields
        $schema = $this->getJsonSchema($type);
        $requiredFields = $schema->getRequiredFields();
        
        foreach ($requiredFields as $field) {
            if (!isset($response[$field]) || empty($response[$field])) {
                Log::error('Missing required field in AI response', [
                    'field' => $field,
                    'type' => $type,
                    'response' => $response
                ]);
                return $this->returnEmptyFallback($type);
            }
        }

        return $response;
    }

    protected function generateCacheKey(string $type, array $data): string
    {
        $relevantData = array_intersect_key($data, array_flip([
            'municipality',
            'institution',
            'address',
            'objectDescription',
            'valor',
            'date'
        ]));

        return 'ai_response_' . $type . '_' . md5(json_encode($relevantData));
    }

    protected function returnEmptyFallback(string $type): array
    {
        $schema = $this->getJsonSchema($type);
        $requiredFields = $schema->getRequiredFields();
        
        $fallback = [];
        foreach ($requiredFields as $field) {
            $fallback[$field] = '';
        }

        return $fallback;
    }
} 