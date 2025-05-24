import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import "./global.css";

export default function Root() {
  const [fontsLoaded] = useFonts({
    "Satoshi-Black": require("../assets/fonts/Satoshi-Black.otf"),
    "Satoshi-Bold": require("../assets/fonts/Satoshi-Bold.otf"),
    "Satoshi-Light": require("../assets/fonts/Satoshi-Light.otf"),
    "Satoshi-Medium": require("../assets/fonts/Satoshi-Black.otf"),
    "Satoshi-Regular": require("../assets/fonts/Satoshi-Regular.otf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
