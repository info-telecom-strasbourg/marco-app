import { FlashList } from "@shopify/flash-list";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useGetAllCarts } from "@/query/fouaille/cart";

function OrderComponent({ item }) {
  return (
    <View>
      <Text>Status: {item.status}</Text>
      <Text>Prix: {item.price}</Text>
      <Text>Date: {item.date?.toString() ?? "No date"}</Text>
    </View>
  );
}

export default function HistoryScreen() {
  const { isFetching, data } = useGetAllCarts();

  if (isFetching) {
    return (
      <SafeAreaView className="flex-1">
        <Text>Waiting for orders</Text>
      </SafeAreaView>
    );
  }

  const { data: history } = data;

  if (!history.length) {
    return (
      <SafeAreaView className="flex-1">
        <Text>You dont have order</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <FlashList data={history} renderItem={OrderComponent} />
    </SafeAreaView>
  );
}
