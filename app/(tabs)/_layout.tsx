import { Stack } from "expo-router";
import { useAuth } from "../context/AuthContext";
import OnBoarding from "../screens/onboarding";
import Home from "./home";

export default function HomeLayout() {
  const { authState } = useAuth();

  if (authState?.authenticated) {
    return <Home />;
  }

  if (!authState?.authenticated) {
    return <OnBoarding />;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
