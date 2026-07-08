import { useAuth } from "@/auth/useAuth";
import { CartItem } from "@/schemas/cart";
import {
  APICartCollectionSchema,
  APICartSchema,
} from "@/schemas/fouaille/cart";
import { CartState } from "@/store/cart";
import { useMutation, useQuery } from "@tanstack/react-query";

async function getAll(token: string) {
  try {
    const payload = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/api/fouaille/carts`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ).then((res) => res.json());

    const carts = APICartCollectionSchema.parse(payload);

    return carts;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function get(cartId: number, token: string) {
  try {
    const payload = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/api/fouaille/carts/${cartId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ).then((res) => res.json());

    const cart = APICartSchema.parse(payload);

    return cart;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function post(cart: CartItem[], token: string) {
  try {
    const payload = cart.map((item) => ({
      product_id: item.product.id,
      amount: item.quantity,
      price: item.product.price * item.quantity,
    }));

    const res = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/api/fouaille/carts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    return res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function deleteCart(cartId: number, token: string) {
  try {
    const res = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/api/fouaille/carts/${cartId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "DELETE",
      },
    );

    return res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// Request is inspired by Shopify REST API
async function completeCart(cartId: number, token: string) {
  try {
    const res = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/api/fouaille/carts/${cartId}/checkout`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "PUT",
      },
    );

    return res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export function useGetAllCarts() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["carts"],
    queryFn: () => getAll(token),
  });
}

export function useGetCart(cartId: number) {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["carts", cartId],
    queryFn: () => get(cartId, token),
  });
}

export function useSubmitCart() {
  const { token } = useAuth();

  return useMutation({
    mutationKey: ["carts"],
    mutationFn: (cart: CartState) => post(cart.items, token),
    onSuccess: (_, cart) => cart.clear(), // clear local cart now that we have sent it to the server
    onError: (err) => console.error(err),
  });
}

export function useDeleteCart(cartId: number) {
  const { token } = useAuth();

  return useMutation({
    mutationKey: ["carts", cartId],
    mutationFn: () => deleteCart(cartId, token),
  });
}

export function useCompleteCart(cartId: number) {
  const { token } = useAuth();

  return useMutation({
    mutationKey: ["carts", cartId],
    mutationFn: () => completeCart(cartId, token),
  });
}
