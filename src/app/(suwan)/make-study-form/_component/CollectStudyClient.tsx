'use client';

import LongButton from '@/components/common/LongButton';
import { useState, useReducer } from 'react';
import SelectCateGory from './SelectCateGory';
import StudyDetailInfoForm from './StudyDetailInfoForm';
import StudyInfoForm from './StudyInfoForm';
import StudyTeammateForm from './StudyTeammateForm';
import { postStudy } from '@/utils/study/studyUtils';
import { TFetchStudy } from '@/types/TStudy';
import { TStudyInfoFormProps, TStudyLocationType } from '@/types/TStudyMake';

import { studyReducer } from '@/utils/study/studyReducer';

export default function CollectStudyClient(props: { id: string }) {
  const { id } = props;
  // console.log(id);
  const mockdata: TFetchStudy = {
    leaderId: id,
    studyImage: '',
    studyName: '',
    studyContent: '',
    studyType: '',
    studyLevel: '',
    studyMember: 0,
    studySubject: '',
    studyCategory: '',
    studyDeadline: '',
    studyStart: '',
    studyEnd: '',
    studyPlace: '',
    studyMeetings: '',
    studyMood: '',
  };

  const [step, setStep] = useState<number>(1);

  const [study, dispatch] = useReducer<React.Reducer<TFetchStudy, any>>(
    studyReducer,
    mockdata,
  );
  // console.log(study);

  const onClickStepOne = (category: string) => {
    dispatch({ type: 'setCategory', payload: category });
  };

  //TODO: any 수정
  const onClickStepTwo = (data: any) => {
    dispatch({ type: 'setImage', payload: data.image });
    dispatch({ type: 'setName', payload: data.title });
    dispatch({ type: 'setContent', payload: data.content });
    dispatch({ type: 'setType', payload: data.locationType });
    dispatch({ type: 'setPlace', payload: data.location });
  };

  const onClickStepThree = (data: any) => {
    dispatch({ type: 'setStart', payload: data.start });
    dispatch({ type: 'setDeadline', payload: data.deadline });
    dispatch({ type: 'setEnd', payload: data.end });
    dispatch({ type: 'setMeetings', payload: data.meetings });
    dispatch({ type: 'setMood', payload: data.mood });
  };

  const onClickStepFour = (data: any) => {
    dispatch({ type: 'setLevel', payload: data.level });
    dispatch({ type: 'setMember', payload: data.member });
  };

  //TODO:any 수정
  const collectstep: any = {
    1: (
      <SelectCateGory
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
        onClickStepFour={onClickStepFour}
      />
    ),
  };
  return (
    <main>
      <header>
        <h2 className="text-content-1 text-gray-700 p-[1.5rem]">취소</h2>
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
