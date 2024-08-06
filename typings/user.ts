import { MongoCommon } from './mongodb';
export type Interest =
  | '디자인'
  | '개발 테크'
  | '마케팅'
  | '비즈니스'
  | '경제'
  | '외국어'
  | '자격증'
  | '자기계발';
export type Level = '비기너' | '신입' | '주니어' | '시니어';
export type StudyType = '온라인' | '오프라인' | '상관없음';
export type Mood =
  | '친근한'
  | '전문적인'
  | '진지한'
  | '체계적인'
  | '열정적인'
  | '책임감있는'
  | '학습중심적'
  | '협력적인'
  | '자기주도적'
  | '자유로운';

export interface IUser extends MongoCommon {
  name: string;
  email: string;
  nickname: string;
  image: string;
  matchingInfo?: string;
  sturingPercent: number;
  studyCount: number;
  authProviderId: string;
}

export interface IMatching extends MongoCommon {
  userid: string;
  interest: Interest[];
  level: {
    [key in Interest]: Level;
  };
  studyType: StudyType;
  preferRegion: string[];
  preferMood: Mood[];
  matchingInfo: string;
}

//level 과 preferRegion,Mood 같은경우는 string 보다 조금더 좁은 타입으로 좁힐수있을것같다.
