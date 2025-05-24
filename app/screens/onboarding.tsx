import Pagination from "@/components/Pagination";
import SplashButton from "@/components/SplashButton";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useAuth } from "../context/AuthContext";

type TitlePart = {
  text: string;
  highlight: boolean;
};

type SplashItem = {
  id: number;
  title: TitlePart[];
  desc: string;
  img: any;
};

export default function OnBoarding() {
  const { authState } = useAuth();
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const flatListRef = useAnimatedRef<FlatList<any>>();
  // variable x is used to store contentOffset.x value when scrolling
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);

  const onViewableItemChanged = ({ viewableItems }: any) => {
    flatListIndex.value = viewableItems[0].index;
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const RenderItem = ({ item, index }: { item: SplashItem; index: number }) => {
    // image animation
    const imageAnimationStyle = useAnimatedStyle(() => {
      const opacityAnimation = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [0, 1, 0],
        Extrapolation.CLAMP
      );
      // const translateYAnimation = interpolate(
      //   x.value,
      //   [
      //     (index - 1) * SCREEN_WIDTH,
      //     index * SCREEN_WIDTH,
      //     (index + 1) * SCREEN_WIDTH,
      //   ],
      //   [100, 0, 100],
      //   Extrapolation.CLAMP
      // );
      return {
        opacity: opacityAnimation,
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_WIDTH * 0.8,
        // transform: [{ translateY: translateYAnimation }],
      };
    });

    // text animation
    const textAnimationStyle = useAnimatedStyle(() => {
      const opacityAnimation = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [0, 1, 0],
        Extrapolation.CLAMP
      );
      // const translateYAnimation = interpolate(
      //   x.value,
      //   [
      //     (index - 1) * SCREEN_WIDTH,
      //     index * SCREEN_WIDTH,
      //     (index + 1) * SCREEN_WIDTH,
      //   ],
      //   [100, 0, 100],
      //   Extrapolation.CLAMP
      // );
      return {
        opacity: opacityAnimation,
        // transform: [{ translateY: translateYAnimation }],
      };
    });

    useEffect(() => {
      if (!authState) {
        SplashScreen.hideAsync();
      }
    }, []);

    return (
      <View
        className="flex-[1] justify-center gap-[36] items-center p-[24px]"
        style={{ width: SCREEN_WIDTH }}
      >
        <Animated.Image source={item.img} style={imageAnimationStyle} />

        {/* Pagination Dash */}
        <Pagination data={splashData} x={x} screenWidth={SCREEN_WIDTH} />

        {/* Title and Description */}
        <Animated.View style={textAnimationStyle}>
          <Text className="text-[32px] font-satoshi-bold font-[700] text-center leading-[40px] mb-[10px]">
            {item.title.map((part, idx) => (
              <Text
                key={idx}
                className={
                  part.highlight ? "text-primary-300" : "text-black-100"
                }
              >
                {part.text}
              </Text>
            ))}
          </Text>
          <Text className="text-black-200 text-[16px] font-satoshi font-[500] text-center leading-[100%]">
            {item.desc}
          </Text>
        </Animated.View>

        {/* Navigation Buttons */}
        <SplashButton
          flatListRef={flatListRef}
          flatListIndex={flatListIndex}
          dataLength={splashData.length}
        />
      </View>
    );
  };
  return (
    <SafeAreaView className="flex-[1] bg-[#FFF]">
      <Animated.FlatList
        ref={flatListRef}
        onScroll={onScroll}
        data={splashData}
        renderItem={({ item, index }) => {
          return <RenderItem item={item} index={index} />;
        }}
        keyExtractor={(item) => item.id.toString()}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemChanged}
      />
    </SafeAreaView>
  );
}

// const splashData = [
//   {
//     id: 1,
//     title: "Send & Receive Money Abroad",
//     desc: "Send money and receive money from Nigeria to any other part of the world.",
//     img: require("../../../assets/images/splash1.png"),
//   },
//   {
//     id: 2,
//     title: "Get Instant Virtual Dollar Card",
//     desc: "Send money and receive money from Nigeria to any other part of the world.",
//     img: require("../../../assets/images/splash2.png"),
//   },
//   {
//     id: 3,
//     title: "Get a payment link to receive money",
//     desc: "Send money and receive money from Nigeria to any other part of the world.",
//     img: require("../../../assets/images/splash3.png"),
//   },
// ];

const splashData = [
  {
    id: 1,
    title: [
      { text: "Send & Receive", highlight: true },
      { text: " Money Abroad", highlight: false },
    ],
    desc: "Send money and receive money from Nigeria to any other part of the world.",
    img: require("../../assets/images/splash1.png"),
  },
  {
    id: 2,
    title: [
      { text: "Get Instant Virtual ", highlight: false },
      { text: "Dollar Card", highlight: true },
    ],
    desc: "Send money and receive money from Nigeria to any other part of the world.",
    img: require("../../assets/images/splash2.png"),
  },
  {
    id: 3,
    title: [
      { text: "Get a ", highlight: false },
      { text: "payment link", highlight: true },
      { text: " to receive money", highlight: false },
    ],
    desc: "Send money and receive money from Nigeria to any other part of the world.",
    img: require("../../assets/images/splash3.png"),
  },
];
