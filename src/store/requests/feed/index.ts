import { axiosInstance } from 'src/store/services';
import { Activity, Topic } from 'src/@types/usersTypes';
import { CreateFeedPostProps, GetUserFeedProps, LikeFeedPostProps } from './types';

export async function getUserFeed({ userId, take }: GetUserFeedProps): Promise<Array<Activity>> {
  const response = await axiosInstance.get(`/feed/${userId}/${take}`);
  return response.data;
}

export async function likeFeedPost(body: LikeFeedPostProps): Promise<void> {
  return axiosInstance.patch('/feed/post/like', body);
}

export async function getTopics(): Promise<Array<Topic>> {
  const response = await axiosInstance.get('/feed/topics');
  return response.data;
}

export async function createFeedPost(body: CreateFeedPostProps): Promise<void> {
  return axiosInstance.post('/feed/post', body);
}
