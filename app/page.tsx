import Home from '@/app/components/Home'
import Error from './error';

export const metadata = { title: 'BookIT - HomePage' };

export default async function HomePage({ searchParams }: { searchParams: string }) {

  const { API_URL } = process.env;
  const URLParams = new URLSearchParams(searchParams)?.toString();
  let data = { message: 'error' } as any;

  try {
    data = await (await fetch(`${API_URL}/api/rooms?${URLParams}`, {
      next: { tags: ['RoomDetails'] }
    })).json();
  } catch (error) {
    console.error(error);
  }

  if (data?.message) return <Error error={data} />;
  return (
    <Home data={data?.data} />
  )
}
