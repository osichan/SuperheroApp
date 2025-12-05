import { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { X, Filter } from "lucide-react-native";
import tw from "@utils/tw";
import { colors } from "@constants/colors";

export interface FilterOptions {
  minStrength: number;
  minIntelligence: number;
  minSpeed: number;
  minPower: number;
  minDurability: number;
  minCombat: number;
}

interface FilterModalProps {
  visible: boolean;
  onClose(): void;
  onApply(filters: FilterOptions): void;
  currentFilters: FilterOptions;
}

const FILTER_CATEGORIES = [
  { key: "minStrength" as keyof FilterOptions, label: "Strength" },
  { key: "minIntelligence" as keyof FilterOptions, label: "Intelligence" },
  { key: "minSpeed" as keyof FilterOptions, label: "Speed" },
  { key: "minPower" as keyof FilterOptions, label: "Power" },
  { key: "minDurability" as keyof FilterOptions, label: "Durability" },
  { key: "minCombat" as keyof FilterOptions, label: "Combat" },
];

const FILTER_VALUES = [
  { label: "Any", value: 0 },
  { label: "20+", value: 20 },
  { label: "40+", value: 40 },
  { label: "60+", value: 60 },
  { label: "80+", value: 80 },
];

const FilterModal = ({
  visible,
  onClose,
  onApply,
  currentFilters,
}: FilterModalProps) => {
  const [filters, setFilters] = useState<FilterOptions>(currentFilters);

  useEffect(() => {
    if (visible) {
      setFilters(currentFilters);
    }
  }, [visible, currentFilters]);

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: FilterOptions = {
      minStrength: 0,
      minIntelligence: 0,
      minSpeed: 0,
      minPower: 0,
      minDurability: 0,
      minCombat: 0,
    };
    setFilters(resetFilters);
    onApply(resetFilters);
    onClose();
  };

  const updateFilter = (key: keyof FilterOptions, value: number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[tw`bg-hero-bg rounded-t-3xl`, styles.modalContent]}>
          <View
            style={tw`flex-row items-center justify-between px-6 py-4 border-b border-hero-border`}
          >
            <View style={tw`flex-row items-center gap-2`}>
              <Filter size={24} color={tw.color("hero-cyan")} />
              <Text style={tw`text-xl font-bold text-hero-text`}>
                Filter Heroes
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={tw`p-2`}>
              <X size={24} color={tw.color("hero-text")} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={tw`px-6 py-4`}
            contentContainerStyle={tw`pb-4`}
            showsVerticalScrollIndicator={true}
          >
            {FILTER_CATEGORIES.map((category) => (
              <View key={category.key} style={tw`mb-6`}>
                <Text style={tw`text-base font-semibold text-hero-text mb-3`}>
                  {category.label}
                </Text>
                <View style={tw`flex-row flex-wrap gap-2`}>
                  {FILTER_VALUES.map((filterValue) => {
                    const isSelected =
                      filters[category.key] === filterValue.value;
                    return (
                      <TouchableOpacity
                        key={filterValue.value}
                        onPress={() =>
                          updateFilter(category.key, filterValue.value)
                        }
                        style={[
                          tw`px-4 py-2 rounded-lg border`,
                          isSelected
                            ? {
                                borderColor: tw.color("hero-cyan"),
                                backgroundColor: tw.color("hero-cyan"),
                              }
                            : {
                                borderColor: tw.color("hero-border"),
                                backgroundColor: tw.color("hero-card"),
                              },
                        ]}
                      >
                        <Text
                          style={[
                            tw`font-semibold text-sm`,
                            {
                              color: isSelected
                                ? tw.color("hero-text")
                                : tw.color("hero-text"),
                            },
                          ]}
                        >
                          {filterValue.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ))}
          </ScrollView>

          <View
            style={tw`flex-row gap-3 px-6 py-4 border-t border-hero-border`}
          >
            <TouchableOpacity
              onPress={handleReset}
              style={[
                tw`flex-1 py-3 rounded-xl items-center justify-center border border-hero-border bg-hero-card`,
              ]}
            >
              <Text style={tw`text-hero-text font-bold text-base`}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleApply}
              style={[
                tw`flex-1 py-3 rounded-xl items-center justify-center`,
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
              <Text style={tw`text-white font-bold text-base`}>
                Apply Filters
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.ui.overlay,
    justifyContent: "flex-end",
  },
  modalContent: {
    height: "80%",
  },
});

export default FilterModal;
