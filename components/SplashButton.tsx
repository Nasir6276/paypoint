import { useRouter } from "expo-router";
import React from "react";
import { FlatList, TouchableWithoutFeedback, View } from "react-native";
import Animated, {
  AnimatedRef,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

interface SplashButtonProps {
  flatListRef: AnimatedRef<FlatList<any>>;
  flatListIndex: SharedValue<number>;
  dataLength: number;
}

const SplashButton = ({
  flatListRef,
  flatListIndex,
  dataLength,
}: SplashButtonProps) => {
  const router = useRouter();
  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      height: 44,
      marginBottom: 20,
    };
  });

  const textAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity: flatListIndex.value === dataLength - 1 ? 0 : 1,
    };
  });

  const text2AnimationStyle = useAnimatedStyle(() => {
    return {
      opacity: flatListIndex.value === dataLength - 1 ? 1 : 0,
    };
  });

  const linkAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity: flatListIndex.value === dataLength - 1 ? 0 : 1,
    };
  });

  const link2AnimationStyle = useAnimatedStyle(() => {
    return {
      opacity: flatListIndex.value === dataLength - 1 ? 1 : 0,
    };
  });

  return (
    <View className="w-[100%] items-center">
      <TouchableWithoutFeedback
        onPress={() => {
          if (flatListIndex.value < dataLength - 1) {
            flatListRef.current?.scrollToIndex({
              index: flatListIndex.value + 1,
            });
          } else {
            router.push("/screens/sign-up");
            console.log("Signup Screen");
          }
        }}
      >
        <Animated.View
          className="bg-primary-300 py-4 rounded-lg w-[100%] items-center justify-center mb-[10px]"
          style={buttonAnimationStyle}
        >
          <Animated.Text
            className="text-accent-100 font-satoshi-bold text-[16px] absolute"
            style={text2AnimationStyle}
          >
            Get Started
          </Animated.Text>
          <Animated.Text
            className="text-accent-100 font-satoshi-bold text-[16px] absolute"
            style={textAnimationStyle}
          >
            Next
          </Animated.Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          if (flatListIndex.value < dataLength - 1) {
            flatListRef.current?.scrollToIndex({
              index: dataLength - 1,
              animated: true,
            });
          } else {
            router.push("/screens/sing-in");
            console.log("Login Screen");
          }
        }}
      >
        <View className="items-center justify-center">
          <Animated.Text
            className="text-black-100 font-satoshi-medium text-[16px] underline absolute"
            style={link2AnimationStyle}
          >
            login
          </Animated.Text>
          <Animated.Text
            className="text-black-100 font-satoshi-medium text-[16px] underline absolute"
            style={linkAnimationStyle}
          >
            skip
          </Animated.Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default SplashButton;
