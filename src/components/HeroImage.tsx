import { useState } from "react";
import {
  View,
  Image,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from "react-native";
import { User } from "lucide-react-native";
import tw from "@utils/tw";
import { useBoolean } from "@hooks/useBoolean";

interface HeroImageProps {
  uri: string;
  containerStyle?: StyleProp<ViewStyle>;
  resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center";
  showGlow?: boolean;
}

const HeroImage = ({
  uri,
  containerStyle,
  resizeMode = "cover",
  showGlow = false,
}: HeroImageProps) => {
  const loading = useBoolean(true);
  const error = useBoolean();

  const handleLoadStart = () => {
    loading.setTrue();
    error.setFalse();
  };

  const handleLoadEnd = () => {
    loading.setFalse();
  };

  const handleError = () => {
    loading.setFalse();
    error.setTrue();
  };

  return (
    <View style={[tw`relative overflow-hidden w-full h-full`, containerStyle]}>
      {showGlow && (
        <View
          style={[
            tw`absolute inset-0`,
            {
              backgroundColor: tw.color("hero-cyan"),
              opacity: 0.15,
              transform: [{ scale: 1.05 }],
            },
          ]}
        />
      )}

      {loading && (
        <View
          style={tw`absolute inset-0 items-center justify-center bg-hero-elevated`}
        >
          <ActivityIndicator size="small" color={tw.color("hero-cyan")} />
        </View>
      )}

      {error ? (
        <View
          style={tw`w-full h-full items-center justify-center bg-hero-elevated`}
        >
          <User size={48} color={tw.color("hero-text-muted")} />
        </View>
      ) : (
        <Image
          source={{ uri }}
          style={tw`w-full h-full bg-hero-elevated`}
          resizeMode={resizeMode}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
          onError={handleError}
        />
      )}
    </View>
  );
};

export default HeroImage;
