import { TextInput, View } from "react-native";
import { Search } from "lucide-react-native";
import tw from "@utils/tw";

interface SearchInputProps {
  value: string;
  onChangeText(text: string): void;
  placeholder?: string;
}

const SearchInput = ({
  value,
  onChangeText,
  placeholder = "Search",
}: SearchInputProps) => {
  return (
    <View
      style={[
        tw`flex-row items-center border border-hero-border rounded-xl px-4 py-3 gap-3 bg-hero-card`,
        {
          shadowColor: tw.color("hero-cyan"),
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 3,
        },
      ]}
    >
      <Search color={tw.color("hero-cyan")} size={22} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={tw.color("hero-text-muted")}
        style={[
          tw`flex-1 text-hero-text`,
          {
            fontSize: 16,
            lineHeight: 20,
            paddingVertical: 0,
          },
        ]}
        selectionColor={tw.color("hero-cyan")}
      />
    </View>
  );
};

export default SearchInput;
