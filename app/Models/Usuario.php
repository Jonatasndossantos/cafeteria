<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use HasApiTokens;

    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;
    use Notifiable;
    use TwoFactorAuthenticatable;
    use HasApiTokens;
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $table = 'gestaoUsuarios';

    protected $fillable = [
        'nome',
        'cpf',
        'dataNasc',
        'matricula',
        'cargo',
        'email',
        'celular',
        'password',
        'setor_id',
        'perfilAcesso'
    ];

    protected $with = ['setor'];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'dataNasc' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime'
    ];

    public function setor()
    {
        return $this->belongsTo(Setor::class);
    }
} 