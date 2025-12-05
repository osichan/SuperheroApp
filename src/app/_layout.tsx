import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { Zap } from "lucide-react-native";
import { colors } from "@constants/colors";
import { SnackbarProvider } from "@context/SnackbarContext";
import { FavoritesProvider } from "@context/FavoritesContext";
import tw from "@utils/tw";

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <SnackbarProvider>
        <FavoritesProvider>
          <StatusBar style="light" />
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: colors.background.primary,
              },
              headerTintColor: colors.text.primary,
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 20,
              },
              headerShadowVisible: false,
              contentStyle: {
                backgroundColor: colors.background.primary,
              },
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                headerTitleAlign: "center",
                headerTitle: () => (
                  <View style={tw`flex-row items-center gap-2`}>
                    <Zap
                      size={30}
                      color={tw.color("hero-cyan")}
                      fill={tw.color("hero-gold")}
                      strokeWidth={1}
                    />
                    <Text style={tw`text-hero-text font-bold text-xl`}>
                      HEROES
                    </Text>
                  </View>
                ),
              }}
            />
            <Stack.Screen
              name="hero/[id]"
              options={{
                title: "Hero Details",
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="favorites"
              options={{
                title: "FAVORITES",
                headerTitleAlign: "center",
              }}
            />
          </Stack>
        </FavoritesProvider>
      </SnackbarProvider>
    </SafeAreaProvider>
  );
};

export default RootLayout;
