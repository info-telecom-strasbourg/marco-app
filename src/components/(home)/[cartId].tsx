import { useGetCart, useCompleteCart } from "@/query/fouaille/cart";
import {
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import QRCode from 'react-native-qrcode-svg';
import { APICommon } from "@/schemas/fouaille/cart";

export default function OrderQRCodeModal({
  data: orderData,
  close,
  }: { 
  data: APICommon;
  close:() => void;
}) {
  const { isFetching, isSuccess, data } = useGetCart(orderData.id);

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
        visible= { true }
        onRequestClose={close}  
      >
        <Text>Panier #{orderData.id}</Text>

        <Text>Effectué le {data!.data.created_at.toString()}</Text>
        <Text>Prix panier: {data!.data.price}</Text>

        <Text>QRCode : </Text>

        <QRCode value ={ `{ "cartId": ${orderData.id} }` }/>
        
        <View
          style={{
            padding: 12,
            width: "100%",
            backgroundColor: "green",
            borderRadius: "8px",
          }}
          className="p-4"
        >
          <Pressable onPress={close}>
            <Text style={{ color: "white", textAlign: "center" }}>
              Fermer la page
            </Text>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
