import { useFavorites } from "@hooks/useFavorites";
import FavoritesView from "./FavoritesView";

const FavoritesScreen = () => {
  const { favorites, loading } = useFavorites();

  return <FavoritesView heroes={favorites} loading={loading} />;
};

export default FavoritesScreen;
