import { useNavigation } from '@react-navigation/native';
import { Flex, Heading, Image, Pressable } from 'native-base';
import { ComponentProps } from 'react';
import { ImageSourcePropType } from 'react-native';

type CareCardProps = {
  title: string;
  navigateFor: string;
  image: ImageSourcePropType;
} & ComponentProps<typeof Flex>;

export function CareCard({ title, image, navigateFor, ...rest }: CareCardProps) {
  const { navigate } = useNavigation();

  const handleNavigate = () => {
    navigate(navigateFor as never);
  };

  return (
    <Flex
      direction="column"
      px={3}
      py={5}
      w="49%"
      justify="center"
      align="center"
      borderRadius={20}
      borderWidth={1}
      borderColor="brand.400"
      h={48}
      bg="brand.300"
      {...rest}
    >
      <Pressable
        onPress={handleNavigate}
        w="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Image source={image} alt={`${image}-alt`} my={5} w="55%" />
        <Heading color="brand.400" fontWeight="200" fontSize="lg" textAlign="center">
          {title}
        </Heading>
      </Pressable>
    </Flex>
  );
}
