import React from 'react';
import { Flex, Heading, Image, Text } from 'native-base';
import { NavigationProp } from '@react-navigation/native';
import { CustomButton } from 'src/components';
import KindheartLogo from 'assets/images/kindheart-logo.png';
import ElderlyLogo from 'assets/images/elderly-detail.png';

type InitialScreenProps = {
  navigation: NavigationProp<Record<string, object | undefined>>;
};

export function InitialScreen({ navigation }: InitialScreenProps) {
  const handleNavigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <Flex flex={1} bgColor="white" direction="column" align="center" position="relative">
      <Image source={ElderlyLogo} alt="elderly-logo" w="100%" h="50%" />
      <Image source={KindheartLogo} alt="kindheart-logo" mt={5} />
      <Flex direction="column" w="100%" align="center">
        <Heading color="brand.100" size="xl" maxW="50%" textAlign="center">
          Conectando gerações
        </Heading>
        <Text color="brand.200" maxW="60%" textAlign="center" mt={5}>
          Um sorriso por vez, transformando e impactando vidas.
        </Text>
      </Flex>
      <CustomButton position="absolute" bottom={10} onPress={handleNavigateToLogin}>
        Comece agora
      </CustomButton>
    </Flex>
  );
}
