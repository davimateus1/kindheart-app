export type CreateChatProps = {
  user_one_id: string;
  user_two_id: string;
  activity_id: string;
};

export type CreateChatReturn = {
  data: { chat_id: string; user_sender_id: string; activity_id: string };
};

export type GetChatProps = {
  chatId: string;
  activityId: string;
};

export type ElderlyActionProps = {
  activity_id: string;
  elderly_id: string;
  voluntary_id: string;
  chat_id: string;
  action: 'STARTED' | 'CANCELED' | 'FINISHED';
};
