<?php

namespace Database\Seeders;

use App\Models\Usuario;
use App\Models\Setor;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create default admin user


        // Create sectors
        $setores = [
            ['nome' => 'Produção', 'sigla' => 'PRO'],
            ['nome' => 'Marketing', 'sigla' => 'MKT'],
            ['nome' => 'Administração', 'sigla' => 'ADM'],
            ['nome' => 'Finanças', 'sigla' => 'FIN'],
            ['nome' => 'Atendimento', 'sigla' => 'ATE'],
        ];

        foreach ($setores as $index => $setor) {
            $setorCriado = Setor::firstOrCreate(
                ['sigla' => $setor['sigla']],
                ['nome' => $setor['nome']]
            );

            // Create one user for each sector
            Usuario::firstOrCreate(
                ['email' => strtolower($setor['sigla']) . '@example.com'],
                [
                    'nome' => 'Usuário ' . $setor['sigla'],
                    'cpf' => '000.000.000-' . str_pad($index + 10, 2, '0', STR_PAD_LEFT),
                    'dataNasc' => '1990-01-01',
                    'matricula' => 'MAT' . $setor['sigla'] . rand(1000, 9999),
                    'cargo' => 'Analista',
                    'celular' => '(00) 00000-0000',
                    'password' => Hash::make('senha123'),
                    'setor_id' => $setorCriado->id,
                    'perfilAcesso' => 'usuario'
                ]
            );
        }
        
        $setorAdmin = Setor::where('sigla', 'ADM')->first();
        
        Usuario::firstOrCreate(
            ['email' => 'admin@admin.com'],
            [
                'nome' => 'Administrador',
                'cpf' => '100.000.000-00',
                'dataNasc' => '1990-01-01',
                'matricula' => 'ADM001',
                'cargo' => 'Administrador',
                'celular' => '(00) 00000-0000',
                'password' => Hash::make('admin123'),
                'perfilAcesso' => 'admin',
                'setor_id' => $setorAdmin ? $setorAdmin->id : 3
            ]
        );

        // Executar seeder de processos e arquivos
        // $this->call(ProcessosArquivosSeeder::class);
    }
}
