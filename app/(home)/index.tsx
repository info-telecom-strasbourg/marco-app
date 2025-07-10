import { SafeAreaView, Text, Pressable, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Typography } from "@/components/primitives/typography";

import { useRouter } from "expo-router";
import { useAuth } from "@/auth/useAuth";

import { useBalance } from "@/query/fouaille/balance";
import { useOrders } from "@/query/fouaille/order";
import type { Order } from "@/schemas/fouaille/order";

function OrderComponent({ item }: { item: Order }) {
  return (
    <Text>
      {item.date.toString()} - {item.total_price}
    </Text>
  );
}

export default function HomePage() {
  const { data: userData } = useBalance();
  const { data: orderHistory } = useOrders();

  const router = useRouter();
  const { signOut } = useAuth();

  return (
    <SafeAreaView>
      <View className="mx-2 mb-6 flex-row items-center justify-between rounded-2xl border border-muted-foreground bg-popover p-8">
        <View className="flex-1 gap-4">
          <Typography size="h4" className="text-muted-foreground">
            Carte Fouaille
          </Typography>
          <Typography size="h1" fontWeight="bold">
            {userData?.balance}€
          </Typography>
          <Typography size="h3" fontWeight="semibold">
            {`${userData?.first_name} ${userData?.last_name}`}
          </Typography>
        </View>

        <Text>&gt;</Text>
      </View>

      <FlashList
        renderItem={OrderComponent}
        data={
          orderHistory?.orders.length
            ? orderHistory.orders
            : [{ amount: 10, date: new Date(), product: [], total_price: 100 }]
        }
      />

      <View>
        <Pressable onPress={() => router.navigate("/fouaille")}>
          <Text>Passer en mode fouaille (ToDo: permission)</Text>
        </Pressable>

        <Pressable onPress={() => router.navigate("/products")}>
          <Text>Passer une commande</Text>
        </Pressable>

        <Pressable onPress={signOut}>
          <Text>Log out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
