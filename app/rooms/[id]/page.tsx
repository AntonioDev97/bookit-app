import RoomDetails from '@/app/components/RoomDetails';
import Error from '@/app/error';

const { API_URL } = process.env;

interface IProps {
    params: { id: string }
}

async function getRoom(id: string) {
  return await (await fetch(`${API_URL}/api/rooms/${id}`, {
    next: { tags: ['RoomDetails'] }
  })).json();
}

export default async function RoomDetailsPage({ params }: IProps) {
  const data = await getRoom(params?.id);
  if (data?.message) return <Error error={data} />;
  return (
    <RoomDetails data={data.data} />
  );
}

export async function generateMetadata({ params }: IProps) {
  const { data } = await getRoom(params?.id);
  
  return ({
    title: `BookIT - ${data?.name || ''}`
  })
};
