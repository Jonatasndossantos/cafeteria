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
        Schema::create('arquivos', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('document_type');
            $table->text('description')->nullable();
            $table->string('file_path')->nullable();
            $table->string('file_type')->nullable();
            $table->foreignId('processo_id')->nullable()->constrained('processos')->cascadeOnDelete();
            $table->foreignId('usuario_id')->nullable()->constrained('gestaoUsuarios')->nullOnDelete();
            $table->string('status')->default('draft');
            $table->json('metadata')->nullable();
            $table->json('vinculacoes')->nullable();
            $table->timestamps();
            
            // Constraint única: cada processo só pode ter um documento de cada tipo
            $table->unique(['processo_id', 'document_type'], 'unique_processo_document_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('arquivos');
    }
};
