import { createContext } from "react";

const defaultCart: Cart = {
  items: []
}

export const CartContext = createContext<Cart>(defaultCart);

export const CartDispatchContext = createContext<CartDispatch>({
  addArticle: article => { },
  removeArticle: articleId => { },

  increaseQuantity: articleId => { },
  decreaseQuantity: articleId => { }
});
