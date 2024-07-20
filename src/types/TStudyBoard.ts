export type TFormData = {
  title: string;
  content: string;
  img?: string | null;
};

export type TBlackboard = {
  _id: string;
  studyId: string;
  writerId: {
    _id: string;
    nickname: string;
    image: string;
  };
  type: string;
  title?: string;
  content?: string;
  image?: string;
  views?: number;
  createdAt: string;
  icons: any;
};
