import React from "react";
import { View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

interface PaginationProps {
  data: any[];
  x: SharedValue<number>;
  screenWidth: number;
}

const Pagination = ({ data, x, screenWidth }: PaginationProps) => {
  const PaginationComp = ({ i }: { i: number }) => {
    const animatedDashStyle = useAnimatedStyle(() => {
      const widthAnimation = interpolate(
        x.value,
        [(i - 1) * screenWidth, i * screenWidth, (i + 1) * screenWidth],
        [15, 30, 15],
        Extrapolation.CLAMP
      );
      const opacityAnimation = interpolate(
        x.value,
        [(i - 1) * screenWidth, i * screenWidth, (i + 1) * screenWidth],
        [0.5, 1, 0.5],
        Extrapolation.CLAMP
      );
      return {
        width: widthAnimation,
        opacity: opacityAnimation,
      };
    });

    return (
      <Animated.View
        className="w-[20] h-[8] bg-primary-300 mx-[3] rounded-sm"
        style={animatedDashStyle}
      />
    );
  };
  return (
    <View className="flex flex-row h-[40px] content-center items-center">
      {data.map((_, i) => {
        return <PaginationComp i={i} key={i} />;
      })}
    </View>
  );
};

export default Pagination;
