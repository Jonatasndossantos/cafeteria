<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setor;
use App\Models\Usuario;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SetorController extends Controller
{
    /**
     * Display a listing of the sectors.
     */
    public function index()
    {
        $setores = Setor::all();
        return Inertia::render('Setores/Setores', [
            'auth' => [
                'user' => auth()->user(),
            ],
            'setores' => $setores
        ]);
    }

    /**
     * Store a newly created sector in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nome' => 'required|string|max:255',
            'sigla' => 'required|string|max:10|unique:setores,sigla'
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator->errors());
        }

        try {
            $setor = Setor::create($request->all());
            return redirect()->route('setores.index');
        } catch (\Exception $e) {
            return back()->with('error', 'Erro ao criar setor: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified sector.
     */
    public function show($id)
    {
        $setor = Setor::findOrFail($id);
        return response()->json($setor);
    }

    /**
     * Update the specified sector in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nome' => 'required|string|max:255',
            'sigla' => 'required|string|max:10|unique:setores,sigla,' . $id
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator->errors());
        }

        try {
            $setor = Setor::findOrFail($id);
            $setor->update($request->all());
            return redirect()->route('setores.index');
        } catch (\Exception $e) {
            return back()->with('error', 'Erro ao atualizar setor: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified sector from storage.
     */
    public function destroy($id)
    {
        try {
            $setor = Setor::findOrFail($id);
            $setor->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao excluir setor: ' . $e->getMessage()], 500);
        }
    }

    public function edit($id)
    {
        $setor = Setor::findOrFail($id);
        return Inertia::render('Setores/EditSetor', [
            'setor' => $setor
        ]);
    }

    public function usuarios($id)
    {
        $setor = Setor::findOrFail($id);
        $usuarios = Usuario::where('setor_id', $id)->get();
        
        return Inertia::render('Setores/SetorUsuarios', [
            'id' => $id,
            'setor' => $setor,
            'usuarios' => $usuarios
        ]);
    }
}
