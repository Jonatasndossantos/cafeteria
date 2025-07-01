<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display the orders panel.
     */
    public function index()
    {
        return Inertia::render('Orders/OrdersPanel');
    }

    /**
     * Display the specified order.
     */
    public function show(string $id)
    {
        // Implementar quando necessário
        return response()->json(['message' => 'Order details endpoint']);
    }

    /**
     * Update the order status.
     */
    public function updateStatus(Request $request, string $id)
    {
        // Implementar quando necessário
        return response()->json(['message' => 'Order status updated']);
    }

    /**
     * Update the payment status.
     */
    public function updatePaymentStatus(Request $request, string $id)
    {
        // Implementar quando necessário
        return response()->json(['message' => 'Payment status updated']);
    }
}
