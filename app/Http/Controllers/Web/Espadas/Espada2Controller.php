<?php

namespace App\Http\Controllers\Web\Espadas;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class Espada2Controller extends Controller
{
    public function create()
    {
        return Inertia::render('Espadas/Espada2/Create', [
            'auth' => [
                'user' => auth()->user()
            ]
        ]);
    }
} 