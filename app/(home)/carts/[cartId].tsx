import { useGetCart, useCompleteCart } from "@/query/fouaille/cart";
import {
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import QRCode from 'react-native-qrcode-svg';

export default function OrderQRCodeModal({
  cartId,
}: {
  cartId: number;
}) {
  const { isFetching, isSuccess, data } = useGetCart(cartId);
  console.log("exec");
  if (isFetching) {
    return <Text>Please wait, we are retrieving the informations</Text>;
  }

  if (!isSuccess) {
    return <Text>Something went wrong... :/</Text>;
  }

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Modal
        animationType="slide"
        visible={true}
      >
        <Text>Panier #{cartId}</Text>

        <Text>Effectué le {data!.data.created_at.toString()}</Text>
        <Text>Prix panier: {data!.data.price}</Text>

        <Text>QRCode : </Text>

        <QRCode value = '{ "cartId": ${cartId} }' />
        
        <View
          style={{
            padding: 12,
            width: "100%",
            backgroundColor: "green",
            borderRadius: "8px",
          }}
          className="p-4"
        >
          <Pressable>
            <Text style={{ color: "white", textAlign: "center" }}>
              J'ai compris !
            </Text>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
