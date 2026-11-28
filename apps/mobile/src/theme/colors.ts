export const Colors = {
  light: {
    // Brand
    primary: '#2563EB',
    primaryHover: '#1D4ED8',
    secondary: '#0D9488',

    // Gradient
    gradientStart: '#2563EB',
    gradientMiddle: '#0D9488',
    gradientEnd: '#16A34A',

    // Backgrounds
    background: '#F5F8FC',
    surface: '#FFFFFF',
    surfaceSecondary: '#EDF3F8',

    // Text
    text: '#172033',
    textSecondary: '#5D6B80',
    textMuted: '#8A97AA',
    textOnPrimary: '#FFFFFF',

    // Borders
    border: '#DCE5EF',

    // Status
    success: '#15803D',
    warning: '#D97706',
    error: '#DC2626',
  },

  dark: {
    // Brand
    primary: '#60A5FA',
    primaryHover: '#93C5FD',
    secondary: '#2DD4BF',

    // Gradient
    gradientStart: '#60A5FA',
    gradientMiddle: '#2DD4BF',
    gradientEnd: '#4ADE80',

    // Backgrounds
    background: '#0B1220',
    surface: '#111C2E',
    surfaceSecondary: '#18263A',

    // Text
    text: '#F1F5F9',
    textSecondary: '#B0BDD0',
    textMuted: '#8291A8',
    textOnPrimary: '#FFFFFF',

    // Borders
    border: '#29384D',

    // Status
    success: '#4ADE80',
    warning: '#FBBF24',
    error: '#F87171',
  },
} as const;

export type ThemeMode = keyof typeof Colors;
export type ThemeColors = (typeof Colors)[ThemeMode];