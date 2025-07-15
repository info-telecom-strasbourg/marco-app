import { SafeAreaView, Text, Pressable, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Typography } from "@/components/primitives/typography";

import { useRouter } from "expo-router";
import { useAuth } from "@/auth/useAuth";

import { useGetBalance } from "@/query/fouaille/balance";
import { useGetAllOrders } from "@/query/fouaille/order";
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
  const userBalance = useGetBalance();
  const orderHistory = useGetAllOrders(0);

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
            {userBalance.isSuccess ? "--" : userBalance.data!.balance}€
          </Typography>
          <Typography size="h3" fontWeight="semibold">
            {userBalance.isSuccess
              ? "-- --"
              : `${userBalance.data!.first_name} ${userBalance.data!.last_name}`}
          </Typography>
        </View>

        <Text>&gt;</Text>
      </View>

      <View className="gap-2" style={{ height: 160 }}>
        <Text>Mes dernières commandes:</Text>

        {orderHistory.isSuccess ? (
          <FlashList
            renderItem={OrderComponent}
            data={orderHistory.data!.data.orders}
          />
        ) : (
          <Text>Waiting for data...</Text>
        )}
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
