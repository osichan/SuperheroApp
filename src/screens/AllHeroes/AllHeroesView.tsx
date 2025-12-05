import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Star, Filter, BlocksIcon, Ban } from "lucide-react-native";
import { Superhero } from "@models/superhero";
import SearchInput from "@components/SearchInput";
import HeroCard from "@components/HeroCard";
import FilterModal, { FilterOptions } from "@components/FilterModal";
import tw from "@utils/tw";
import { colors } from "@constants/colors";

interface AllHeroesViewProps {
  heroes: Superhero[];
  loading: boolean;
  loadingMore: boolean;
  searchQuery: string;
  hasMore: boolean;
  onSearchQueryChange(query: string): void;
  onLoadMore(): void;
  filterModalOpen: boolean;
  onOpenFilterModal(): void;
  onCloseFilterModal(): void;
  filters: FilterOptions;
  onApplyFilters(filters: FilterOptions): void;
  isAccessTokenProvided: boolean;
}

const AllHeroesView = ({
  heroes,
  loading,
  loadingMore,
  searchQuery,
  onSearchQueryChange,
  onLoadMore,
  hasMore,
  filterModalOpen,
  onOpenFilterModal,
  onCloseFilterModal,
  filters,
  onApplyFilters,
  isAccessTokenProvided,
}: AllHeroesViewProps) => {
  const router = useRouter();

  const hasActiveFilters =
    filters.minStrength > 0 ||
    filters.minIntelligence > 0 ||
    filters.minSpeed > 0 ||
    filters.minPower > 0 ||
    filters.minDurability > 0 ||
    filters.minCombat > 0;

  if (!isAccessTokenProvided) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <View style={tw`flex-row items-center gap-2`}>
          <Ban size={30} color={tw.color("red-500")} />
          <Text style={tw`text-hero-text-secondary text-lg font-medium`}>
            Access token not provided
          </Text>
        </View>
        <Text style={tw`text-hero-text-muted text-sm mt-2 text-center px-8`}>
          Please provide an access token to use the app
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={tw`flex-1 bg-hero-bg`}
      edges={["bottom", "left", "right"]}
    >
      <View style={tw`flex-1 px-4 pt-2`}>
        <View style={tw`mb-5 flex-row gap-3`}>
          <View style={tw`flex-1`}>
            <SearchInput
              value={searchQuery}
              onChangeText={onSearchQueryChange}
              placeholder="Search for a hero..."
            />
          </View>
          <TouchableOpacity
            onPress={onOpenFilterModal}
            style={[
              tw`rounded-xl px-4 py-3 items-center justify-center border border-hero-border relative`,
              hasActiveFilters
                ? { backgroundColor: tw.color("hero-cyan") }
                : tw`bg-hero-card`,
              {
                shadowColor: tw.color("hero-cyan"),
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
                elevation: 3,
              },
            ]}
          >
            <Filter
              size={24}
              color={hasActiveFilters ? tw.color("hero-text") : tw.color("hero-cyan")}
            />
            {hasActiveFilters && (
              <View
                style={[
                  tw`absolute -top-1 -right-1 rounded-full w-3 h-3`,
                  { backgroundColor: tw.color("hero-amber") },
                ]}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/favorites")}
            style={[
              tw`rounded-xl px-4 py-3 items-center justify-center bg-hero-card border border-hero-border`,
              {
                shadowColor: tw.color("hero-cyan"),
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
                elevation: 3,
              },
            ]}
          >
            <Star size={24} color={tw.color("hero-cyan")} />
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={tw`flex-1 justify-center items-center`}>
            <ActivityIndicator size="large" color={colors.accent.secondary} />
            <Text
              style={tw`mt-4 text-hero-text-secondary text-base font-medium`}
            >
              Scanning the multiverse
            </Text>
          </View>
        ) : (
          <FlatList
            data={heroes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <HeroCard hero={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`pb-4`}
            ListEmptyComponent={
              searchQuery.length > 0 ? (
                <View style={tw`py-16 items-center`}>
                  <Text
                    style={tw`text-hero-text-secondary text-lg font-medium`}
                  >
                    No heroes found
                  </Text>
                  <Text style={tw`text-hero-text-muted text-sm mt-1`}>
                    Try searching for your favorite hero!
                  </Text>
                </View>
              ) : (
                <View style={tw`flex-1 items-center mt-18`}>
                  <Text style={tw`text-hero-text text-xl font-medium`}>
                    This is heroes app
                  </Text>
                  <Text style={tw`text-hero-text-muted text-lg mt-2`}>
                    Try searching for any hero!
                  </Text>
                </View>
              )
            }
            ListFooterComponent={
              loadingMore && hasMore ? (
                <View style={tw`py-6 items-center`}>
                  <ActivityIndicator
                    size="small"
                    color={colors.accent.primary}
                  />
                  <Text style={tw`text-hero-text-muted text-xs mt-2`}>
                    Loading more heroes
                  </Text>
                </View>
              ) : null
            }
            onEndReached={hasMore ? onLoadMore : null}
            onEndReachedThreshold={0.5}
          />
        )}
      </View>

      <FilterModal
        visible={filterModalOpen}
        onClose={onCloseFilterModal}
        onApply={onApplyFilters}
        currentFilters={filters}
      />
    </SafeAreaView>
  );
};

export default AllHeroesView;
