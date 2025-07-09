import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Typography } from "@/components/primitives/typography"

import { useBalance } from "@/query/fouaille/balance";

import type { Order } from "@/schemas/fouaille/order";
import { useNavigation } from "@react-navigation/native";

function OrderComponent({ order }: { order: any }) {
  return <Text>Poe</Text>
}

export default function HomePage() {
  const { data } = useBalance()!;
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 items-center justify-center">

      <View className="mx-2 mb-6 flex-row items-center justify-between rounded-2xl border border-muted-foreground bg-popover p-8">
        <View className="flex-1 gap-4">
          <Typography size="h4" className="text-muted-foreground">
            Carte Fouaille
          </Typography>
          <Typography size="h1" fontWeight="bold">
            {data?.balance}€
          </Typography>
          <Typography size="h3" fontWeight="semibold">
            {`${data?.first_name} ${data?.last_name}`}
          </Typography>
        </View>
      </View>

      <FlashList
        renderItem={({ item }) => <OrderComponent order={item} />}
        data={[]}
      />

      <TouchableOpacity onPress={() => navigation.navigate("Fouaille")}>
        <Text>Switch to admin</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
