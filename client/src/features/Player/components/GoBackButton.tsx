import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function GoBackButton() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="absolute p-8 z-[1]">
      <BsArrowLeft
        className="text-[3rem] cursor-pointer text-white"
        title="Go back"
        onClick={() => goBack()}
      />
    </div>
  );
}

export default GoBackButton;
