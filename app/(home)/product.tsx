import { FlashList } from "@shopify/flash-list";
import { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

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

function Circle({ color, size }: { color: string, size: number }) {
  return <View style={{
    backgroundColor: color,
    height: size,
    width: size,
    borderRadius: size / 2
  }}></View>
}

function ProductCard({ product }: { product: Product }) {
  return (
    <View>
      <Circle size={40} color={product.color} />
      <View>
        <Text>{product.title}</Text>
        <Text>{product.price}</Text>
      </View>

      <View style={style.productAmount}>
        <TouchableOpacity style={style.amountButton}>
          <Text style={style.amountButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={style.amountText}>0</Text>
        <TouchableOpacity style={style.amountButton}>
          <Text style={style.amountButtonText}>+</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

function ProductList({ products }: { products: Product[] }) {
  return (
    <FlashList
      renderItem={({ item }) => {
        return <ProductCard product={item} />
      }}
      keyExtractor={(product) => product.id.toString()}
      data={products}
    />
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
    <View style={style.mainContainer}>
      <ProductList products={items} />
    </View>
  )
}

const style = StyleSheet.create({
  mainContainer: {
    padding: 8,
    backgroundColor: 'light-gray'
  },
  amountButton: {
    width: 30,
    height: 30,
    backgroundColor: '#ffa726',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
  },
  productAmount: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})
