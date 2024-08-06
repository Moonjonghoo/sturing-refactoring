import { MongoCommon } from './mongodb';
import { Interest, Mood, StudyType } from './user';

export interface IStudyInfo extends MongoCommon {
  leaderId: string;
  studyImage: string;
  studyName: string;
  studyContent: string;
  studyType: StudyType;
  studyLevel: string;
  studyMember: number;
  studyJoinMember: number;
  studyLecture: string;
  studyCategory: Interest | '기타';
  studyViews: number;
  studyDeadline: string;
  studyStart: string;
  studyEnd: string;
  studyPlace: string;
  studyMeetings: string;
  studyMood: Mood[];
}

//스터디수준 조금더 구체화 (스터디 작성폼만들기)
//studyLevel 이 user.ts 에 Level type 에서 재사용이 불가능
//why ? '신입(1~3년)' vs '신입'

export interface IStudyForm extends MongoCommon {
  studyId: string;
  userId: string;
  studyFormTitle: string;
  studyFormContent: string;
  studyFormRead: boolean;
  studyFormSure: boolean;
}

export interface IStudyMember extends MongoCommon {
  studyId: string;
  userId: string;
  attendance: string[];
  studyProgress: number;
}

export interface IStudyReview extends MongoCommon {
  studyId: string;
  userId: string;
  studyReviewScore: number;
  studyReviewContent: string;
  evaluateduser: string;
}

export interface IStudySchedules extends MongoCommon {
  title: string;
  place: string;
  date: string;
  time: string;
  studyId: string;
}

export interface IStudyTodo extends MongoCommon {
  studyId: string;
  userId: string;
  todoContent: string;
  todoCompleted: boolean;
  date: string;
}
