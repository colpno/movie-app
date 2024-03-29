import SidebarBottom from './components/SidebarBottom';
import SidebarNav from './components/SidebarNav';
import SidebarOverlay from './components/SidebarOverlay.tsx';
import SidebarTop from './components/SidebarTop';

export interface SidebarProps {
  navLinks: {
    href?: string;
    to?: string;
    icon: JSX.Element;
    title: string;
  }[];
  open: boolean;
  onClose: () => void;
}

function Sidebar({ navLinks, open, onClose }: SidebarProps) {
  return (
    <>
      <nav
        className={`fixed top-0 left-[-100%] z-[2] h-screen w-[260px] py-[20px] bg-gray-950 shadow-[0_5px_1px_rgba(0,0,0,0.3)] duration-[0.4s] transition-all ease-in-out${
          open ? ' !left-0' : ''
        }`}
      >
        <SidebarTop onClose={onClose} />
        <div className="flex h-full flex-col justify-between p-[30px_16px]">
          <ul>
            {navLinks.map((navLink, index) => (
              <SidebarNav item={navLink} key={index + navLink.title} />
            ))}
          </ul>
          <SidebarBottom />
        </div>
      </nav>
      <SidebarOverlay open={open} onClick={onClose} />
    </>
  );
}

export default Sidebar;
