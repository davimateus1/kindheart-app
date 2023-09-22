import { AntDesign } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import { Flex, Heading, Image, ScrollView, Text } from 'native-base';
import { CareCard, CustomHeader } from 'src/components';

import KindheartLogo from 'assets/images/kindheart-logo.png';
import { elderlyTipsSection } from 'src/utils';

type ElderlyTipsScreenProps = {
  navigation: NavigationProp<Record<string, object | undefined>>;
};

export function ElderlyTipsScreen({ navigation }: ElderlyTipsScreenProps) {
  const handleGoBack = () => {
    navigation.goBack();
  };

  const firstLine = elderlyTipsSection.slice(0, 2);
  const secondLine = elderlyTipsSection.slice(2, 4);

  return (
    <Flex flex={1} bgColor="white" direction="column" align="center">
      <CustomHeader
        icon={<AntDesign name="arrowleft" size={20} color="white" />}
        buttonProps={{ onPress: handleGoBack }}
      >
        <Heading color="brand.100" fontWeight="500" fontSize="lg" textAlign="center">
          Cuidados Essenciais
        </Heading>
      </CustomHeader>
      <Image source={KindheartLogo} alt="kindheart-logo" my={8} w="80%" />
      <ScrollView w="100%" overScrollMode="never" px={5}>
        <Flex direction="column" w="100%" justify="space-between" align="center" p={1.5}>
          <Flex direction="row" justify="space-between" w="100%">
            {firstLine.map(item => (
              <CareCard
                key={item.title}
                image={item.image}
                title={item.title}
                navigateFor={item.path}
              />
            ))}
          </Flex>
          <Flex direction="row" justify="space-between" w="100%" mt={2}>
            {secondLine.map(item => (
              <CareCard
                key={item.title}
                image={item.image}
                title={item.title}
                navigateFor={item.path}
              />
            ))}
          </Flex>
          <Text color="brand.400" fontWeight="400" fontSize="md" my={6}>
            Aqui você encontrará informações importantes sobre diferentes aspectos do cuidado
            adequado aos idosos. Nossa intenção é fornecer orientações relevantes para garantir o
            bem-estar e a qualidade de vida dos idosos.
          </Text>
        </Flex>
      </ScrollView>
    </Flex>
  );
}
