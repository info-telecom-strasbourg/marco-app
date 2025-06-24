interface Article {
  id: number,
  name: string,
  title: string,
  price: string,
  color: string
}

interface CartItem {
  article: Article,
  quantity: number
}

interface Cart {
  items: CartItem[]
}

interface CartDispatch {
  addArticle: (article: Article) => void
  removeArticle: (articleId: Article["id"]) => void
  increaseQuantity: (articleId: Article["id"]) => void
  decreaseQuantity: (articleId: Article["id"]) => void
}
