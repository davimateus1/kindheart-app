import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Flex, Heading, Image, ScrollView, Text } from 'native-base';
import { ImageSourcePropType } from 'react-native';
import { CustomHeader } from './CustomHeader';

type CustomScreenProps = {
  title: string;
  list: string[];
  headTitle: string;
  image: ImageSourcePropType;
};

export function CustomScreen({ image, title, list, headTitle }: CustomScreenProps) {
  const { goBack } = useNavigation();

  const handleGoBack = () => {
    goBack();
  };

  return (
    <Flex flex={1} bgColor="white" direction="column" align="center">
      <CustomHeader
        icon={<AntDesign name="arrowleft" size={20} color="white" />}
        buttonProps={{ onPress: handleGoBack }}
      >
        <Heading color="brand.100" fontWeight="500" fontSize="lg" textAlign="center">
          {headTitle}
        </Heading>
      </CustomHeader>
      <ScrollView w="100%" overScrollMode="never">
        <Image source={image} alt="kindheart-logo" my={5} w="100%" resizeMode="contain" h={200} />
        <Flex direction="column" align="flex-start" px={5} py={2}>
          <Heading color="brand.100" fontWeight="500" fontSize="xl" mb={2}>
            {title}
          </Heading>
          {list.map(item => (
            <Text color="brand.400" fontWeight="400" fontSize="md" key={item} my={1}>
              • {item}
            </Text>
          ))}
        </Flex>
      </ScrollView>
    </Flex>
  );
}
