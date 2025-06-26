<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProcessoController;
use App\Http\Controllers\SetorController;
use App\Http\Controllers\GestaoUsuariosController;
use App\Http\Controllers\Web\Espadas;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        // 'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth:sanctum','verified'])->group(function ()
{
    Route::get('/ambienteservidor', [ProcessoController::class, 'ambienteServidor'])->name('ambienteServidor');

    Route::get('/perfil', function () {
        return Inertia::render('Perfil/Perfil');
    })->name('perfil');

    Route::get('/painel/prefeito', function () {
        return Inertia::render('Paineis/Prefeito/Create', [
            'auth' => [
                'user' => auth()->user()
            ]
        ]);
    })->name('painel.prefeitura');


    // Rota para listar documentos
    Route::get('/documentos', [ProcessoController::class, 'index'])->name('documents.index');


    Route::get('/espada1', function () {return back();});
    Route::post('/espada1', [Espadas\Espada1Controller::class, 'store'])->name('espada1.store');
    Route::get('/espada1/{id}', [Espadas\Espada1Controller::class, 'show'])->name('espada1.show');
    Route::post('/espada1/{id}', [Espadas\Espada1Controller::class, 'update'])->name('espada1.update');

    Route::get('/planejamento', function () {return back();});
    Route::post('/planejamento', [Espadas\PlanejamentoController::class, 'store'])->name('planejamento.store');
    Route::get('/planejamento/{id}', [Espadas\PlanejamentoController::class, 'show'])->name('planejamento.show');
    Route::post('/planejamento/{id}', [Espadas\PlanejamentoController::class, 'update'])->name('planejamento.update');

    Route::get('/processos/create', [ProcessoController::class, 'create'])->name('processos.create');
    Route::get('/processos', [ProcessoController::class, 'index'])->name('processos.index');
    Route::post('/processos', [ProcessoController::class, 'store'])->name('processos.store');
    Route::get('/processos/{id}', [ProcessoController::class, 'show'])->name('processos.show');

    Route::get('/dashboard', DashboardController::class)->name('dashboard');
});

// Rotas que requerem acesso de admin
Route::middleware(['auth:sanctum', 'verified', 'admin'])->group(function () {
    // Rotas de Setores
    Route::get('/setores', [SetorController::class, 'index'])->name('setores.index');
    Route::get('/setores/create', [SetorController::class, 'create'])->name('setores.create');
    Route::post('/setores', [SetorController::class, 'store'])->name('setores.store');
    Route::get('/setores/{id}/edit', [SetorController::class, 'edit'])->name('setores.edit');
    Route::put('/setores/{id}', [SetorController::class, 'update'])->name('setores.update');
    Route::delete('/setores/{id}', [SetorController::class, 'destroy'])->name('setores.destroy');

    Route::get('/gestaoUsuarios', [GestaoUsuariosController::class, 'index'])->name('gestaoUsuarios');
    Route::post('/gestaoUsuarios', [GestaoUsuariosController::class, 'store'])->name('gestaoUsuarios.store');

    Route::prefix('gestao-usuarios')->group(function () {
        Route::get('/', [GestaoUsuariosController::class, 'index'])->name('gestao-usuarios.index');
        Route::post('/', [GestaoUsuariosController::class, 'store'])->name('gestao-usuarios.store');
        Route::put('/{usuario}', [GestaoUsuariosController::class, 'update'])->name('gestao-usuarios.update');
        Route::delete('/{usuario}', [GestaoUsuariosController::class, 'destroy'])->name('gestao-usuarios.destroy');
    });
});

Route::get('/api/setores', [SetorController::class, 'index'])->name('setores.index');


require __DIR__.'/auth.php';
