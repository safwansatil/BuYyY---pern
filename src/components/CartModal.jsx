import React from 'react';
import { useCartStore } from '../store/useCartStore';
import { XIcon, Trash2Icon, PlusIcon, MinusIcon, ShoppingCartIcon } from 'lucide-react';
import toast from 'react-hot-toast';

function CartModal() {
    const {
        items,
        isOpen,
        toggleCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice
    } = useCartStore();

    const handleCheckout = () => {
        if (items.length === 0) {
            toast.error('Your cart is empty!');
            return;
        }
        toast.success('Checkout functionality coming soon!');
        // Add checkout logic here
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={toggleCart}
            />

            {/* Modal */}
            <div className="relative bg-base-100 rounded-2xl shadow-2xl w-full max-w-md mx-4 max-h-[80vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-base-300">
                    <div className="flex items-center gap-3">
                        <ShoppingCartIcon className="size-6 text-primary" />
                        <h2 className="text-xl font-semibold">Shopping Cart</h2>
                        <span className="badge badge-primary badge-sm">{getTotalItems()}</span>
                    </div>
                    <button
                        onClick={toggleCart}
                        className="btn btn-ghost btn-circle btn-sm"
                    >
                        <XIcon className="size-5" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6">
                    {items.length === 0 ? (
                        <div className="text-center py-8">
                            <ShoppingCartIcon className="size-16 mx-auto text-base-content/30 mb-4" />
                            <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                            <p className="text-base-content/60">Add some products to get started!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 p-4 bg-base-200 rounded-xl">
                                    {/* Product Image */}
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="size-16 object-cover rounded-lg"
                                    />

                                    {/* Product Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium truncate">{item.name}</h3>
                                        <p className="text-primary font-semibold">
                                            ${Number(item.price).toFixed(2)}
                                        </p>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="btn btn-ghost btn-sm btn-circle"
                                        >
                                            <MinusIcon className="size-4" />
                                        </button>
                                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="btn btn-ghost btn-sm btn-circle"
                                        >
                                            <PlusIcon className="size-4" />
                                        </button>
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="btn btn-ghost btn-sm btn-circle text-error"
                                    >
                                        <Trash2Icon className="size-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t border-base-300 p-6 space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold">Total:</span>
                            <span className="text-2xl font-bold text-primary">
                                ${getTotalPrice().toFixed(2)}
                            </span>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={clearCart}
                                className="btn btn-outline btn-error flex-1"
                            >
                                Clear Cart
                            </button>
                            <button
                                onClick={handleCheckout}
                                className="btn btn-primary flex-1"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CartModal; 