import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo.png';
import { SidebarProps } from '../Sidebar.tsx';

type SidebarTopProps = Pick<SidebarProps, 'onClose'>;

function SidebarTop({ onClose }: SidebarTopProps) {
  return (
    <div className="flex items-center ml-[14px]">
      <GiHamburgerMenu
        onClick={onClose}
        className="text-[#707070] text-[2rem] cursor-pointer hover:text-white"
      />
      <Link to="/">
        <img src={logo} alt="Logo" className="h-16" />
      </Link>
    </div>
  );
}

export default SidebarTop;
