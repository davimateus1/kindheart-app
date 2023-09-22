export type UserProfile = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  personal_phone: string;
  birth_date: string;
  verified: boolean;
  created_at: string;
  updated_at: string;
  photo: string;
  role: string;
  activities_voluntary: Array<Activity>;
  user_reviews: any[]; // TODO: create reviews type
  age: number;
};

export type Activity = {
  image: string;
  // TODO: create activity type
};
