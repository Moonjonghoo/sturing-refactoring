'use client';

import MatchingFooter from '@/components/matching/MatchingFooter';
import { postMatchingInfo, updateMatchingInfo } from '@/utils/matchingUtils';
import matchingreducer, { TActionType } from '@/utils/matchingreducer';
import { useEffect, useReducer, useState } from 'react';
import { GoChevronLeft } from 'react-icons/go';
import Field from './Field';
import Interest from './Interest';
import MatchingCompleted from './MatchingCompleted';
import Mood from './Mood';
import Region from './Region';
import Type from './Type';
import { Tmatching, Tsession } from '@/types/TSession';
import { useRouter } from 'next/navigation';

export type TClientMatchingProps = {
  data: Tmatching;
  session: Tsession;
  exist: boolean;
};

export default function ClientMatching(props: TClientMatchingProps) {
  const { data, session, exist } = props;
  let username = session.user.name;
  let nickname = session.user.nickname;
  const id = session.user.id;

  const router = useRouter();

  const [state, dispatch] = useReducer<React.Reducer<Tmatching, TActionType>>(
    matchingreducer,
    data,
  );

  const [step, setStep] = useState<number>(1);
  const [active, setActive] = useState<boolean>(false);

  const onClickInterest = (field: string) => {
    dispatch({ type: 'setInterest', payload: field });
  };

  const onClickLevel = (field: string, level: string, interest: string[]) => {
    dispatch({ type: 'setLevel', payload: { field, level, interest } });
  };
  const onClickStudyType = (field: string) => {
    dispatch({ type: 'setStudyType', payload: field });
  };

  const onClickMood = (mood: string) => {
    dispatch({ type: 'setMood', payload: mood });
  };

  const onClickRegions = (region: string) => {
    dispatch({ type: 'setRegion', payload: region });
  };
  const onClickClearLevel = (personlevel: object, interests: string[]) => {
    dispatch({ type: 'clearlevel', payload: { personlevel, interests } });
  };
  const onClickForwardStep = () => {
    setActive(false);
    if (step === 6) {
      return;
    }
    if (state.interests.length === 0 && step === 1) {
      return;
    } else if (step === 1) {
      onClickClearLevel(state.level, state.interests);
    }
    if (
      Object.keys(state.level).length !== state.interests.length &&
      step === 2
    ) {
      console.log('안됨!');
      return;
    }
    if (state.studyType === '' && step === 3) {
      return;
    }
    if (state.preferRegion.length === 0 && step === 4) {
      return;
    }
    if (state.preferMood.length === 0 && step === 5) {
      return;
    }

    setStep((prev) => prev + 1);
  };
  const onClickBackwardStep = () => {
    if (step === 1) {
      return;
    }

    setStep((prev) => prev - 1);
  };
  const stepComponet: any = {
    1: (
      <Interest
        interest={state.interests}
        onClickInterest={onClickInterest}
        nickname={nickname}
      />
    ),
    2: (
      <Field
        interest={state.interests}
        onClickLevel={onClickLevel}
        Level={state.level}
      />
    ),
    3: (
      <Type
        studyType={state.studyType}
        onClickStudyType={onClickStudyType}
        nickname={nickname}
      />
    ),
    4: (
      <Region
        regions={state.preferRegion}
        onClickRegion={onClickRegions}
        nickname={nickname}
      />
    ),
    5: (
      <Mood
        moods={state.preferMood}
        onClickMood={onClickMood}
        nickname={nickname}
      />
    ),
    6: <MatchingCompleted username={nickname} userId={id} />,
  };

  useEffect(() => {
    if (state.interests.length > 0 && step === 1) {
      setActive(true);
    } else if (
      Object.keys(state.level).length === state.interests.length &&
      step === 2
    ) {
      setActive(true);
    } else if (state.studyType !== '' && step === 3) {
      setActive(true);
    } else if (state.preferRegion.length > 0 && step === 4) {
      setActive(true);
    } else if (state.preferMood.length > 0 && step === 5) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [step, state]);

  return (
    <main className="flex flex-col w-full  relative  ">
      <header>
        <GoChevronLeft
          size={30}
          className="mb-4"
          onClick={() => router.back()}
        />
        {step <= 5 && (
          <div className="w-full bg-gray-400 rounded-full h-[0.4rem] ">
            <div
              className="bg-main-500 h-[0.4rem] rounded-full"
              style={{ width: `${step * 20}%` }}
            ></div>
          </div>
        )}
      </header>
      <div className="w-full m-auto relative">
        {/* //TODO:Footer 분리 및 active 시 색깔들어가게하기 */}
        {stepComponet[step]}
        {step <= 5 && (
          <MatchingFooter
            active={active}
            step={step}
            Forward={() => {
              onClickForwardStep();
            }}
            Backward={() => {
              onClickBackwardStep();
            }}
            serverAction={async () => {
              exist ? updateMatchingInfo(state) : postMatchingInfo(state);
              onClickForwardStep();
            }}
          />
        )}
      </div>
    </main>
  );
}
