import FavoriteList from '~/features/Favorite/components/FavoriteList.tsx';

function UserListedMoviePage() {
  return (
    <div className="flex flex-col m-[2.3rem] gap-12 text-white">
      <h1 className="text-2xl ">My List</h1>
      <FavoriteList />
    </div>
  );
}

export default UserListedMoviePage;
