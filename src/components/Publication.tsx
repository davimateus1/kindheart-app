import { Avatar, Flex, Image, Text } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { renderStatus } from 'src/utils';
import { StatusType } from 'src/@types/authTypes';
import { useAuth } from 'src/contexts/auth';
import { useFriendship, useLikeFeedPost } from 'src/store';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CustomButton } from './CustomButton';

type PublicationProps = {
  name: string;
  postId: number;
  topicName: string;
  createdAt: string;
  likedBy: number[];
  isFriend?: boolean;
  postImage?: string;
  status: StatusType;
  likesCount?: number;
  profileImage?: string;
  postDescription: string;
  userElderlyId: number;
};

export function Publication({
  name,
  status,
  topicName,
  createdAt,
  profileImage,
  likesCount = 0,
  likedBy = [],
  isFriend = false,
  postImage,
  postDescription,
  postId,
  userElderlyId,
}: PublicationProps) {
  const { user } = useAuth();
  const { navigate } = useNavigation() as any;

  const isUserPost = user?.id === userElderlyId;
  const isLiked = likedBy.includes(user?.id as number);

  const { likeMutate } = useLikeFeedPost();
  const { friendshipMutate, friendshipLoading } = useFriendship();

  const convertISODate = (date: string) => {
    const dateObj = new Date(date);
    return `${dateObj.getDate()} ${dateObj.toLocaleString('default', {
      month: 'short',
    })} ${dateObj.getHours()}:${dateObj.getMinutes()}`;
  };

  const handleLikePost = () => {
    likeMutate({
      user_id: String(user?.id),
      post_id: String(postId),
    });
  };

  const handleFriendship = () => {
    friendshipMutate({
      user_one_id: String(user?.id),
      user_two_id: String(userElderlyId),
      action: isFriend ? 'REMOVE' : 'ADD',
    });
  };

  const navigateToProfile = () => {
    if (isUserPost) {
      return navigate('ProfileInfos');
    }

    return navigate('OtherUserProfile', {
      userId: userElderlyId,
      userType: 'ELDERLY',
    });
  };

  return (
    <Flex w="100%" h="auto" maxH={480}>
      <Flex direction="row" align="center" w="100%" justify="space-between" mb={3}>
        <Flex w="65%" direction="row">
          <TouchableOpacity onPress={navigateToProfile}>
            <Avatar source={{ uri: profileImage }} size="lg" mr={2} bg="brand.400">
              {name[0]}
              <Avatar.Badge bg="green.500" borderWidth={1} borderColor="brand.300" />
            </Avatar>
          </TouchableOpacity>
          <Flex justify="space-around" h="auto" w="100%">
            <Flex direction="row">
              <Text color="brand.100" fontWeight="500" fontSize="md">
                {!isUserPost ? name : 'Você'}
              </Text>
              <Text color="brand.100" fontWeight="500" fontSize="md" opacity={0.6} ml={1}>
                • {convertISODate(createdAt)}
              </Text>
            </Flex>

            <Text
              bg="brand.300"
              color="brand.50"
              px={5}
              borderRadius={20}
              textAlign="center"
              borderWidth={1}
              borderColor="brand.400"
              w="60%"
            >
              {topicName}
            </Text>
          </Flex>
        </Flex>
        <Flex w="30%">
          {!isUserPost && (
            <CustomButton
              w="full"
              rounded="full"
              bg={isFriend ? 'brand.300' : 'brand.50'}
              borderWidth={isFriend ? 1 : 0}
              borderColor="brand.400"
              onPress={handleFriendship}
              isLoading={friendshipLoading}
            >
              <Text fontWeight="600" color={isFriend ? 'black' : 'white'}>
                {isFriend ? 'Remover' : 'Adicionar'}
              </Text>
            </CustomButton>
          )}
        </Flex>
      </Flex>
      <Flex w="100%" h="100%">
        {postImage && (
          <Image
            source={{ uri: postImage }}
            alt="activity"
            w="100%"
            h={275}
            resizeMode="cover"
            rounded="md"
          />
        )}
        <Text color="brand.400" my={2} noOfLines={4}>
          {postDescription}
        </Text>
        <Flex direction="row" justify="space-between">
          <Flex direction="row" align="center" w="50%">
            <Ionicons
              name={isLiked ? 'heart' : 'heart-outline'}
              size={26}
              color="black"
              onPress={handleLikePost}
            />
            <Text fontWeight="400" fontSize="md" ml={1} color="black">
              {likesCount}
            </Text>
          </Flex>
          <Flex direction="row" align="center" w="50%" justify="flex-end">
            <Text
              bg={renderStatus(status).bgColor}
              px={5}
              borderRadius={20}
              textAlign="center"
              borderWidth={1}
              color={renderStatus(status).color}
              borderColor={renderStatus(status).color}
              mr={2}
            >
              {renderStatus(status).title}
            </Text>
            {status === 'FREE' && <Ionicons name="paper-plane-outline" size={26} color="black" />}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
