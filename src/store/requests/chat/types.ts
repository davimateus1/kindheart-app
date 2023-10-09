export type CreateChatProps = {
  user_one_id: string;
  user_two_id: string;
  activity_id: string;
};

export type CreateChatReturn = {
  data: { chat_id: string; user_sender_id: string; activity_id: string };
};

export type GetChatProps = {
  userSenderId: string;
  chatId: string;
  activityId: string;
};
