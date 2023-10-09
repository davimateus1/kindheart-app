import { Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import { Box, Divider, Flex, Heading, ScrollView, Spinner, Text } from 'native-base';
import { Fragment, useState } from 'react';
import { CustomButton, CustomHeader, Publication } from 'src/components';
import { useAuth } from 'src/contexts/auth';
import { useGetUserFeed } from 'src/store';

type FeedScreenProps = {
  navigation: NavigationProp<Record<string, object | undefined>>;
};

const POSTS_TO_ADD = 10;

export function FeedScreen({ navigation }: FeedScreenProps) {
  const { user } = useAuth();
  const [addPosts, setAddPosts] = useState(POSTS_TO_ADD);

  const { data: feed, isLoading } = useGetUserFeed({ userId: user?.id ?? 0, take: addPosts });

  const totalPosts = feed?.[0]?.total_posts ?? 0;

  const handleLoadMorePosts = () => {
    setAddPosts(prev => prev + POSTS_TO_ADD);
  };

  const onScrollPosts = ({ nativeEvent }: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const paddingToBottom = 20;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      if (addPosts <= totalPosts) {
        handleLoadMorePosts();
      }
    }
  };

  const handleNavigateToCreateFeedPost = () => {
    navigation.navigate('CreateFeedPost');
  };

  return (
    <Flex flex={1} bgColor="white" direction="column" align="center">
      <CustomHeader justify="flex-start">
        <Heading color="brand.100" fontWeight="500" fontSize="lg" textAlign="center">
          Publicações
        </Heading>
      </CustomHeader>
      <ScrollView
        w="100%"
        h="100%"
        overScrollMode="never"
        px={5}
        onScroll={onScrollPosts}
        scrollEventThrottle={16}
      >
        <Flex w="100%" align="flex-end" my={5}>
          <CustomButton
            bgColor="opacity.green-40"
            w="auto"
            rounded="full"
            rightIcon={<Ionicons name="arrow-forward" size={20} color="black" />}
            onPress={handleNavigateToCreateFeedPost}
          >
            <Text color="black" fontWeight="500">
              Faça uma publicação
            </Text>
          </CustomButton>
        </Flex>
        <Flex h="100%">
          {totalPosts === 0 ? (
            <Flex flex={1} justify="center" align="center" h="200">
              <Text color="brand.100" fontWeight="500" fontSize="lg">
                Nenhuma publicação encontrada
              </Text>
            </Flex>
          ) : (
            <Box>
              {isLoading ? (
                <Flex flex={1} justify="center" align="center" h="200">
                  <Spinner color="brand.50" size={50} />
                </Flex>
              ) : (
                <Box>
                  {feed?.map((post, index) => (
                    <Fragment key={post.id}>
                      <Publication
                        key={post.id}
                        postId={post.id}
                        status={post.status}
                        postImage={post.image}
                        likedBy={post.likedBy}
                        likesCount={post.likes}
                        isFriend={post.is_friend}
                        createdAt={post.created_at}
                        topicName={post.topic.label}
                        postDescription={post.description}
                        name={post.user_elderly.first_name}
                        userElderlyId={post.user_elderly_id}
                        profileImage={post.user_elderly.photo}
                        role={post.user_elderly.role}
                      />
                      {index !== feed.length - 1 && (
                        <Divider h={1} w="100%" bgColor="brand.50" my={4} opacity={0.25} />
                      )}
                    </Fragment>
                  ))}
                </Box>
              )}
            </Box>
          )}
        </Flex>
      </ScrollView>
    </Flex>
  );
}
