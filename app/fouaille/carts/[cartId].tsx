import { useGetCart, useCompleteCart } from "@/query/fouaille/cart";
import {
  Alert,
  Modal,
  Pressable,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderDetailModal({
  visible,
  setVisible,
  cartId,
}: {
  visible: boolean;
  setVisible: (_: boolean) => void;
  cartId: number;
}) {

  const { isFetching, isSuccess, data } = useGetCart(cartId);
  const { mutate: validate } = useCompleteCart(cartId);

  if (isFetching) {
    return <Text className="color ">Please wait, we are retrieving the informations</Text>;
  }

  if (!isSuccess) {
    return <Text>Something went wrong... :/</Text>;
  }

  const handlePaiement = () => {
    validate(undefined, {
      onSuccess: () => {
        Alert.alert("Commande validée avec succès", "", [{ text: "OK" }]);
        ToastAndroid.show(`Commande validée avec succès`, 2);
        setVisible(false);
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Modal
        animationType="slide"
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <Text>Panier #{cartId}</Text>

        <Text>Effectué le {data!.data.created_at.toString()}</Text>
        <Text>Prix panier: {data!.data.price}</Text>

        <View
          style={{
            padding: 12,
            width: "100%",
            backgroundColor: "green",
            borderRadius: "8px",
          }}
          className="p-4"
        >
          <Pressable onPress={handlePaiement}>
            <Text style={{ color: "white", textAlign: "center" }}>
              Valider la commande
            </Text>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
