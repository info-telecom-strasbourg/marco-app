import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { useCartStore } from "@/store/cart";

import type { CartItem } from "@/schemas/cart";
import { useCheckoutCart } from "@/query/fouaille/cart";

function Circle({ color, size }: { color: string; size: number }) {
  return (
    <View
      style={{
        backgroundColor: color,
        height: size,
        width: size,
        borderRadius: size / 2,
      }}
    ></View>
  );
}

function ProductCard({ item }: { item: CartItem }) {
  const store = useCartStore();

  const handleIncr = () => store.incrementQuantity(item.product.id);
  const handleDecr = () =>
    item!.quantity > 1
      ? store.decrementQuantity(item.product.id)
      : store.removeProduct(item.product.id);

  const { product: article } = item;

  return (
    <View className="flex-1 flex-row gap-1 p-2">
      <Circle size={40} color={article.color} />

      <View className="flex-1">
        <Text style={{ fontSize: 16 }} className="capitalize">
          {article.title}
        </Text>
        <Text style={{ fontSize: 12 }}>{article.price}</Text>
      </View>

      <View className="flex-row items-center">
        <TouchableOpacity
          className="size-8 rounded-2xl items-center justify-center"
          onPress={handleDecr}
        >
          <Text className="text-lg">-</Text>
        </TouchableOpacity>

        <Text className="text-lg font-bold">{item?.quantity ?? 0}</Text>

        <TouchableOpacity
          className="size-8 rounded-2xl items-center justify-center"
          onPress={handleIncr}
        >
          <Text className="text-lg">+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function CartPage() {
  const store = useCartStore();

  const cartPrice = store.items.reduce(
    (acc, item) => (acc += item.product.price * item.quantity),
    0,
  );

  // Prevent errors with floating point representation
  const formattedPrice = Math.round(cartPrice * 100) / 100;

  const handleCheckout = () => {
    const { mutate } = useCheckoutCart();
    mutate(store);
  }

  return (
    <SafeAreaView className="p-2 flex-1 justify-center">
      <FlashList
        renderItem={({ item }) => {
          return <ProductCard item={item} />;
        }}
        keyExtractor={(item) => item.product.id.toString()}
        data={store.items}
        estimatedItemSize={100}
      />

      <Pressable
        className="p-2 justify-center items-center bg-black"
        onPress={handleCheckout}
      >
        <Text className="color-white">
          Valider ma commande - {formattedPrice}€
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
