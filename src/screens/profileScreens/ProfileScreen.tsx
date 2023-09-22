import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { Avatar, Divider, Flex, Heading, Image, ScrollView, Spinner, Text } from 'native-base';
import { RoleType } from 'src/@types/authTypes';
import { CustomButton, CustomHeader, InfoCard } from 'src/components';
import { useAuth } from 'src/contexts/auth';
import { useGetUserProfile } from 'src/store';

type ProfileScreenProps = {
  route: RouteProp<
    Record<
      string,
      {
        userId: number;
        userType: RoleType;
      }
    >,
    'ProfileScreen'
  >;
  navigation: NavigationProp<Record<string, object>>;
};

export function ProfileScreen({ route, navigation }: ProfileScreenProps) {
  console.log(navigation); // TODO: remove this line after use

  const { params } = route;
  const { user } = useAuth();

  const chooseUser = () => {
    if (params?.userId && params?.userType) {
      return { id: params.userId, role: params.userType };
    }
    return { id: user?.id ?? 0, role: user?.role ?? 'VOLUNTARY' };
  };

  const { data: userProfile, isLoading } = useGetUserProfile({
    userId: chooseUser().id,
    userType: chooseUser().role,
  });

  const activitiesCount = userProfile?.activities_voluntary.length ?? 0;
  const reviewsCount = userProfile?.user_reviews.length ?? 0;

  return (
    <Flex flex={1} bgColor="white" direction="column" align="center">
      <CustomHeader>
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
              />
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
              <Flex direction="row" w="80%" justify="space-between" my={3}>
                <CustomButton
                  w="48.5%"
                  leftIcon={<Ionicons name="chatbox-ellipses-outline" size={24} color="black" />}
                  bg="white"
                  borderWidth={1}
                  borderColor="brand.300"
                  rounded="full"
                >
                  <Text color="brand.400">Mensagem</Text>
                </CustomButton>
                <CustomButton
                  w="48.5%"
                  leftIcon={<Ionicons name="add-circle-outline" size={24} color="white" />}
                  borderWidth={1}
                  borderColor="brand.300"
                  rounded="full"
                >
                  Adicionar
                </CustomButton>
              </Flex>
            )}
            <Flex w="100%" direction="row" justify="space-around" my={5}>
              <InfoCard label="Publicações" value={activitiesCount} w="40%" />
              <InfoCard label="Feedbacks" value={reviewsCount} w="40%" />
            </Flex>
          </Flex>
          <Divider w="100%" bg="brand.300" />
          <Flex w="100%">
            {userProfile?.activities_voluntary.map(activity => (
              <Flex key={activity.image} w="100%" h={200} p={4} my={2}>
                <Image
                  source={{ uri: activity.image }}
                  alt="activity"
                  w="100%"
                  h={200}
                  resizeMode="cover"
                />
              </Flex>
            ))}
            {userProfile?.activities_voluntary.length === 0 && (
              <Flex w="100%" align="center" py={8}>
                <Text color="brand.50" fontSize="xl" fontWeight="500" maxW="80%" textAlign="center">
                  Nenhuma publicação encontrada
                </Text>
              </Flex>
            )}
          </Flex>
        </ScrollView>
      )}
    </Flex>
  );
}
