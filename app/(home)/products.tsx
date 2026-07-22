import {
  Text,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { FlashList } from "@shopify/flash-list";

import type { Product } from "@/schemas/fouaille/product";

import { useRouter } from "expo-router";
import { useCartStore } from "@/store/cart";
import { useGetProducts } from "@/query/fouaille/products";
import { useGetProductTypes } from "@/query/fouaille/productTypes";

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

function ProductCard({ article }: { article: Product }) {
  const store = useCartStore();

  const item = store.items.find((item) => item.product.id === article.id);

  const handleAdd = () => store.addProduct(article);
  const handleIncr = () => store.incrementQuantity(article.id);
  const handleDecr = () =>
    item!.quantity > 1
      ? store.decrementQuantity(article.id)
      : store.removeProduct(article.id);

  return (
    <View className="flex-1 flex-row gap-2 p-2">
      <Circle size={40} color={article.color} />

      <View className="flex-1">
        <Text style={{ fontSize: 16 }} className="capitalize">
          {article.title}
        </Text>
        <Text style={{ fontSize: 12 }}>{article.price}</Text>
      </View>

      <View className="flex-row items-center">
        {!item || item?.quantity === 0 ? (
          <TouchableOpacity
            className="size-8 rounded-2xl items-center justify-center"
            onPress={handleAdd}
          >
            <Text className="text-lg">+</Text>
          </TouchableOpacity>
        ) : (
          <>
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
          </>
        )}
      </View>
    </View>
  );
}

function ProductList({ products }: { products: Product[] }) {
  return (
    <View className="flex-1">
      <FlashList
        renderItem={({ item }) => {
          return <ProductCard article={item} />;
        }}
        keyExtractor={(product) => product.id.toString()}
        data={products}
        estimatedItemSize={100}
        ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
      />
    </View>
  );
}

function CartButton() {
  const router = useRouter();

  const handlePress = () => router.navigate("/(home)/cart");

  return (
    <Pressable
      className="items-center justify-center bg-black p-2"
      onPress={handlePress}
    >
      <Text className="color-white">Voir mon panier</Text>
    </Pressable>
  );
}

export default function ProductPage() {
  const { data: items, refetch, isError } = useGetProducts();
  const cart = useCartStore();
  const { data: product_types , error, isSuccess } = useGetProductTypes();

  if (!items) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text>Please wait while we fetch the products...</Text>
        {isError && (
          <Pressable onPress={() => refetch}>
            <Text>Retry</Text>
          </Pressable>
        )}
      </SafeAreaView>
    );
  }
  if (!product_types)
  {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text>Erreur : product_types est vide. </Text>
      </SafeAreaView>
    );
  }
  if(!isSuccess)
    return (
      <SafeAreaView className="flex-1">
        <Text>{error?.name}</Text>
        <Text>{error?.message}</Text>
        <Text>{error?.stack}</Text>
      </SafeAreaView>
    );
  return (
    
    <SafeAreaView className="flex-1 flex-col">
      <ScrollView>
        { product_types.data.map( product => (
          <SafeAreaView key= {product.id - 1} className="flex-1 flex-col">
            <Text className="text-4xl font-bold underline"> {product.type} </Text>
            <ProductList products={items.data.at(product.id - 1)!.products} />
          </SafeAreaView>
        ))}
      </ScrollView>
      {cart.items.length > 0 && <CartButton />}
    </SafeAreaView>
  );
}