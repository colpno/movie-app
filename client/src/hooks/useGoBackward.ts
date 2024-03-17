import { useNavigate } from 'react-router-dom';

function useGoBackward(step = 1) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-step);
  };

  return goBack;
}

export default useGoBackward;
