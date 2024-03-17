import { BsArrowLeft } from 'react-icons/bs';

import useGoBackward from '~/hooks/useGoBackward.ts';

function GoBackButton() {
  const goBack = useGoBackward();

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
