import FavoriteList from './components/FavoriteList';

function Favorites() {
  return (
    <div className="flex flex-col m-[2.3rem] gap-12">
      <h1 className="ml-12">My List</h1>
      <FavoriteList />
    </div>
  );
}

export default Favorites;
