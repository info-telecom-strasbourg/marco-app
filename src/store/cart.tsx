import { CartContext, CartDispatchContext } from "../context/cartContext";
import { PropsWithChildren, useContext, useReducer } from "react";

import { produce } from "immer"

export const useCart = () => useContext(CartContext);
export const useCartDispatch = () => useContext(CartDispatchContext);

type CartAction =
  | { type: "reset" }
  | { type: "addArticle", value: Article }
  | { type: "removeArticle", value: Article["id"] }
  | { type: "increaseQuantity", value: Article["id"] }
  | { type: "decreaseQuantity", value: Article["id"] }

function storeReducer(state: Cart, action: CartAction): Cart {
  return produce(state, draft => {
    switch (action.type) {
      case "addArticle": {
        draft.items.push({ article: action.value, quantity: 1 });
        return draft;
      }

      case "removeArticle": {
        const target = draft.items.findIndex(item => item.article.id == action.value);
        draft.items.splice(target, 1);
        return draft;
      }

      case "increaseQuantity": {
        draft.items.find(item => item.article.id == action.value)!.quantity += 1;
        return draft;
      }

      case "decreaseQuantity": {
        draft.items.find(item => item.article.id == action.value)!.quantity -= 1;
        return draft;
      }

      case "reset": {
        draft.items = []
        return draft;
      }
    }
  })
}

export function useStore() {
  const [state, dispatch] = useReducer(storeReducer, { items: [] })

  const addArticle = (payload: Article) => dispatch({
    type: "addArticle",
    value: payload
  })

  const removeArticle = (payload: Article["id"]) => dispatch({
    type: "removeArticle",
    value: payload
  })

  const increaseQuantity = (payload: Article["id"]) => dispatch({
    type: "increaseQuantity",
    value: payload
  })

  const decreaseQuantity = (payload: Article["id"]) => dispatch({
    type: "decreaseQuantity",
    value: payload
  })

  return {
    store: state,
    addArticle,
    removeArticle,
    increaseQuantity,
    decreaseQuantity
  }
}

export function CartProvider({ children }: PropsWithChildren) {
  const {
    store,

    addArticle,
    removeArticle,

    increaseQuantity,
    decreaseQuantity
  } = useStore();

  return (
    <CartContext.Provider value={store}>
      <CartDispatchContext.Provider value={{ addArticle, removeArticle, increaseQuantity, decreaseQuantity }}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  )
}
