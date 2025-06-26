<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use Prism\Prism\Prism;
use Prism\Prism\Enums\Provider;


class TesteController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $input = $request->input('input');

        $response = Prism::text()
            ->using(Provider::OpenAI, 'gpt-4o-mini')
            ->withPrompt($input)
            ->asText();

        // Aqui você pode adicionar sua lógica com Prisma
        // Por enquanto, vamos retornar um exemplo simples
        return response()->json([
            'message' => $response->text,
            'data' => [
                'input' => $input,
                'timestamp' => now(),
                'status' => 'success'
            ]
        ]);
    }
} 