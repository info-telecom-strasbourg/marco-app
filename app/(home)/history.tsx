import { useGetAllOrders } from "@/query/fouaille/order";
import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { Order } from "@/schemas/fouaille/order";

function OrderComponent({ item }: { item: Order }) {
  return (
    <View>
      <Text>Produit: {item.product[0].name}</Text>
      <Text>Prix: {item.product[0].price}</Text>
      <Text>Date: {item.date.toString()}</Text>
    </View>
  );
}

export default function HistoryScreen() {
  const [page, setPage] = useState(0);
  const orders = useGetAllOrders(page);

  if (!orders.isSuccess) {
    return (
      <SafeAreaView className="flex-1">
        <Text>Waiting for orders or no orders available</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <FlashList
        data={orders.data!.data.orders}
        renderItem={OrderComponent}
        ListFooterComponent={
          orders.data!.meta.current_page !== orders.data!.meta.last_page ?
            <Pressable onPress={() => setPage(page + 1)}>View more</Pressable> :
            null
        }
      />
    </SafeAreaView>
  );
}
