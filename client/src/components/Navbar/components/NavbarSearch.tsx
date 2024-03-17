import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function NavbarSearch() {
  const navigate = useNavigate();

  const handleClick = () => navigate('/search');

  return (
    <div className={`flex gap-[0.4rem] items-center justify-center p-[0.2rem] pl-[0.5rem]`}>
      <button
        className="bg-transparent rounded-none cursor-pointer focus:outline-none"
        onClick={() => handleClick()}
      >
        <FaSearch className="text-white text-[1.2rem]" />
      </button>
    </div>
  );
}

export default NavbarSearch;
