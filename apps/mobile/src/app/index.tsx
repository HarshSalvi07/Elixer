import { Redirect, type Href } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';

export default function Index() {
  const { session, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (session) {
    return (
      <Redirect
        href={'/(onboarding)/personal-foundation' as Href}
      />
    );
  }

  return <Redirect href="/(auth)/login" />;
}