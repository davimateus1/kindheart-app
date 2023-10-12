import { AntDesign } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import { Divider, Flex, Heading, ScrollView, Text } from 'native-base';
import { CustomButton, CustomHeader } from 'src/components';
import { Linking } from 'react-native';
import { elderlyStatuteSection } from 'src/utils';
import { Fragment } from 'react';

type ElderlyStatuteScreenProps = {
  navigation: NavigationProp<Record<string, object | undefined>>;
};

export function ElderlyStatuteScreen({ navigation }: ElderlyStatuteScreenProps) {
  const statuteLink =
    'https://www.gov.br/mdh/pt-br/centrais-de-conteudo/pessoa-idosa/estatuto-da-pessoa-idosa.pdf/view';

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleOpenStatute = () => {
    Linking.openURL(statuteLink);
  };

  const createSection = (title?: string, content?: string) => (
    <Flex direction="column" align="flex-start" px={5} py={2}>
      <Heading color="brand.100" fontWeight="500" fontSize="xl">
        {title}
      </Heading>
      <Text color="brand.400" fontWeight="400" fontSize="md">
        {content}
      </Text>
    </Flex>
  );

  return (
    <Flex flex={1} bgColor="white" direction="column" align="center">
      <CustomHeader
        icon={<AntDesign name="arrowleft" size={20} color="white" />}
        buttonProps={{ onPress: handleGoBack }}
      >
        <Heading color="brand.100" fontWeight="500" fontSize="lg" textAlign="center">
          Estatuto do Idoso
        </Heading>
      </CustomHeader>
      <ScrollView w="100%" overScrollMode="never">
        {elderlyStatuteSection.map((section, index) => (
          <Fragment key={section.title}>
            {createSection(section.title, section.content)}
            {index !== elderlyStatuteSection.length - 1 && (
              <Divider w="100%" my={2} bg="brand.300" />
            )}
          </Fragment>
        ))}
        <Flex w="100%" align="center" my={5}>
          <CustomButton onPress={handleOpenStatute}>
            <Text color="white" fontWeight="bold" fontSize="lg">
              Clique para saber mais
            </Text>
          </CustomButton>
        </Flex>
      </ScrollView>
    </Flex>
  );
}
