<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class ProdutoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Produto::query();

        // Filtro por categoria
        if ($request->filled('categoria')) {
            $query->where('categoria', $request->categoria);
        }

        // Busca por nome ou categoria
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('nome', 'ilike', '%' . $search . '%')
                  ->orWhere('categoria', 'ilike', '%' . $search . '%');
            });
        }

        // Filtro por preço mínimo
        if ($request->filled('preco_min')) {
            $query->where('preco', '>=', $request->preco_min);
        }

        // Filtro por preço máximo
        if ($request->filled('preco_max')) {
            $query->where('preco', '<=', $request->preco_max);
        }

        // Ordenação
        $orderBy = $request->get('order_by', 'nome');
        $orderDirection = $request->get('order_direction', 'asc');

        // Validar campos de ordenação permitidos
        $allowedOrderFields = ['nome', 'preco', 'categoria'];
        if (!in_array($orderBy, $allowedOrderFields)) {
            $orderBy = 'nome';
        }

        $query->orderBy($orderBy, $orderDirection);

        $produtos = $query->paginate(12)
                         ->withQueryString();

        // Buscar categorias únicas para o filtro
        $categorias = Produto::select('categoria')
                            ->distinct()
                            ->orderBy('categoria')
                            ->pluck('categoria');

        // Estatísticas para o dashboard
        $stats = [
            'total_produtos' => (int) Produto::count(),
            'categorias_count' => (int) $categorias->count(),
            'preco_medio' => Produto::avg('preco') ? (float) Produto::avg('preco') : null,
            'preco_min' => Produto::min('preco') ? (float) Produto::min('preco') : null,
            'preco_max' => Produto::max('preco') ? (float) Produto::max('preco') : null,
        ];

        return Inertia::render('Produtos/Index', [
            'produtos' => $produtos,
            'categorias' => $categorias,
            'filtros' => $request->only(['categoria', 'search', 'preco_min', 'preco_max', 'order_by', 'order_direction']),
            'stats' => $stats
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Buscar categorias existentes para sugestão
        $categorias = Produto::select('categoria')
                            ->distinct()
                            ->orderBy('categoria')
                            ->pluck('categoria');

        return Inertia::render('Produtos/Create', [
            'categorias' => $categorias
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'preco' => 'required|numeric|min:0',
            'categoria' => 'required|string|max:255',
            'imagem' => 'nullable|string|max:255',
        ]);

        $produto = Produto::create($validated);

        return Redirect::route('produtos.index')
                       ->with('success', 'Produto criado com sucesso!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $produto = Produto::findOrFail($id);

        return Inertia::render('Produtos/Show', [
            'produto' => $produto
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $produto = Produto::findOrFail($id);

        // Buscar categorias existentes para sugestão
        $categorias = Produto::select('categoria')
                            ->distinct()
                            ->orderBy('categoria')
                            ->pluck('categoria');

        return Inertia::render('Produtos/Edit', [
            'produto' => $produto,
            'categorias' => $categorias
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $produto = Produto::findOrFail($id);

        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'preco' => 'required|numeric|min:0',
            'categoria' => 'required|string|max:255',
            'imagem' => 'nullable|string|max:255',
        ]);

        $produto->update($validated);

        return Redirect::route('produtos.index')
                       ->with('success', 'Produto atualizado com sucesso!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $produto = Produto::findOrFail($id);
        $produto->delete();

        return Redirect::route('produtos.index')
                       ->with('success', 'Produto removido com sucesso!');
    }
}
