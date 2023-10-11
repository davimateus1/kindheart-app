import { AntDesign, Ionicons } from '@expo/vector-icons';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { Avatar, Divider, Flex, Heading, ScrollView, Spinner, Text } from 'native-base';
import { RoleType } from 'src/@types/authTypes';
import { CustomButton, CustomHeader, InfoCard } from 'src/components';
import { useAuth } from 'src/contexts/auth';
import { useFriendship, useGetUserProfile } from 'src/store';

type ProfileScreenProps = {
  route: RouteProp<Record<string, { userId: number; userType: RoleType }>>;
  navigation: NavigationProp<Record<string, object>>;
};

export function ProfileScreen({ route, navigation }: ProfileScreenProps) {
  const { params } = route;
  const { user } = useAuth();
  const { friendshipMutate, friendshipLoading } = useFriendship();

  const chooseUser = () => {
    if (params?.userId && params?.userType) {
      return { id: params.userId };
    }
    return { id: user?.id ?? 0 };
  };

  const { data: userProfile, isLoading } = useGetUserProfile({
    userId: chooseUser().id,
  });

  const isFriend = userProfile?.friends?.some(friend => friend === user?.id);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleFriendship = () => {
    friendshipMutate({
      user_one_id: String(user?.id),
      user_two_id: String(userProfile?.id),
      action: isFriend ? 'REMOVE' : 'ADD',
    });
  };

  return (
    <Flex flex={1} bgColor="white" direction="column" align="center">
      <CustomHeader
        icon={params?.userId ? <AntDesign name="arrowleft" size={20} color="white" /> : ''}
        buttonProps={{ onPress: params?.userId ? handleGoBack : () => null }}
      >
        <Heading color="brand.100" fontWeight="500" fontSize="lg" textAlign="center">
          {!isLoading && `Perfil de ${userProfile?.first_name}`}
        </Heading>
      </CustomHeader>
      {isLoading ? (
        <Flex flex={1} justify="center" align="center">
          <Spinner color="brand.50" size={50} />
        </Flex>
      ) : (
        <ScrollView w="100%" mt={5} overScrollMode="never">
          <Flex align="center" px={5}>
            <Flex bg="brand.50" p={1} rounded="full" mt={5}>
              <Avatar
                size="2xl"
                source={{ uri: userProfile?.photo }}
                borderWidth={5}
                borderColor="white"
                bg="brand.400"
              >
                {userProfile?.first_name[0]}
              </Avatar>
            </Flex>
            <Heading color="brand.100" mt={5} fontWeight="500" fontSize="lg">
              {userProfile?.first_name} {userProfile?.last_name}
            </Heading>
            <Text color="brand.400" fontWeight="400" fontSize="md">
              {userProfile?.age} anos
            </Text>
            <Text bg="brand.300" color="brand.50" px={4} borderRadius={20} my={3}>
              {userProfile?.role === 'VOLUNTARY' ? 'Voluntário' : 'Idoso'}
            </Text>

            {params?.userId && (
              <Flex direction="row" w="80%" justify="center" my={3}>
                <CustomButton
                  w="48.5%"
                  rounded="full"
                  borderWidth={1}
                  borderColor="brand.400"
                  bg={isFriend ? 'brand.300' : 'brand.50'}
                  leftIcon={
                    <Ionicons
                      name={isFriend ? 'remove-circle-outline' : 'add-circle-outline'}
                      size={24}
                      color={isFriend ? 'black' : 'white'}
                    />
                  }
                  onPress={handleFriendship}
                  isLoading={friendshipLoading}
                >
                  <Text color={isFriend ? 'black' : 'white'}>
                    {isFriend ? 'Remover' : 'Adicionar'}
                  </Text>
                </CustomButton>
              </Flex>
            )}
            <Flex w="100%" direction="row" justify="space-around" my={5}>
              <InfoCard label="Publicações" value={userProfile?.posts_count ?? 0} w="32.3%" />
              <InfoCard label="Conexões" value={userProfile?.friends_count ?? 0} w="32.3%" />
              <InfoCard label="Interações" value={userProfile?.total_chats ?? 0} w="32.3%" />
            </Flex>
          </Flex>
          <Divider w="100%" bg="brand.300" />
          <Flex w="100%" />
        </ScrollView>
      )}
    </Flex>
  );
}
