import { TStudy } from '@/types/TStudy';
import Link from 'next/link';

import ScrollableContainer2 from './ScrollableContainer2';
import dynamic from 'next/dynamic';
const Card = dynamic(() => import('./Card'));

// 날짜 형식을 바꾸는 함수
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${month}.${day}`;
};

type TStudyCardListProps = {
  sort?: string;
  userId?: string;
};

export default async function StudyCardList(props: TStudyCardListProps) {
  const { sort, userId } = props;
  let url = `${process.env.LOCAL_URL}/api/study/main?sort=${sort}`;
  if (userId) {
    url += `&userId=${userId}`;
  }

  const studies: TStudy[] = await (
    await fetch(url, {
      cache: 'no-store',
    })
  ).json();
  return (
    <ScrollableContainer2>
      {studies &&
        studies.map((study) => (
          <li key={study.studyId}>
            <Link href={`/study-detail/${study._id}`}>
              <Card
                userId={userId}
                studyId={study._id!}
                studyImage={study.studyImage}
                studyMeetings={study.studyMeetings}
                studyType={study.studyType}
                studyCategory={study.studyCategory}
                studyName={study.studyName}
                studyStart={study.studyStart}
                studyEnd={study.studyEnd}
                studyPlace={study.studyPlace}
                studyJoinMember={study.studyJoinMember}
                studyMember={study.studyMember}
              />
            </Link>
          </li>
        ))}
    </ScrollableContainer2>
  );
}
