import { useEffect } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { AlertCircle, AlertTriangle, Info, X } from "lucide-react-native";
import tw from "@utils/tw";
import { colors } from "@constants/colors";

export type SnackbarType = "error" | "warning" | "info";

interface SnackbarProps {
  visible: boolean;
  message: string;
  type: SnackbarType;
  onDismiss(): void;
  duration?: number;
}

const Snackbar = ({
  visible,
  message,
  type,
  onDismiss,
  duration = 3000,
}: SnackbarProps) => {
  const translateY = new Animated.Value(100);

  useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        handleDismiss();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      Animated.timing(translateY, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleDismiss = () => {
    Animated.timing(translateY, {
      toValue: 100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onDismiss();
    });
  };

  const getConfig = () => {
    switch (type) {
      case "error":
        return {
          icon: AlertCircle,
          color: tw.color("hero-error"),
        };
      case "warning":
        return {
          icon: AlertTriangle,
          color: tw.color("hero-warning"),
        };
      case "info":
        return {
          icon: Info,
          color: tw.color("hero-cyan"),
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          borderColor: config.color,
        },
      ]}
    >
      <View style={tw`flex-row items-center flex-1 gap-3`}>
        <Icon color={config.color} size={24} />
        <Text style={tw`flex-1 text-white font-medium`}>{message}</Text>
        <X
          color={config.color}
          size={20}
          onPress={handleDismiss}
          style={{ padding: 4 }}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: colors.ui.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 9999,
    backgroundColor: colors.background.card,
    borderWidth: 1,
  },
});

export default Snackbar;
