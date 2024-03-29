import { SidebarProps } from '../Sidebar.tsx';

type SidebarOverlayProps = Pick<SidebarProps, 'open'> & {
  onClick: SidebarProps['onClose'];
};

function SidebarOverlay({ open, onClick }: SidebarOverlayProps) {
  return (
    <div
      role="button"
      className={`fixed top-0 left-[-100%] z-[2] h-screen w-screen opacity-0 cursor-none duration-[0.4s] transition-all ease-in-out bg-[rgba(0,0,0,0.3)]${
        open ? ' !opacity-100 !left-[260px] !cursor-auto' : ''
      }`}
      onClick={onClick}
    />
  );
}

export default SidebarOverlay;
