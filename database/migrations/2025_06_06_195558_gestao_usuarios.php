<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('gestaoUsuarios', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('cpf')->unique();
            $table->date('dataNasc');
            $table->string('matricula')->unique();
            $table->string('cargo');
            $table->string('email')->unique();
            $table->string('celular')->nullable();
            $table->string('password');
            $table->foreignId('setor_id')->nullable()->constrained('setores')->onDelete('set null');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gestaoUsuarios');
    }
};
