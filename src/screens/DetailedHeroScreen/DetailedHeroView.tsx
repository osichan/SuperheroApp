import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Star } from "lucide-react-native";
import { Superhero } from "@models/superhero";
import tw from "@utils/tw";
import { colors } from "@constants/colors";
import SkillBar from "@components/SkillBar";
import HeroImage from "@components/HeroImage";

interface DetailedHeroViewProps {
  hero: Superhero | null;
  loading: boolean;
  isFavorite: boolean;
  onToggleFavorite(): void;
}

const DetailedHeroView = ({
  hero,
  loading,
  isFavorite,
  onToggleFavorite,
}: DetailedHeroViewProps) => {
  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-hero-bg`}>
        <ActivityIndicator size="large" color={colors.accent.secondary} />
      </View>
    );
  }

  if (!hero) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-hero-bg`}>
        <Text style={tw`text-hero-text-muted text-lg`}>Hero not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={tw`flex-1 bg-hero-bg`}>
      <View style={tw`p-6`}>
        <View style={tw`items-center mb-6`}>
          <View style={tw`w-64 h-80`}>
            <HeroImage
              uri={hero.image.url}
              containerStyle={[
                tw`rounded-3xl border-2 border-hero-cyan`,
                {
                  shadowColor: colors.accent.secondary,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 12,
                  elevation: 8,
                },
              ]}
              resizeMode="cover"
            />
          </View>
          <Text style={tw`text-3xl font-bold text-hero-text mt-4 text-center`}>
            {hero.name}
          </Text>
          {hero.biography["full-name"] !== hero.name && (
            <Text style={tw`text-base text-hero-muted text-center mt-1`}>
              {hero.biography["full-name"]}
            </Text>
          )}

          <TouchableOpacity
            onPress={onToggleFavorite}
            style={[
              tw`mt-4 py-3 px-8 rounded-xl flex-row items-center justify-center gap-2`,
              {
                backgroundColor: isFavorite
                  ? tw.color("hero-amber")
                  : tw.color("hero-cyan"),
                shadowColor: isFavorite
                  ? tw.color("hero-amber")
                  : tw.color("hero-cyan"),
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 6,
                elevation: 4,
              },
            ]}
          >
            <Star
              size={20}
              color={tw.color("hero-text")}
              fill={isFavorite ? tw.color("hero-text") : "none"}
            />
            <Text style={tw`text-white font-bold text-base`}>
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={tw`mb-6`}>
          <Text style={tw`text-xl font-bold text-hero-cyan mb-3`}>
            Biography
          </Text>
          <View
            style={tw`bg-hero-card rounded-xl p-4 border border-hero-border gap-2`}
          >
            <InfoRow label="Publisher" value={hero.biography.publisher} />
            <InfoRow label="Alignment" value={hero.biography.alignment} />
            {hero.biography.aliases.length > 0 &&
              hero.biography.aliases[0] !== "-" && (
                <InfoRow
                  label="Aliases"
                  value={hero.biography.aliases.join(", ")}
                />
              )}
            {hero.biography["place-of-birth"] !== "-" && (
              <InfoRow
                label="Place of Birth"
                value={hero.biography["place-of-birth"]}
              />
            )}
            {hero.biography["first-appearance"] !== "-" && (
              <InfoRow
                label="First Appearance"
                value={hero.biography["first-appearance"]}
              />
            )}
          </View>
        </View>

        <View style={tw`mb-6`}>
          <Text style={tw`text-xl font-bold text-hero-cyan mb-3`}>
            Power Stats
          </Text>
          <View
            style={tw`bg-hero-card rounded-xl p-4 border border-hero-border gap-2.5`}
          >
            <SkillBar
              label="Intelligence"
              value={hero.powerstats.intelligence}
              labelStyle={tw`w-18`}
            />
            <SkillBar
              label="Strength"
              value={hero.powerstats.strength}
              labelStyle={tw`w-18`}
            />
            <SkillBar
              label="Speed"
              value={hero.powerstats.speed}
              labelStyle={tw`w-18`}
            />
            <SkillBar
              label="Durability"
              value={hero.powerstats.durability}
              labelStyle={tw`w-18`}
            />
            <SkillBar
              label="Power"
              value={hero.powerstats.power}
              labelStyle={tw`w-18`}
            />
            <SkillBar
              label="Combat"
              value={hero.powerstats.combat}
              labelStyle={tw`w-18`}
            />
          </View>
        </View>

        <View style={tw`mb-6`}>
          <Text style={tw`text-xl font-bold text-hero-cyan mb-3`}>
            Appearance
          </Text>
          <View
            style={tw`bg-hero-card rounded-xl p-4 border border-hero-border gap-2`}
          >
            <InfoRow label="Gender" value={hero.appearance.gender} />
            {hero.appearance.race !== "null" &&
              hero.appearance.race !== "-" && (
                <InfoRow label="Race" value={hero.appearance.race} />
              )}
            <InfoRow
              label="Height"
              value={hero.appearance.height.join(" / ")}
            />
            <InfoRow
              label="Weight"
              value={hero.appearance.weight.join(" / ")}
            />
            {hero.appearance["eye-color"] !== "-" && (
              <InfoRow label="Eye Color" value={hero.appearance["eye-color"]} />
            )}
            {hero.appearance["hair-color"] !== "-" && (
              <InfoRow
                label="Hair Color"
                value={hero.appearance["hair-color"]}
              />
            )}
          </View>
        </View>

        {(hero.work.occupation !== "-" || hero.work.base !== "-") && (
          <View style={tw`mb-6`}>
            <Text style={tw`text-xl font-bold text-hero-cyan mb-3`}>Work</Text>
            <View
              style={tw`bg-hero-card rounded-xl p-4 border border-hero-border gap-2`}
            >
              {hero.work.occupation !== "-" && (
                <InfoRow label="Occupation" value={hero.work.occupation} />
              )}
              {hero.work.base !== "-" && (
                <InfoRow label="Base" value={hero.work.base} />
              )}
            </View>
          </View>
        )}

        <View style={tw`mb-6`}>
          <Text style={tw`text-xl font-bold text-hero-cyan mb-3`}>
            Connections
          </Text>
          <View
            style={tw`bg-hero-card rounded-xl p-4 border border-hero-border gap-2`}
          >
            {hero.connections["group-affiliation"] !== "-" && (
              <InfoRow
                label="Group Affiliation"
                value={hero.connections["group-affiliation"]}
              />
            )}
            {hero.connections.relatives !== "-" && (
              <InfoRow label="Relatives" value={hero.connections.relatives} />
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View style={tw`flex-row`}>
    <Text style={tw`text-hero-text-muted font-semibold w-32`}>{label}:</Text>
    <Text style={tw`text-hero-text flex-1`}>{value}</Text>
  </View>
);

export default DetailedHeroView;
