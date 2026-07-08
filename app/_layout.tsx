import { useAuthStore } from "@/store/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

import "../global.css";

export default function RootLayout() {
  const { token } = useAuthStore();
  // eslint-disable-next-line @tanstack/query/stable-query-client
  const queryClient = new QueryClient();

  const isLoggedIn = Boolean(token);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "none",
        }}
      >
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="(auth)/login" />
        </Stack.Protected>

        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(home)" />

          {/* <Stack.Protected guard={isFouaille}> */}
          <Stack.Screen name="fouaille" />
          {/* </Stack.Protected> */}
        </Stack.Protected>
      </Stack>
    </QueryClientProvider>
  );
}
