import React from "react";
import { Pressable, Text, View } from "react-native";

interface ButtonType {
  title: string;
  onPress: () => void;
}

const MainButton = ({ title, onPress }: ButtonType) => {
  return (
    <View className="w-[100%] items-center">
      <Pressable
        onPress={() => {
          onPress();
        }}
        className="bg-primary-300 py-6 rounded-lg w-[100%] items-center justify-center mb-[10px]"
      >
        <Text className="text-accent-100 font-satoshi-bold text-[16px] absolute">
          {title}
        </Text>
      </Pressable>
    </View>
  );
};

export default MainButton;
