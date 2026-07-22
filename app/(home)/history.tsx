import { FlashList } from "@shopify/flash-list";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useGetAllCarts } from "@/query/fouaille/cart";
import { APICommon } from "@/schemas/fouaille/cart";
import OrderQRCodeModal from "../../src/components/(home)/[cartId]";
import { useState, useCallback, useRef } from "react";
import { useFocusEffect } from '@react-navigation/native'
import { useQueryClient } from '@tanstack/react-query'

function OrderComponent({ item, setSelected }: { item: APICommon, setSelected: (_:APICommon) => void }) {
  return (
    <View>
      <Pressable onPress={() => setSelected(item)}>
        <Text>Prix: {item.price}</Text>
        <Text>Date: {item.created_at.toString() ?? "No date"}</Text>
        <Text>Status: {item.status}</Text>
        <Text style={{ color: "green", textAlign: "center" }}> Voir le détail </Text>
      </Pressable>
    </View>
  );
}

export function useRefreshOnFocus() {
  const queryClient = useQueryClient()
  const firstTimeRef = useRef(true)

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false
        return
      }
      // refetch useGetAllCarts query
      queryClient.refetchQueries({
        queryKey: ['carts'],
        stale: true,
        type: 'active',
      })
    }, [queryClient]),
  )
}

export default function HistoryScreen() {
  const [selected, setSelected] = useState<APICommon | null>(null);
  const { isFetching, data, error, isSuccess } = useGetAllCarts();
  useRefreshOnFocus();

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
  const reversedHistory = [...history].reverse(); // last cart first

  return (
    <SafeAreaView className="flex-1">
      <FlashList data={reversedHistory} extraData= {setSelected} renderItem={({item}) => <OrderComponent item = {item} setSelected= {setSelected} /> } />
      {
        selected &&
        <OrderQRCodeModal data={selected} close={() => setSelected(null)}  />
      }
    </SafeAreaView>
  );
}
