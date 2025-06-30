<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produto extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'produto';

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nome',
        'preco',
        'categoria',
        'imagem'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'preco' => 'decimal:2'
    ];

    /**
     * Scope para produto ativos
     */
    public function scopeAtivos($query)
    {
        return $query->where('ativo', true);
    }

    /**
     * Scope para filtrar por categoria
     */
    public function scopeCategoria($query, $categoria)
    {
        return $query->where('categoria', $categoria);
    }

    /**
     * Accessor para formatar o preço
     */
    public function getPrecoFormatadoAttribute()
    {
        return 'R$ ' . number_format($this->preco, 2, ',', '.');
    }

    /**
     * Accessor para URL da imagem
     */
    public function getImagemUrlAttribute()
    {
        if ($this->imagem) {
            // Se a imagem já for uma URL completa, retorna como está
            if (str_starts_with($this->imagem, 'http')) {
                return $this->imagem;
            }
            // Caso contrário, assume que está no bucket do Supabase
            return config('supabase.storage_url') . '/images/' . $this->imagem;
        }
        return null;
    }
}
