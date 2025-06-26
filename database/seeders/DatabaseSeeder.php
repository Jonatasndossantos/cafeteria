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

        foreach ($setores as $setor) {
            $setorCriado = Setor::create($setor);

            // Create one user for each sector
            Usuario::create([
                'nome' => 'Usuário ' . $setor['sigla'],
                'cpf' => '000.000.000-' . rand(10, 99),
                'dataNasc' => '1990-01-01',
                'matricula' => 'MAT' . $setor['sigla'] . rand(1000, 9999),
                'cargo' => 'Analista',
                'email' => strtolower($setor['sigla']) . '@example.com',
                'celular' => '(00) 00000-0000',
                'password' => Hash::make('senha123'),
                'setor_id' => $setorCriado->id,
                'perfilAcesso' => 'usuario'
            ]);
        }
        Usuario::create([
            'nome' => 'Administrador',
            'cpf' => '100.000.000-00',
            'dataNasc' => '1990-01-01',
            'matricula' => 'ADM001',
            'cargo' => 'Administrador',
            'email' => 'admin@admin.com',
            'celular' => '(00) 00000-0000',
            'password' => Hash::make('admin123'),
            'perfilAcesso' => 'admin',
            'setor_id' => 3
        ]);

        // Executar seeder de processos e arquivos
        // $this->call(ProcessosArquivosSeeder::class);
    }
}
