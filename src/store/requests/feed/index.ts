import { axiosInstance } from 'src/store/services';
import { FeedItem, GetUserFeedProps, LikeFeedPostProps } from './types';

export async function getUserFeed({ userId, take }: GetUserFeedProps): Promise<Array<FeedItem>> {
  const response = await axiosInstance.get(`/feed/${userId}/${take}`);
  return response.data;
}

export async function likeFeedPost(body: LikeFeedPostProps): Promise<void> {
  return axiosInstance.patch('/feed/post/like', body);
}
