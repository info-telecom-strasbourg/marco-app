import { FlashList } from "@shopify/flash-list";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useGetAllCarts } from "@/query/fouaille/cart";
import { APICommon } from "@/schemas/fouaille/cart";

function OrderComponent({ item }: {item: APICommon}) {
  return (
    <View>
      <Text>Status: {item.status}</Text>
      <Text>Prix: {item.price}</Text>
      <Text>Date: {item.created_at.toString() ?? "No date"}</Text>
    </View>
  );
}

export default function HistoryScreen() {
  const { isFetching, data, error ,isSuccess } = useGetAllCarts();

  if (isFetching) {
    return (
      <SafeAreaView className="flex-1">
        <Text>Waiting for orders</Text>
      </SafeAreaView>
    );
  }

  if (!isSuccess) {
    return (
      <SafeAreaView className="flex-1">
        <Text>{error?.name}</Text>
        <Text>{error?.message}</Text>
        <Text>{error?.stack}</Text>
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
