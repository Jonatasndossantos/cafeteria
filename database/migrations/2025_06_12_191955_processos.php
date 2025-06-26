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
        Schema::create('processos', function (Blueprint $table) {
            $table->id();
            $table->string('numero_processo');
            $table->string('modalidade')->nullable();
            $table->string('tipo');
            $table->date('data');
            $table->text('objeto');
            $table->decimal('valor', 10, 2)->nullable();
            $table->foreignId('setor_id')->constrained('setores');
            $table->foreignId('usuario_id')->constrained('gestaoUsuarios');
            $table->string('status')->default('draft');
            $table->json('tags')->nullable();
            $table->json('autenticidade')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('processos');
    }
};
