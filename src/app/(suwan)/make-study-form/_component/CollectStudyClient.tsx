'use client';
//TODO: 이미지 기본값 넣기
//TODO: reducer만 써보기

import supabase from '@/lib/supabaseClient';
import LongButton from '@/components/common/LongButton';
import { useState, useReducer } from 'react';
import SelectCateGory from './SelectCateGory';
import StudyDetailInfoForm from './StudyDetailInfoForm';
import StudyInfoForm from './StudyInfoForm';
import StudyTeammateForm from './StudyTeammateForm';
import { postStudy } from '@/utils/study/studyUtils';
import { TFetchStudy } from '@/types/TStudy';

import { studyReducer } from '@/utils/study/studyReducer';
import { useRouter } from 'next/navigation';

type TProps = {
  leaderId: string;
  lectureId?: string;
  lectureData?: any;
};
export default function CollectStudyClient(props: TProps) {
  const { leaderId, lectureId, lectureData } = props;
  const router = useRouter();

  let initialStudy: TFetchStudy;
  if (lectureId && lectureData) {
    initialStudy = {
      leaderId: leaderId,
      studyImage: '/images/study-img1.png',
      studyName: '',
      studyContent: '',
      studyType: '',
      studyLevel: '',
      studyMember: 0,
      studyLecture: lectureId,
      studyCategory: lectureData.lectureCategor,
      studyDeadline: '',
      studyStart: '',
      studyEnd: '',
      studyPlace: '',
      studyMeetings: '',
      studyMood: '',
    };
  } else {
    initialStudy = {
      leaderId: leaderId,
      studyImage: '/images/study-img1.png',
      studyName: '',
      studyContent: '',
      studyType: '',
      studyLevel: '',
      studyMember: 0,
      studyLecture: null,
      studyCategory: '',
      studyDeadline: '',
      studyStart: '',
      studyEnd: '',
      studyPlace: '',
      studyMeetings: '',
      studyMood: '',
    };
  }

  const [step, setStep] = useState<number>(1);

  const [study, dispatch] = useReducer<React.Reducer<TFetchStudy, any>>(
    studyReducer,
    initialStudy,
  );

  const onClickStepOne = (category: string) => {
    dispatch({ type: 'setCategory', payload: category });
  };

  //TODO: any 수정
  const onClickStepTwo = (studyData: any) => {
    dispatch({ type: 'setImage', payload: studyData.image });
    dispatch({ type: 'setName', payload: studyData.title });
    dispatch({ type: 'setContent', payload: studyData.content });
    dispatch({ type: 'setStudyType', payload: studyData.studyType });
    dispatch({ type: 'setLocation', payload: studyData.location });
  };

  const onClickStepThree = (studyData: any) => {
    dispatch({ type: 'setStart', payload: studyData.start });
    dispatch({ type: 'setDeadline', payload: studyData.deadline });
    dispatch({ type: 'setEnd', payload: studyData.end });
    dispatch({ type: 'setMeetings', payload: studyData.meetings });
    dispatch({ type: 'setMood', payload: studyData.mood });
  };

  const onClickLevel = (level: string) => {
    dispatch({ type: 'setLevel', payload: level });
  };

  const onClickMember = (member: number) => {
    dispatch({ type: 'setMember', payload: member });
  };

  const onSubmitHandler = async () => {
    const fileName = `${Date.now()}-${Math.random()}`;
    const { data, error } = await supabase.storage
      .from('images')
      .upload(fileName, study.studyImage);

    if (error) {
      console.error('이미지 업로드 실패:', error);
      return;
    }
    const { data: urlData } = supabase.storage
      .from('images')
      .getPublicUrl(fileName);
    const supaUrl = urlData.publicUrl;

    // console.log('타입', typeof supaUrl);

    //스터디 복제해서 이미지만 변경
    const updatedStudy = { ...study, studyImage: supaUrl };

    await postStudy(updatedStudy, leaderId);
    router.push('/make-study-form/complete');
  };
  //TODO:any 수정
  const collectstep: any = {
    1: (
      <SelectCateGory
        lectureData={lectureData}
        step={step}
        setStep={setStep}
        study={study}
        onClickStepOne={onClickStepOne}
      />
    ),
    2: (
      <StudyInfoForm
        step={step}
        setStep={setStep}
        onClickStepTwo={onClickStepTwo}
      />
    ),
    3: (
      <StudyDetailInfoForm
        step={step}
        setStep={setStep}
        study={study}
        onClickStepThree={onClickStepThree}
      />
    ),
    4: (
      <StudyTeammateForm
        step={step}
        setStep={setStep}
        study={study}
        onClickLevel={onClickLevel}
        onClickMember={onClickMember}
        dispatch={dispatch}
        onSubmitHandler={onSubmitHandler}
      />
    ),
  };
  return (
    <main>
      <header>
        <h2
          onClick={() => router.back()}
          className="text-content-1 text-gray-700 p-[1.5rem]"
        >
          취소
        </h2>
        <div className="w-full bg-gray-400 rounded-full h-[0.4rem]  ">
          <div
            className="bg-main-500 h-[0.4rem] rounded-full"
            style={{ width: `${step * 25}%` }}
          ></div>
        </div>
      </header>
      <section className="min-h-[62rem]"> {collectstep[step]}</section>
    </main>
  );
}
