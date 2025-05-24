import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_URL, useAuth } from "../context/AuthContext";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin } = useAuth();

  useEffect(() => {
    const testCall = async () => {
      try {
        const result = await axios.get(`${API_URL}/users`);
        console.log("users", result.data);
      } catch (error) {
        console.log("API call failed:", error);
      }
    };
    testCall();
  }, []);

  const login = async () => {
    const result = await onLogin!(email, password);
    if (result && result.error) {
      alert(result.msg);
    }
  };

  return (
    <SafeAreaView className="flex-[1] bg-[#fff]">
      <View className="flex-1 justify-between items-center p-[24px]">
        <View className="flex flex-col gap-[24px]">
          <View className="flex flex-row items-center justify-between w-full">
            <TouchableWithoutFeedback onPress={() => router.back()}>
              <Entypo name="chevron-left" size={28} color="black" />
            </TouchableWithoutFeedback>
            <Text className="font-satoshi font-[700] text-[24px] text-center text-black-100">
              Login
            </Text>
            <Feather name="info" size={28} color="black" />
          </View>
          <Text className="font-satoshi-black text-[24px] font-[900] text-black-100 text-left">
            Welcome Back,
          </Text>
          <Text className="font-satoshi font-[500] text-[16px] text-accent-300 tracking-[-0.41px] leading-[100%]">
            Sign to your paypoint account by phone number or email address below
          </Text>
          <View className="flex flex-col gap-[8px]">
            <Text className="font-satoshi font-[600] text-[16px] text-black">
              E-Mail
            </Text>
            <TextInput
              placeholder="name@example.com"
              className="bg-[#F4F1F9] rounded p-4"
              style={{ padding: 16, paddingVertical: 16 }}
              onChangeText={(text: string) => setEmail(text)}
              value={email}
            />
          </View>
          <View className="flex flex-col gap-[8px]">
            <Text className="font-satoshi font-[600] text-[16px] text-black">
              Password
            </Text>
            <TextInput
              placeholder="Password"
              className="bg-[#F4F1F9] rounded p-4"
              style={{ padding: 16, paddingVertical: 16 }}
              onChangeText={(text: string) => setPassword(text)}
              value={password}
            />
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              router.push("/screens/sign-up");
            }}
          >
            <View className="">
              <Text className="text-black-100 font-satoshi-medium text-[16px] underline absolute">
                Don&apos;t have an account? Register!
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View className="w-[100%] items-center">
          <Pressable
            onPress={login}
            className="bg-primary-300 py-6 rounded-lg w-[100%] items-center justify-center mb-[10px]"
          >
            <Text className="text-accent-100 font-satoshi-bold text-[16px] absolute">
              Continue
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
