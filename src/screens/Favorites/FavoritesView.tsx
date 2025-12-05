import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Superhero } from "@models/superhero";
import HeroCard from "@components/HeroCard";
import tw from "@utils/tw";
import { colors } from "@constants/colors";

interface FavoritesViewProps {
  heroes: Superhero[];
  loading: boolean;
}

const FavoritesView = ({ heroes, loading }: FavoritesViewProps) => {
  if (loading) {
    return (
      <SafeAreaView
        style={tw`flex-1 bg-hero-bg`}
        edges={["bottom", "left", "right"]}
      >
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size="large" color={colors.accent.secondary} />
          <Text style={tw`mt-4 text-hero-text-secondary text-base font-medium`}>
            Loading favorites
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={tw`flex-1 bg-hero-bg`}
      edges={["bottom", "left", "right"]}
    >
      <View style={tw`flex-1 px-4 pt-2`}>
        <FlatList
          data={heroes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HeroCard hero={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`pb-4`}
          ListEmptyComponent={
            <View style={tw`flex-1 items-center justify-center py-20`}>
              <Text style={tw`text-hero-text-secondary text-lg font-medium`}>
                No Favorite Heroes Yet
              </Text>
              <Text
                style={tw`text-hero-text-muted text-sm mt-2 text-center px-8`}
              >
                Start adding your favorite heroes to see them here, even
                offline!
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default FavoritesView;
