import { createContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Superhero } from "@models/superhero";
import { useBoolean } from "@hooks/useBoolean";
import { useSnackbar } from "@hooks/useSnackbar";

const FAVORITES_STORAGE_KEY = "@superhero_favorites";

interface FavoritesContextType {
  favorites: Superhero[];
  addFavorite(hero: Superhero): Promise<void>;
  removeFavorite(heroId: string): Promise<void>;
  isFavorite(heroId: string): boolean;
  loading: boolean;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<Superhero[]>([]);
  const loading = useBoolean(true);
  const snackbar = useSnackbar();

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      snackbar.showError("Failed to load favorites");
    } finally {
      loading.setFalse();
    }
  };

  const saveFavorites = async (newFavorites: Superhero[]) => {
    try {
      await AsyncStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(newFavorites)
      );
    } catch (error) {
      snackbar.showError("Failed to save favorites");
      throw error;
    }
  };

  const addFavorite = async (hero: Superhero) => {
    try {
      const newFavorites = [...favorites, hero];
      setFavorites(newFavorites);
      await saveFavorites(newFavorites);
    } catch (error) {
      setFavorites(favorites);
      snackbar.showError("Failed to add favorite");
      throw error;
    }
  };

  const removeFavorite = async (heroId: string) => {
    try {
      const newFavorites = favorites.filter((hero) => hero.id !== heroId);
      setFavorites(newFavorites);
      await saveFavorites(newFavorites);
    } catch (error) {
      setFavorites(favorites);
      snackbar.showError("Failed to remove favorite");
      throw error;
    }
  };

  const isFavorite = (heroId: string) => {
    return favorites.some((hero) => hero.id === heroId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        loading: loading.value,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
