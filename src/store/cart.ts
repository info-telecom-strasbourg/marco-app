import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { Cart } from "@/schemas/cart";
import type { Product } from "@/schemas/fouaille/product";

type CartStoreAction = {
  addProduct: (product: Product) => void;
  removeProduct: (productId: Product["id"]) => void;
  incrementQuantity: (productId: Product["id"]) => void;
  decrementQuantity: (productId: Product["id"]) => void;
};

// zustand creates a hook that we can call everywhere from our app to access the store data
// For more informations:
// https://zustand.docs.pmnd.rs/guides/typescript
// https://zustand.docs.pmnd.rs/integrations/immer-middleware
export const useCartStore = create<Cart & CartStoreAction>()(
  immer((set) => ({
    items: [],
    addProduct: (product: Product) =>
      set((state) => {
        state.items.push({ product, quantity: 1 });
      }),

    removeProduct: (productId) =>
      set((state) => {
        const target = state.items.findIndex(
          (item) => item.product.id === productId,
        );
        state.items.splice(target, 1);
      }),

    decrementQuantity: (productId) =>
      set((state) => {
        state.items.find((item) => item.product.id === productId)!.quantity -=
          1;
      }),

    incrementQuantity: (productId) =>
      set((state) => {
        state.items.find((item) => item.product.id === productId)!.quantity +=
          1;
      }),
  })),
);
