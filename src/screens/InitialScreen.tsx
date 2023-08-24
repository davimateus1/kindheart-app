import React from "react";
import { Flex, Heading, Image, Text } from "native-base";
import ElderlyLogo from "../../assets/elderly-detail.png";
import KindheartLogo from "../../assets/kindheart-logo.png";
import { CustomButton } from "../components";
import { NavigationProp } from "@react-navigation/native";

type InitialScreenProps = {
  navigation: NavigationProp<Record<string, object | undefined>>;
};

export const InitialScreen = ({ navigation }: InitialScreenProps) => {
  const handleNavigateToLogin = () => {
    navigation.navigate("login");
  };

  return (
    <Flex
      flex={1}
      bgColor="white"
      direction="column"
      align="center"
      position="relative"
    >
      <Image source={ElderlyLogo} alt="elderly-logo" w="100%" h="50%" />
      <Image source={KindheartLogo} alt="kindheart-logo" mt={5} />
      <Flex direction="column" w="100%" align="center">
        <Heading color="brand.100" size="2xl" maxW="50%" textAlign="center">
          Conectando gerações
        </Heading>
        <Text color="brand.200" maxW="60%" textAlign="center" mt={5}>
          Um sorriso por vez, transformando e impactando vidas.
        </Text>
      </Flex>
      <CustomButton
        position="absolute"
        bottom={10}
        text="Comece agora"
        onPress={handleNavigateToLogin}
      />
    </Flex>
  );
};
