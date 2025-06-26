<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Arquivo extends Model
{
    protected $table = 'arquivos';

    protected $fillable = [
        'name',
        'description',
        'file_path',
        'file_type',
        'document_type',
        'processo_id',
        'usuario_id',
        'status',
        'metadata'
    ];

    protected $casts = [
        'metadata' => 'array',
        'usuario_id' => 'integer'
    ];

    public function Usuario(): BelongsTo
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }
} 