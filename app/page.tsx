import Home from '@/app/components/Home'
import Error from './error';

export const metadata = { title: 'BookIT - HomePage' };

export default async function HomePage({ searchParams }: { searchParams: string }) {

  const { API_URL } = process.env;
  const URLParams = new URLSearchParams(searchParams)?.toString();
  const data = await (await fetch(`${API_URL}/api/rooms?${URLParams}`)).json();

  if (data?.message) return <Error error={data} />;
  return (
    <Home data={data.data} />
  )
}
