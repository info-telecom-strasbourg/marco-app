import { useGetOrders } from "@/query/fouaille/order";
import { FlashList } from "@shopify/flash-list";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Order() {
  return (
    <View>
      <Text>aaa</Text>
    </View>
  );
}

export default function HistoryScreen() {
  const { data: orders } = useGetOrders();

  return (
    <SafeAreaView className="flex-1">
      {orders?.length! > 0 ? (
        <FlashList data={orders ?? []} renderItem={Order} />
      ) : (
        <Text>No order available</Text>
      )}
    </SafeAreaView>
  );
}
