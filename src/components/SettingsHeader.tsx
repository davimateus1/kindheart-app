import { Ionicons } from '@expo/vector-icons';
import { Avatar, Flex, Heading, IconButton, Text } from 'native-base';
import { UserProfile } from 'src/@types/usersTypes';
import { useAuth } from 'src/contexts/auth';

type SettingsHeaderProps = {
  user?: UserProfile;
};

export function SettingsHeader({ user }: SettingsHeaderProps) {
  const { logout } = useAuth();

  return (
    <Flex w="100%" direction="column">
      <Flex direction="row" justify="space-between">
        <Flex direction="row" align="center">
          <Avatar source={{ uri: user?.photo }} size="lg" mr={2} bg="brand.400">
            {user?.first_name[0]}
          </Avatar>
          <Flex>
            <Heading color="brand.100" fontWeight="500" fontSize="lg">
              {user?.first_name} {user?.last_name}
            </Heading>

            <Text color="brand.400" fontSize="sm" fontWeight="400">
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
