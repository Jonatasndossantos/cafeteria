<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\Setor;
use Inertia\Inertia;
use App\Models\Arquivo;
use App\Http\Resources\DocumentResource;

class EspadasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function show(Request $request)
    {
        $id = $request->input('id');

        $document = Arquivo::where('id', $id)->first();
        return Inertia::render("Espadas/{$document->document_type}/Create", [
            'auth' => [
                'user' => Auth::user()
            ],
            'setor' => Setor::all(),
            'document' => $document ? new DocumentResource($document) : null
        ]);
    }
}