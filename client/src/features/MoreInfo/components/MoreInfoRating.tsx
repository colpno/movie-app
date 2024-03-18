import { FaStar } from 'react-icons/fa';

interface MoreInfoRatingProps {
  rate: number;
}

function MoreInfoRating({ rate }: MoreInfoRatingProps) {
  return (
    <div className="flex gap-x-2 items-center">
      <span>{rate}</span>
      <FaStar className="text-yellow-500" />
    </div>
  );
}
export default MoreInfoRating;
