import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView, AppRegistry } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton"
import { icons, images } from "../constants";


export default function App() {

  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView
          contentContainerStyle={{
            height: "100%",
          }}
        >
          <View className="w-full flex justify-center items-center min-h-[85vh] px-4">
            <Image
              source={images.logoSmall}
              className="w-[130px] h-[84px]"
              resizeMode="contain"
            />
            <Text className="text-secondary-200 text-5xl font-bold text-center">Filmaora{"\n"}</Text>


            <View className="relative mt-5">
              <Text className="text-3xl text-white font-bold text-center">
                Your global streaming guide.{" "}
              </Text>
            </View>

            <CustomButton
              title="Start Search"
              handlePress={() => router.push("/explore")}
              containerStyles="w-full mt-7"
            />

          </View>
        </ScrollView>
        <StatusBar
          backgroundColor="#161622"
          style="light" />
      </SafeAreaView>
    </>
  );
}
