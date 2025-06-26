<?php

namespace App\Providers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Request;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // O Vite::prefetch() é usado para pré-carregar assets JavaScript/CSS
        // O parâmetro concurrency: 3 significa que até 3 arquivos podem ser baixados simultaneamente
        // Isso ajuda a otimizar o carregamento inicial da aplicação
        Vite::prefetch(concurrency: 3);
        (Auth::user());
        Inertia::share([
            'auth' => fn () => [
                'user' => auth()->user(),
            ],
        ]);
    }
}
