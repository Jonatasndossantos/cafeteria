<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Processo;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        if(auth()->user()->perfilAcesso == 'admin'){
            return Inertia::render('Espadas/Documentos', [
                'auth' => [
                    'user' => auth()->user(),
                ],
                'processos' => Processo::all(),
            ]);
        }
        
        return Inertia::render('AmbienteServidor/AmbienteServidor', [
            'auth' => [
                'user' => auth()->user(),
            ],
            'processos' => Processo::all(),
        ]);

    }
}
