import { memo } from 'react';
import { useLocation } from 'react-router-dom';

import Button from '~/components/Button/Button.tsx';

interface SidebarNavProps {
  item: {
    icon: JSX.Element;
    title: string;
    href?: string;
    to?: string;
    onClick?: () => void;
  };
}

function SidebarNav({ item }: SidebarNavProps) {
  const { pathname } = useLocation();
  const isOnSite = item.to && pathname === item.to;

  return (
    <li className={`list-none  [&_*]:hover:text-white${isOnSite ? ' [&_*]:text-white' : ''}`}>
      <Button
        href={item.href}
        to={item.to}
        onClick={item.onClick}
        className={`flex items-center justify-start my-[8px] w-full p-[14px_12px] rounded-[8px] no-underline hover:bg-[#f34242]${
          isOnSite ? ' bg-[#f34242]' : ''
        }`}
      >
        <div className="*:mr-[14px] *:text-[20px] *:text-[#707070]">
          {item.icon ? item.icon : ''}
        </div>
        <span className="text-[#707070]">{item.title}</span>
      </Button>
    </li>
  );
}

export default memo(SidebarNav);
