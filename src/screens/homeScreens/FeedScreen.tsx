import { Ionicons } from '@expo/vector-icons';
import { Box, Flex, Heading, ScrollView, Spinner, Text } from 'native-base';
import { CustomButton, CustomHeader, Publication } from 'src/components';
import { useAuth } from 'src/contexts/auth';
import { useGetUserFeed } from 'src/store';

export function FeedScreen() {
  const { user } = useAuth();

  const { data: feed, isLoading } = useGetUserFeed({ userId: user?.id ?? 0, take: 10 });

  return (
    <Flex flex={1} bgColor="white" direction="column" align="center">
      <CustomHeader justify="flex-start">
        <Heading color="brand.100" fontWeight="500" fontSize="lg" textAlign="center">
          Publicações
        </Heading>
      </CustomHeader>
      <ScrollView w="100%" h="100%" overScrollMode="never" px={5}>
        <Flex w="100%" align="flex-end" my={5}>
          <CustomButton
            bgColor="opacity.green-40"
            w="auto"
            rounded="full"
            rightIcon={<Ionicons name="arrow-forward" size={20} color="black" />}
          >
            <Text color="black" fontWeight="500">
              Faça uma publicação
            </Text>
          </CustomButton>
        </Flex>
        <Flex h="100%">
          {isLoading ? (
            <Flex flex={1} justify="center" align="center" h="200">
              <Spinner color="brand.50" size={50} />
            </Flex>
          ) : (
            <Box>
              {feed?.map(post => (
                <Publication
                  key={post.id}
                  postId={post.id}
                  status={post.status}
                  postImage={post.image}
                  likedBy={post.likedBy}
                  likesCount={post.likes}
                  isFriend={post.isFriend}
                  createdAt={post.created_at}
                  topicName={post.topic.label}
                  postDescription={post.description}
                  name={post.user_elderly.first_name}
                  profileImage={post.user_elderly.photo}
                />
              ))}
            </Box>
          )}
        </Flex>
      </ScrollView>
    </Flex>
  );
}
