import { Ionicons } from '@expo/vector-icons';
import { Avatar, Flex, Heading, IconButton, Text } from 'native-base';
import { useAuth } from 'src/contexts/auth';

export function SettingsHeader() {
  const { logout, user } = useAuth();

  return (
    <Flex w="100%" direction="column">
      <Flex direction="row" justify="space-between">
        <Flex direction="row" align="center">
          <Avatar source={{ uri: user?.photo }} size="lg" bg="red.100" mr={2} />
          <Flex>
            <Heading color="brand.100" fontWeight="500" fontSize="lg">
              {user?.first_name} {user?.last_name}
            </Heading>

            <Text color="brand.400" fontSize="sm" fontWeight="200">
              {user?.email}
            </Text>
          </Flex>
        </Flex>
        <IconButton
          variant="unstyled"
          icon={<Ionicons name="exit-outline" size={36} color="black" />}
          onPress={logout}
        />
      </Flex>
    </Flex>
  );
}
