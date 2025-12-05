import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { superheroApi } from "@api/superhero";
import { Superhero } from "@models/superhero";
import { useBoolean } from "@hooks/useBoolean";
import { useFavorites } from "@hooks/useFavorites";
import { useSnackbar } from "@hooks/useSnackbar";
import DetailedHeroView from "./DetailedHeroView";

const DetailedHeroScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [hero, setHero] = useState<Superhero | null>(null);
  const loading = useBoolean(true);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const snackbar = useSnackbar();

  useEffect(() => {
    const fetchHero = async () => {
      if (!id) return;

      loading.setTrue();
      try {
        const data = await superheroApi.getById(id);
        setHero(data);
      } catch (error) {
        console.error("Error fetching hero:", error);
      } finally {
        loading.setFalse();
      }
    };

    fetchHero();
  }, [id]);

  const handleToggleFavorite = async () => {
    if (!hero) return;

    try {
      if (isFavorite(hero.id)) {
        await removeFavorite(hero.id);
        snackbar.showInfo(`${hero.name} removed from favorites`);
      } else {
        await addFavorite(hero);
        snackbar.showInfo(`${hero.name} added to favorites`);
      }
    } catch (error) {
      snackbar.showError("Failed to update favorites");
    }
  };

  return (
    <DetailedHeroView
      hero={hero}
      loading={loading.value}
      isFavorite={hero ? isFavorite(hero.id) : false}
      onToggleFavorite={handleToggleFavorite}
    />
  );
};

export default DetailedHeroScreen;
