import { FlashList } from "@shopify/flash-list";
import { useState, useEffect } from "react";
import { Text } from "react-native";

interface APIResponse {
  data: {
    id: number,
    product_type: string,
    products: Product[]
  }[]
}

interface Product {
  id: number,
  name: string,
  title: string,
  price: string,
  color: string
}

function ProductComponent({ product }: { product: Product }) {
  return (
    <Text>{product.title}</Text>
  )
}

export default function ProductPage() {
  const [items, setItems] = useState<Product[] | null>(null);

  useEffect(() => {
    fetch("https://fouaille.bde-tps.fr/api/product")
      .then(res => res.json())
      .then((payload: APIResponse) => setItems(payload.data[0].products))
  }, [])

  if (!items) {
    return <Text>Please wait while we fetch the products...</Text>
  }

  return (
    <FlashList
      renderItem={({ item }) => {
        return <ProductComponent product={item} />
      }}
      data={items}
    />
  )
}
