import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';

type PlaceholderScreenProps = {
  title: string;
  description: string;
};

export function PlaceholderScreen({
  title,
  description,
}: PlaceholderScreenProps) {
  const { colors, spacing, radius, typography } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          padding: spacing['2xl'],
        },
      ]}
    >
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderRadius: radius.lg,
            padding: spacing['2xl'],
          },
        ]}
      >
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
              fontSize: typography.fontSize['2xl'],
            },
          ]}
        >
          {title}
        </Text>

        <Text
          style={[
            styles.description,
            {
              color: colors.textSecondary,
              fontSize: typography.fontSize.md,
              marginTop: spacing.sm,
            },
          ]}
        >
          {description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    borderWidth: 1,
  },
  title: {
    fontWeight: '700',
  },
  description: {
    lineHeight: 24,
  },
});