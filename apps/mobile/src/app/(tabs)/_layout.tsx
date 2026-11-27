import { Redirect, Tabs } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import { useTheme } from '@/theme/ThemeProvider';

export default function TabsLayout() {
  const { session, loading } = useAuth();
  const { colors } = useTheme();

  if (loading) {
    return null;
  }

  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarLabel: 'Home' }} />
      <Tabs.Screen name="pois" options={{ title: 'My POIs', tabBarLabel: 'My POIs' }} />
      <Tabs.Screen name="tasks" options={{ title: 'Tasks', tabBarLabel: 'Tasks' }} />
      <Tabs.Screen name="progress" options={{ title: 'Progress', tabBarLabel: 'Progress' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarLabel: 'Profile' }} />
    </Tabs>
  );
}
