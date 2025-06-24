interface APIResponse {
  data: {
    id: number,
    product_type: string,
    products: Article[]
  }[]
}
