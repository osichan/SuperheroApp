import { useState, useEffect, useMemo } from "react";
import { superheroApi } from "@api/superhero";
import { Superhero } from "@models/superhero";
import { useBoolean } from "@hooks/useBoolean";
import { FilterOptions } from "@components/FilterModal";
import AllHeroesView from "./AllHeroesView";

const ITEMS_PER_PAGE = 20;

const AllHeroesScreen = () => {
  const [allHeroes, setAllHeroes] = useState<Superhero[]>([]);
  const [displayedHeroes, setDisplayedHeroes] = useState<Superhero[]>([]);
  const loading = useBoolean();
  const loadingMore = useBoolean();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterOptions>({
    minStrength: 0,
    minIntelligence: 0,
    minSpeed: 0,
    minPower: 0,
    minDurability: 0,
    minCombat: 0,
  });
  const filterModalOpen = useBoolean();

  const filteredHeroes = useMemo(() => {
    return allHeroes.filter((hero) => {
      const stats = hero.powerstats;

      const strength = Number(stats.strength) || 0;
      const intelligence = Number(stats.intelligence) || 0;
      const speed = Number(stats.speed) || 0;
      const power = Number(stats.power) || 0;
      const durability = Number(stats.durability) || 0;
      const combat = Number(stats.combat) || 0;

      return (
        strength >= filters.minStrength &&
        intelligence >= filters.minIntelligence &&
        speed >= filters.minSpeed &&
        power >= filters.minPower &&
        durability >= filters.minDurability &&
        combat >= filters.minCombat
      );
    });
  }, [allHeroes, filters]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setAllHeroes([]);
      setDisplayedHeroes([]);
      setCurrentPage(1);
      return;
    }

    loading.setTrue();
    try {
      const response = await superheroApi.search(query);
      if (response.response === "success") {
        setAllHeroes(response.results);
        setCurrentPage(1);
      } else {
        setAllHeroes([]);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Error searching heroes:", error);
      setAllHeroes([]);
      setCurrentPage(1);
    } finally {
      loading.setFalse();
    }
  };

  const handleLoadMore = () => {
    if (loadingMore.value || displayedHeroes.length >= filteredHeroes.length) {
      return;
    }

    loadingMore.setTrue();
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const startIndex = currentPage * ITEMS_PER_PAGE;
      const endIndex = nextPage * ITEMS_PER_PAGE;
      const moreHeroes = filteredHeroes.slice(startIndex, endIndex);

      setDisplayedHeroes((prev) => [...prev, ...moreHeroes]);
      setCurrentPage(nextPage);
      loadingMore.setFalse();
    }, 500);
  };

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  useEffect(() => {
    setDisplayedHeroes(filteredHeroes.slice(0, ITEMS_PER_PAGE));
    setCurrentPage(1);
  }, [filteredHeroes]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <AllHeroesView
      heroes={displayedHeroes}
      loading={loading.value}
      loadingMore={loadingMore.value}
      searchQuery={searchQuery}
      onSearchQueryChange={setSearchQuery}
      onLoadMore={handleLoadMore}
      hasMore={displayedHeroes.length < filteredHeroes.length}
      filterModalOpen={filterModalOpen.value}
      onOpenFilterModal={filterModalOpen.setTrue}
      onCloseFilterModal={filterModalOpen.setFalse}
      filters={filters}
      onApplyFilters={handleApplyFilters}
      isAccessTokenProvided={!!process.env.EXPO_PUBLIC_ACCESS_TOKEN}
    />
  );
};

export default AllHeroesScreen;
