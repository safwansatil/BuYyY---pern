import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            addToCart: (product) => {
                const { items } = get();
                const existingItem = items.find(item => item.id === product.id);

                if (existingItem) {
                    set({
                        items: items.map(item =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        )
                    });
                } else {
                    set({
                        items: [...items, { ...product, quantity: 1 }]
                    });
                }
            },

            removeFromCart: (productId) => {
                const { items } = get();
                set({
                    items: items.filter(item => item.id !== productId)
                });
            },

            updateQuantity: (productId, quantity) => {
                const { items } = get();
                if (quantity <= 0) {
                    get().removeFromCart(productId);
                } else {
                    set({
                        items: items.map(item =>
                            item.id === productId
                                ? { ...item, quantity }
                                : item
                        )
                    });
                }
            },

            clearCart: () => {
                set({ items: [] });
            },

            toggleCart: () => {
                set(state => ({ isOpen: !state.isOpen }));
            },

            getTotalItems: () => {
                const { items } = get();
                return items.reduce((total, item) => total + item.quantity, 0);
            },

            getTotalPrice: () => {
                const { items } = get();
                return items.reduce((total, item) => total + (item.price * item.quantity), 0);
            },
        }),
        {
            name: 'cart-storage',
        }
    )
); 