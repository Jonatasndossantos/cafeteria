<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Processo extends Model
{
    protected $fillable = [
        'numero_processo',
        'modalidade',
        'data',
        'objeto',
        'setor_id',
        'usuario_id',
        'valor',
        'status',
        'tipo',
        'secretaria',
        'numero_documento',
        'tags',
        'autenticidade'
    ];

    protected $casts = [
        'data' => 'date:Y-m-d',
        'valor' => 'decimal:2',
        'tags' => 'array',
        'autenticidade' => 'array'
    ];

    public function setor(): BelongsTo
    {
        return $this->belongsTo(Setor::class);
    }

    public function usuario(): BelongsTo
    {
        return $this->belongsTo(Usuario::class);
    }
} 