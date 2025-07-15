import { useAuth } from "@/auth/useAuth";
import { Cart } from "@/schemas/cart";
import { useMutation, useQuery } from "@tanstack/react-query";

async function getAll(token: string) {
  try {
    const res = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/api/fouaille/carts`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function get(cartId: number, token: string) {
  try {
    const res = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/api/fouaille/carts/${cartId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function post(cart: Cart, token: string) {
  try {
    const payload = cart.items.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
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

export function useCheckoutCart(cart: Cart) {
  const { token } = useAuth();

  return useMutation({
    mutationKey: ["carts"],
    mutationFn: () => post(cart, token),
  });
}

export function useDeleteCart(cartId: number) {
  const { token } = useAuth();

  return useMutation({
    mutationKey: ["carts"],
    mutationFn: () => deleteCart(cartId, token),
  });
}
