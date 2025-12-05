export const colors = {
  background: {
    primary: "#0A0E17",
    secondary: "#141B2D",
    card: "#1A2235",
    elevated: "#232D42",
  },

  accent: {
    primary: "#FF3366",
    secondary: "#00D4FF",
    gold: "#FFD700",
    purple: "#9945FF",
    lime: "#39FF14",
  },

  text: {
    primary: "#FFFFFF",
    secondary: "#8B98B8",
    muted: "#5A6785",
    inverse: "#0A0E17",
  },

  power: {
    weak: "#FF4757",
    low: "#FF7F50",
    medium: "#FFD93D",
    high: "#6BCB77",
    godlike: "#00D4FF",
  },

  ui: {
    border: "#2D3A56",
    borderFocus: "#00D4FF",
    shadow: "#000000",
    overlay: "rgba(10, 14, 23, 0.85)",
  },

  gradients: {
    heroCard: ["#1A2235", "#232D42"],
    powerBar: ["#FF3366", "#9945FF"],
    header: ["#0A0E17", "#141B2D"],
    glow: ["#00D4FF", "#9945FF"],
  },
} as const;

export const tw_colors = {
  "hero-bg": colors.background.primary,
  "hero-bg-secondary": colors.background.secondary,
  "hero-card": colors.background.card,
  "hero-elevated": colors.background.elevated,

  "hero-accent": colors.accent.primary,
  "hero-cyan": colors.accent.secondary,
  "hero-gold": colors.accent.gold,
  "hero-purple": colors.accent.purple,
  "hero-lime": colors.accent.lime,
  "hero-amber": "#F59E0B",

  "hero-text": colors.text.primary,
  "hero-text-secondary": colors.text.secondary,
  "hero-text-muted": colors.text.muted,
  "hero-text-inverse": colors.text.inverse,

  "hero-border": colors.ui.border,
  "hero-border-focus": colors.ui.borderFocus,

  "hero-shadow": colors.ui.shadow,
  "hero-overlay": colors.ui.overlay,
  "hero-overlay-dark": "rgba(0, 0, 0, 0.7)",
  "hero-overlay-light": "rgba(0, 0, 0, 0.5)",

  "hero-error": "#DC2626",
  "hero-warning": "#F59E0B",
  "hero-success": colors.power.high,

  "power-weak": colors.power.weak,
  "power-low": colors.power.low,
  "power-medium": colors.power.medium,
  "power-high": colors.power.high,
  "power-godlike": colors.power.godlike,
} as const;

export default colors;
