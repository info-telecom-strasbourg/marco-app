import { SafeAreaView, Text, Pressable, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Typography } from "@/components/primitives/typography";

import { useRouter } from "expo-router";
import { useAuth } from "@/auth/useAuth";

import { useGetBalance } from "@/query/fouaille/balance";
import { useGetOrders } from "@/query/fouaille/order";
import type { Order } from "@/schemas/fouaille/order";

function OrderComponent({ item }: { item: Order }) {
  return (
    <View style={{ height: 80, padding: 16 }}>
      <Text>
        {item.date.toString()} - {item.total_price}
      </Text>
    </View>
  );
}

export default function HomePage() {
  const { data: userData } = useGetBalance();
  const { data: orderHistory } = useGetOrders();

  const router = useRouter();
  const { signOut } = useAuth();

  return (
    <SafeAreaView className="flex-1 p-safe">
      <View className="m-4 flex-row items-center justify-between rounded-2xl border border-muted-foreground bg-popover p-8">
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

      <View className="gap-2" style={{ height: 160 }}>
        <Pressable onPress={() => {}}>
          <Text>Mes dernières commandes:</Text>
        </Pressable>

        <FlashList
          renderItem={OrderComponent}
          data={
            orderHistory?.length
              ? orderHistory
              : [
                  {
                    amount: 10,
                    date: new Date(),
                    product: [],
                    total_price: 100,
                  },
                ]
          }
        />
      </View>

      <View className="flex-1">
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
