import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Star } from "lucide-react-native";
import { Superhero } from "@models/superhero";
import { useFavorites } from "@hooks/useFavorites";
import { useSnackbar } from "@hooks/useSnackbar";
import tw from "@utils/tw";
import SkillBar from "./SkillBar";
import HeroImage from "./HeroImage";

interface HeroCardProps {
  hero: Superhero;
}

const HeroCard = ({ hero }: HeroCardProps) => {
  const router = useRouter();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const snackbar = useSnackbar();

  const handleViewDetails = () => {
    router.push(`/hero/${hero.id}`);
  };

  const handleToggleFavorite = async () => {
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

  const isHeroFavorite = isFavorite(hero.id);

  return (
    <View
      style={[
        tw`bg-hero-card rounded-2xl p-4 mb-4 border border-hero-border relative`,
        {
          shadowColor: tw.color("hero-cyan"),
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
        },
      ]}
    >
      <TouchableOpacity
        onPress={handleToggleFavorite}
        style={[
          tw`absolute top-3 right-3 z-10 rounded-full p-2`,
          {
            backgroundColor: isHeroFavorite
              ? tw.color("hero-amber")
              : tw.color("hero-overlay-light"),
          },
        ]}
      >
        <Star
          size={20}
          color={tw.color("hero-text")}
          fill={isHeroFavorite ? tw.color("hero-text") : "none"}
        />
      </TouchableOpacity>

      <View style={tw`flex-row`}>
        <View style={tw`w-24`}>
          <HeroImage
            uri={hero.image.url}
            containerStyle={tw`rounded-xl h-24`}
            resizeMode="cover"
            showGlow={true}
          />
          <Text
            style={[
              tw`text-md font-bold text-hero-text-muted text-center mt-2`,
              {
                color:
                  hero.biography.alignment === "good"
                    ? tw.color("hero-success")
                    : tw.color("power-weak"),
              },
            ]}
          >
            {hero.biography.alignment.charAt(0).toUpperCase() +
              hero.biography.alignment.slice(1)}
          </Text>
        </View>

        <View style={tw`flex-1 ml-4`}>
          <Text style={tw`text-xl font-bold text-hero-text mb-1`}>
            {hero.name}
          </Text>

          <Text
            style={tw`text-xs text-hero-cyan font-semibold uppercase tracking-wider mb-2`}
          >
            Power Stats
          </Text>

          <View style={tw`gap-1.5`}>
            <SkillBar label="PWR" value={hero.powerstats.power} />
            <SkillBar label="STR" value={hero.powerstats.strength} />
            <SkillBar label="INT" value={hero.powerstats.intelligence} />
            <SkillBar label="SPD" value={hero.powerstats.speed} />
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleViewDetails}
        style={[
          tw`mt-4 py-3 rounded-xl flex-row justify-center items-center`,
          {
            backgroundColor: tw.color("hero-cyan"),
            shadowColor: tw.color("hero-cyan"),
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 4,
          },
        ]}
      >
        <Text style={tw`text-white font-bold text-base`}>View Details</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeroCard;
