<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\AiService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AiInvokeController extends Controller
{
    protected $aiService;

    public function __construct(AiService $aiService)
    {
        $this->aiService = $aiService;
        set_time_limit(300); // 5 minutes
    }

    public function __invoke(Request $request): JsonResponse
    {
        try {
            $response = $this->aiService->generateResponse($request->all());
            return response()->json($response);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to generate AI response',
                'message' => $e->getMessage()
            ], 500);
        }
    }
} 