import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { signOut } from '@/services/auth/auth.service';
import { useAuth } from '@/providers/AuthProvider';
import { useTheme } from '@/theme/ThemeProvider';

export default function ProfileScreen() {
  const { user } = useAuth();
  const { colors, radius, typography } = useTheme();

  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);

    try {
      const { error } = await signOut();

      if (error) {
        Alert.alert('Sign out failed', error.message);
      }
    } catch {
      Alert.alert('Error', 'Something went wrong while signing out.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: colors.text,
            fontSize: typography.fontSize['3xl'],
            lineHeight: typography.lineHeight['3xl'],
          },
        ]}
      >
        Profile
      </Text>

      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderRadius: radius.lg,
          },
        ]}
      >
        <Text style={[styles.label, { color: colors.textMuted }]}>
          Signed in as
        </Text>

        <Text style={[styles.email, { color: colors.text }]}>
          {user?.email ?? 'No email available'}
        </Text>
      </View>

      <Pressable
        onPress={handleSignOut}
        disabled={loading}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: colors.error,
            borderRadius: radius.md,
            opacity: pressed || loading ? 0.7 : 1,
          },
        ]}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Sign Out</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontWeight: '700',
    marginBottom: 24,
  },
  card: {
    borderWidth: 1,
    padding: 20,
    marginBottom: 24,
    gap: 8,
  },
  label: {
    fontSize: 14,
  },
  email: {
    fontSize: 16,
    fontWeight: '600',
  },
  button: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
