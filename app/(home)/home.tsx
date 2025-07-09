import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Typography } from "@/components/primitives/typography"

import type { Order } from "@/schemas/fouaille/order";
import { useNavigation } from "@react-navigation/native";
import { useOrders } from "@/query/fouaille/order";
import { useAuth } from "@/auth/useAuth";
import { useBalance } from "@/query/fouaille/balance";

function OrderComponent({ item }: { item: Order }) {
  return <Text>{item.date.toString()} - {item.total_price}</Text>
}

export default function HomePage() {
  const { data: userData } = useBalance();
  const { data: orderHistory } = useOrders();

  const navigation = useNavigation();
  const { signOut } = useAuth();

  return (
    <SafeAreaView className="items-center justify-center p-4">
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
        data={orderHistory?.orders ?? [{ amount: 10, date: new Date(), product: [], total_price: 100 }]}
      />

      <View>
        <TouchableOpacity onPress={() => navigation.navigate("Fouaille")}>
          <Text>Passer en mode fouaille</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Products")}>
          <Text>Passer une commande</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={signOut}>
          <Text>Log out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
