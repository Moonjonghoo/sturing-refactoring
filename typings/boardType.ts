import { MongoCommon } from './mongodb';

export type TBoardIcon = 'check' | 'heart' | 'good' | 'smile' | 'clap' | 'sad';

export interface IBlackBoard extends MongoCommon {
  studyId: string;
  writerId: string;
  type: string;
  title: string;
  content: string;
  image: string;
  views: number;
  icons: string[];
}

export interface IComments extends MongoCommon {
  commentWriteId: string;
  commentContent: string;
  studyId: string;
}

export interface IBoardIcons extends MongoCommon {
  iconName: TBoardIcon;
  blackboardId: string;
}

export interface IBlackBoardComments extends MongoCommon {
  blackboardId: string;
  userId: string;
  comment: string;
  likes: string[];
}

//좋아요 등도 타입으로따로지정가능
