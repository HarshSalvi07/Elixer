export const Colors = {
  light: {
    // Brand
    primary: '#7775E8',
    primaryHover: '#6664D6',
    secondary: '#38B99A',

    // Backgrounds
    background: '#F6F7FB',
    surface: '#FFFFFF',
    surfaceSecondary: '#EFF0F6',

    // Text
    text: '#171923',
    textSecondary: '#666B7A',
    textMuted: '#969BAA',
    textOnPrimary: '#FFFFFF',

    // Borders
    border: '#E5E7EF',

    // Status
    success: '#239B7A',
    warning: '#E6A23C',
    error: '#DC5B64',
  },

  dark: {
    // Brand
    primary: '#9290FF',
    primaryHover: '#AAA8FF',
    secondary: '#48C9A7',

    // Backgrounds
    background: '#171923',
    surface: '#202330',
    surfaceSecondary: '#292D3B',

    // Text
    text: '#F5F6FA',
    textSecondary: '#B6BBCB',
    textMuted: '#858B9D',
    textOnPrimary: '#171923',

    // Borders
    border: '#363A49',

    // Status
    success: '#48C9A7',
    warning: '#F0B85B',
    error: '#F07880',
  },
} as const;

export type ThemeMode = keyof typeof Colors;
export type ThemeColors = typeof Colors.light;