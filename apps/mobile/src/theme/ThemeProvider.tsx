import React, {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';

import { useColorScheme } from 'react-native';
import { Colors, type ThemeMode } from './colors';
import { Spacing } from './spacing';
import { Radius } from './radius';
import { Typography } from './typography';

type ThemeContextValue = {
  mode: ThemeMode;
  colors: (typeof Colors)[ThemeMode];
  spacing: typeof Spacing;
  radius: typeof Radius;
  typography: typeof Typography;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemColorScheme = useColorScheme();

  const mode: ThemeMode =
    systemColorScheme === 'dark' ? 'dark' : 'light';

  const theme = useMemo(
    () => ({
      mode,
      colors: Colors[mode],
      spacing: Spacing,
      radius: Radius,
      typography: Typography,
    }),
    [mode],
  );

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }

  return context;
}