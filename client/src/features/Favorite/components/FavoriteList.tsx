import { useGetFavorites } from '~/apis/favorite/getMultiple.ts';
import { userKeys } from '~/apis/user/queryKey.ts';
import Card from '~/components/Card/Card.tsx';
import queryClient from '~/lib/react-query/client.ts';
import { User } from '~/types/common.ts';

function FavoriteList() {
  const user: User | undefined = queryClient.getQueryData(userKeys.detail);
  const { data: favorites = [] } = useGetFavorites({ params: { userId: { eq: user!.id } } });

  return (
    <div className="grid grid-cols-5 gap-6">
      {favorites.map((favorite) => {
        return <Card data={favorite.video_id} key={favorite.id} favorite={favorite} />;
      })}
    </div>
  );
}

export default FavoriteList;
