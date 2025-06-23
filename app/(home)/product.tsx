import { FlashList } from "@shopify/flash-list";
import { useState, useEffect, useRef } from "react";
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
  // ToDo: Migrate package to v2 branch for new hook
  // const [amount, setAmount] = useRecyclingState();

  // Due to FlashList recycling, we have to reset the product number to 0 every time the item goes out of viewport
  // To keep the counter up to date, a global store have to be used to track every item counter (or at least the ones we want)
  const lastId = useRef(product.id);
  const [amount, setAmount] = useState(0);
  if (lastId.current != product.id) {
    lastId.current = product.id;
    setAmount(0);
  }

  return (
    <View style={style.productContainer}>
      <Circle size={40} color={product.color} />

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16 }}>{product.title}</Text>
        <Text style={{ fontSize: 12 }}>{product.price}</Text>
      </View>

      <View style={style.productAmount}>
        <TouchableOpacity style={style.amountButton} onPress={() => setAmount(() => amount - 1)}>
          <Text style={style.amountButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={style.amountText}>{amount}</Text>
        <TouchableOpacity style={style.amountButton} onPress={() => setAmount(() => amount + 1)}>
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
      estimatedItemSize={100}
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
    flex: 1,
    padding: 8,
    backgroundColor: 'light-gray'
  },
  productContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 4,
    padding: 10,
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
