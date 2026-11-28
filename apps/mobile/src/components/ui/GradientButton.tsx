import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { GradientView } from '@/components/ui/GradientView';
import { useTheme } from '@/theme/ThemeProvider';

type GradientButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function GradientButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  style,
}: GradientButtonProps) {
  const { colors, spacing, radius, typography } = useTheme();

  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{
        disabled: isDisabled,
        busy: loading,
      }}
      style={style}
    >
      <GradientView
        style={[
          styles.button,
          {
            paddingVertical: spacing.lg,
            paddingHorizontal: spacing.xl,
            borderRadius: radius.lg,
            opacity: isDisabled ? 0.6 : 1,
          },
        ]}
      >
        {loading ? (
          <ActivityIndicator color={colors.textOnPrimary} />
        ) : (
          <Text
            style={{
              color: colors.textOnPrimary,
              fontSize: typography.fontSize.md,
              fontWeight: '600',
              textAlign: 'center',
            }}
          >
            {title}
          </Text>
        )}
      </GradientView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});