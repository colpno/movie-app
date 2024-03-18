import { SVGProps } from 'react';

function LoadingSpinner(props: SVGProps<SVGCircleElement>) {
  return (
    <svg width="100%" height="100%" className="animate-spin">
      <circle
        cx="50%"
        cy="50%"
        r="45%"
        fill="none"
        className="stroke-red-600"
        strokeLinecap="round"
        strokeWidth={10}
        strokeDasharray={Math.PI * 100}
        strokeDashoffset={Math.PI * 65}
        {...props}
      />
    </svg>
  );
}

export default LoadingSpinner;
