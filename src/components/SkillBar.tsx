import { View, Text, ViewStyle, TextStyle } from "react-native";
import tw from "@utils/tw";
import { colors } from "@constants/colors";

interface SkillBarProps {
  label: string;
  value: string;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  barContainerStyle?: ViewStyle;
  barStyle?: ViewStyle;
  valueStyle?: TextStyle;
}

const getPowerColor = (value: number): string => {
  if (value <= 20) return colors.power.weak;
  if (value <= 40) return colors.power.low;
  if (value <= 60) return colors.power.medium;
  if (value <= 80) return colors.power.high;
  return colors.power.godlike;
};

const SkillBar = ({
  label,
  value,
  style,
  labelStyle,
  barContainerStyle,
  barStyle,
  valueStyle,
}: SkillBarProps) => {
  const numericValue = Number(value) || 0;
  const powerColor = getPowerColor(numericValue);
  const displayValue = value == "null" ? "?" : value;
  const barWidth = value === "null" ? 0 : Math.min(numericValue, 100);

  return (
    <View style={[tw`flex-row items-center`, style]}>
      <Text style={[tw`w-8 text-xs text-hero-text-muted font-bold`, labelStyle]}>
        {label}
      </Text>

      <View
        style={[
          tw`flex-1 h-2.5 bg-hero-elevated rounded-full overflow-hidden mx-2`,
          barContainerStyle,
        ]}
      >
        <View
          style={[
            tw`h-full rounded-full`,
            {
              width: `${barWidth}%`,
              backgroundColor: powerColor,
              shadowColor: powerColor,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.5,
              shadowRadius: 4,
            },
            barStyle,
          ]}
        />
      </View>

      <Text
        style={[
          tw`w-6 text-xs font-bold text-right`,
          { color: powerColor },
          valueStyle,
        ]}
      >
        {displayValue}
      </Text>
    </View>
  );
};

export default SkillBar;
