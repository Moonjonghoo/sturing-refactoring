import { MongoCommon } from './mongodb';

export interface IBookmark extends MongoCommon {
  targetId: string;
  checked: boolean;
  userId: string;
}
