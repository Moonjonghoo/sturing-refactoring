import { getSession } from '@/utils/getSessions';
import MyBookMarkList from '../_pages/MyBookMarkList';

export default async function page() {
  const session = await getSession();
  const id = session?.user?.id;
  const data = await (
    await fetch(`http://localhost:3000/api/bookmark?id=${id}`, {
      cache: 'no-store',
    })
  ).json();
  console.log(data, '✅');
  return <MyBookMarkList data={data} id={id} />;
}
