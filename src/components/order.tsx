import { Typography } from "@/components/primitives/typography";
import type { Order } from "@/schemas/fouaille/order"

import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export const OrderItem = ({ order }: { order: Order }) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <TouchableOpacity
      onPress={() => setIsOpened(!isOpened)}
      className="mx-2 mb-3 rounded-2xl bg-popover p-3 px-4"
    >
      <View className="flex-row items-center gap-4">
        {order?.product ? (
          <>
            <View>
              <Typography size="h4" fontWeight="semibold">
                {order?.product?.name}
              </Typography>
              <Text
                style={{
                  fontFamily: "SpaceGrotesk-regular",
                  fontSize: 12,
                }}
              >
                {order?.total_price}€
              </Text>
            </View>
          </>
        ) : (
          <>
            <TrendingUp color="#0E8A30" size={24} />
            <View>
              <Typography size="h4" fontWeight="semibold">
                Rechargement
              </Typography>
              <Text
                style={{
                  color: "#0E8A30",
                  fontFamily: "SpaceGrotesk-regular",
                  fontSize: 12,
                }}
              >
                {order?.total_price}€
              </Text>
            </View>
          </>
        )}
        <View className="absolute right-1">
          <ChevronDown size={24} color={colors[theme].foreground} />
        </View>
      </View>
      {isOpened &&
        (order?.product ? (
          <View className="ml-11 mt-4 flex-row items-center justify-between">
            <Typography fontWeight="semibold">
              {order?.amount}x {order?.product?.type}
            </Typography>
            <Typography className="text-muted-foreground" size="sm">
              {order?.date_format}
            </Typography>
          </View>
        ) : (
          <View className="ml-11 mt-4 flex-row items-center justify-end">
            <Typography className="text-muted-foreground" size="sm">
              {order?.date_format}
            </Typography>
          </View>
        ))}
    </TouchableOpacity>
  );
};

