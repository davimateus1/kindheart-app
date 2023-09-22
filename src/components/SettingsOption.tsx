import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Flex, Heading, IconButton, Text } from 'native-base';
import { ComponentProps } from 'react';

type SettingOptionProps = {
  title: string;
  description: string;
  navigateFor: string;
  onEmphasis?: boolean;
  messagesCount?: number;
} & ComponentProps<typeof Flex>;

export function SettingOption({
  title,
  description,
  navigateFor,
  onEmphasis,
  messagesCount,
}: SettingOptionProps) {
  const { navigate } = useNavigation();

  const handleNavigate = () => {
    navigate(navigateFor as never);
  };

  return (
    <Flex direction="row" justify="space-between" align="center" p={3}>
      <Flex>
        <Heading color="brand.100" fontWeight="500" fontSize="lg">
          {title}
        </Heading>

        <Text color="brand.400" fontSize="xs" fontWeight="300">
          {description}
        </Text>
      </Flex>
      {messagesCount && (
        <Flex bg="secondary.50" borderRadius={50} w={7} h={7} justify="center" align="center">
          <Text>{messagesCount}</Text>
        </Flex>
      )}
      <IconButton
        bg={onEmphasis ? 'brand.50' : 'transparent'}
        icon={
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color={onEmphasis ? 'white' : 'gray'}
          />
        }
        borderWidth={1}
        borderColor="brand.300"
        borderRadius={50}
        onPress={handleNavigate}
      />
    </Flex>
  );
}
