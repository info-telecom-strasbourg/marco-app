import { FlashList } from "@shopify/flash-list";
import { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useCart, useCartDispatch } from "../../src/store/cart";
import { useNavigation } from "@react-navigation/native";

function Circle({ color, size }: { color: string, size: number }) {
  return <View style={{
    backgroundColor: color,
    height: size,
    width: size,
    borderRadius: size / 2,
  }}></View>
}

function ProductCard({ article }: { article: Article }) {
  const cart = useCart();
  const { addArticle, removeArticle, increaseQuantity, decreaseQuantity } = useCartDispatch();

  const item = cart.items.find(item => item.article.id == article.id);

  const handleAdd = () => addArticle(article);
  const handleIncr = () => increaseQuantity(article.id);
  const handleDecr = () => item!.quantity > 1 ? decreaseQuantity(article.id) : removeArticle(article.id)

  return (
    <View style={style.productContainer}>
      <Circle size={40} color={article.color} />

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16 }}>{article.title}</Text>
        <Text style={{ fontSize: 12 }}>{article.price}€</Text>
      </View>


      <View style={style.productAmount}>
        {
          (!item || item?.quantity == 0) ? (
            <TouchableOpacity style={style.amountButton} onPress={handleAdd}>
              <Text style={style.amountButtonText}>+</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity style={style.amountButton} onPress={handleDecr}>
                <Text style={style.amountButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={style.amountText}>{item?.quantity ?? 0}</Text>
              <TouchableOpacity style={style.amountButton} onPress={handleIncr}>
                <Text style={style.amountButtonText}>+</Text>
              </TouchableOpacity>
            </>
          )
        }
      </View>
    </View>
  )
}

function ProductList({ products }: { products: Article[] }) {
  return (
    <FlashList
      renderItem={({ item }) => {
        return <ProductCard article={item} />
      }}
      keyExtractor={(product) => product.id.toString()}
      data={products}
      estimatedItemSize={100}
      ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
    />
  )
}

function CartButton() {
  const navigation = useNavigation();

  // @ts-ignore
  const handlePress = () => navigation.navigate("cart");

  return (
    <TouchableOpacity onPress={handlePress} style={{ padding: 10, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: "white" }}>Voir mon panier</Text>
    </TouchableOpacity>
  )
}

export default function ProductPage() {
  const [items, setItems] = useState<Article[]>([]);
  const cart = useCart();

  useEffect(() => {
    fetch("https://fouaille.bde-tps.fr/api/product")
      .then(res => res.json())
      .then((payload: APIResponse) => setItems(payload.data[0].products))
  }, [])

  if (!items.length) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Please wait while we fetch the products...</Text>
      </View>
    )
  }

  return (
    <View style={style.mainContainer}>
      <ProductList products={items} />
      {cart.items.length > 0 && <CartButton />}
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
    padding: 16,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 4
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
