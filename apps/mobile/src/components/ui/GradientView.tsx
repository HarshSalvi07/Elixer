import React from 'react';
import {
  LinearGradient,
  type LinearGradientProps,
} from 'expo-linear-gradient';

import { useTheme } from '@/theme/ThemeProvider';

type GradientColors = NonNullable<LinearGradientProps['colors']>;

type GradientViewProps = Omit<LinearGradientProps, 'colors'> & {
  colors?: GradientColors;
};

export function GradientView({
  colors,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  ...props
}: GradientViewProps) {
  const { colors: themeColors } = useTheme();

  const gradientColors: GradientColors = colors ?? [
    themeColors.gradientStart,
    themeColors.gradientMiddle,
    themeColors.gradientEnd,
  ];

  return (
    <LinearGradient
      colors={gradientColors}
      start={start}
      end={end}
      {...props}
    />
  );
}