import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCart, useCartDispatch } from "../../src/store/cart";
import { FlashList } from "@shopify/flash-list";

function Circle({ color, size }: { color: string, size: number }) {
  return <View style={{
    backgroundColor: color,
    height: size,
    width: size,
    borderRadius: size / 2
  }}></View>
}

function ProductCard({ item }: { item: CartItem }) {
  const { removeArticle, increaseQuantity, decreaseQuantity } = useCartDispatch();

  const handleIncr = () => increaseQuantity(item.article.id);
  const handleDecr = () => item!.quantity > 1 ? decreaseQuantity(item.article.id) : removeArticle(item.article.id);

  const { article } = item;

  return (
    <View style={style.productContainer}>
      <Circle size={40} color={article.color} />

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16 }}>{article.title}</Text>
        <Text style={{ fontSize: 12 }}>{article.price}</Text>
      </View>


      <View style={style.productAmount}>
        <TouchableOpacity style={style.amountButton} onPress={handleDecr}>
          <Text style={style.amountButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={style.amountText}>{item?.quantity ?? 0}</Text>
        <TouchableOpacity style={style.amountButton} onPress={handleIncr}>
          <Text style={style.amountButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


export default function CartPage() {
  const cart = useCart();

  const cartPrice = cart.items.reduce(
    (acc, item) => acc += (parseFloat(item.article.price) * item.quantity),
    0
  );

  // Prevent errors with floating point representation
  const formattedPrice = Math.round(cartPrice * 100) / 100;

  return (
    <View style={style.mainContainer}>
      <FlashList
        renderItem={({ item }) => {
          return <ProductCard item={item} />
        }}
        keyExtractor={item => item.article.id.toString()}
        data={cart.items}
        estimatedItemSize={100}
      />

      <TouchableOpacity style={{ padding: 10, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: "white" }}>Valider ma commande - {formattedPrice}€</Text>
      </TouchableOpacity>
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
