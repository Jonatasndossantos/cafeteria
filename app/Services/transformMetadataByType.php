<?php

namespace App\Services;

class TransformMetadataByType
{
    /**
     * Transforma metadata baseado no tipo de documento
     */
    public function transformMetadataByType(string $type, array $metadata): array
    {
        return match ($type) {
            'Planejamento' => $this->transformToPlanejamento($metadata),
            'DFD' => $this->transformToDFD($metadata),
            'ETP' => $this->transformToETP($metadata),
            'TR' => $this->transformToTR($metadata),
            default => $metadata,
        };
    }

    private function transformToPlanejamento(array $metadata): array
    {
        
        return $metadata;
    }

    private function transformToDFD(array $metadata): array
    {
        return $metadata;
    }

    private function transformToETP(array $metadata): array
    {
        return $metadata;
    }

    private function transformToTR(array $metadata): array
    {
        return $metadata;
    }

// // Transforma o metadata baseado no tipo de documento
// $transformedMetadata = $this->transformMetadataByType(
//     $validated['document_type'], 
//     $validated['metadata']
// );

// Transforma o metadata se foi fornecido
// if (isset($validated['metadata'])) {
//     $validated['metadata'] = $this->transformMetadataByType(
//         $arquivo->document_type, 
//         $validated['metadata']
//     );
// }

// Transforma dados do processo para o tipo de documento
// $transformedMetadata = $this->transformProcessoToDocument($type, $data ?? []);

/**
     * Transforma dados do processo para o tipo de documento
     */
    // private function transformProcessoToDocument(string $type, array $processoData): array
    // {
    //     return match ($type) {
    //         'Planejamento' => $this->transformProcessoToPlanejamento($processoData),
    //         'DFD' => $this->transformProcessoToDFD($processoData),
    //         'ETP' => $this->transformProcessoToETP($processoData),
    //         'TR' => $this->transformProcessoToTR($processoData),
    //         default => $processoData,
    //     };
    // }



}