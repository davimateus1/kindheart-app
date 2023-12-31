import { Flex, Heading, Image } from 'native-base';
import KindheartLogo from 'assets/images/kindheart-logo.png';
import BigCheck from 'assets/images/big-check-icon.png';

import { CustomButton } from 'src/components';
import { NavigationProp } from '@react-navigation/native';
import { useEffect } from 'react';

type SuccessScreenProps = {
  navigation: NavigationProp<Record<string, object | undefined>>;
};

export function SuccessScreen({ navigation }: SuccessScreenProps) {
  const handleNavigateToLogin = () => {
    navigation.navigate('Login');
  };

  useEffect(
    () => () => {
      navigation.navigate('Login');
    },
    [navigation],
  );

  return (
    <Flex flex={1} bgColor="white" direction="column" align="center">
      <Image source={KindheartLogo} alt="kindheart-logo" mt={2} />
      <Flex direction="column" w="100%" align="center" mt={2} justify="center" h="80%" px={5}>
        <Heading color="brand.100" size="xl" textAlign="center">
          Conta verificada com sucesso!
        </Heading>
        <Image source={BigCheck} alt="kindheart-logo" mt={2} />
        <CustomButton
          w="100%"
          mt={1}
          py={4}
          bgColor="brand.50"
          color="brand.100"
          onPress={handleNavigateToLogin}
        >
          Voltar para o login
        </CustomButton>
      </Flex>
    </Flex>
  );
}
