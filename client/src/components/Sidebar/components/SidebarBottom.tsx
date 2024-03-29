import { FaPowerOff } from 'react-icons/fa';

import { useLogout } from '~/apis/auth/logout.ts';
import { userKeys } from '~/apis/user/queryKey.ts';
import useLoading from '~/hooks/useLoading.ts';
import queryClient from '~/lib/react-query/client.ts';
import SidebarNav from './SidebarNav.tsx';

function SidebarBottom() {
  const { mutate: logout, isPending } = useLogout();
  const user = queryClient.getQueryData(userKeys.detail);
  const isLoggedIn = Boolean(user);
  const bottomLinks = [];

  useLoading(isPending);

  if (isLoggedIn)
    bottomLinks.push({
      title: 'Logout',
      icon: <FaPowerOff />,
      onClick: () => logout(),
    });

  return (
    <div className="mb-[2rem] shadow-[0_-5px_5px_rgba(0,0,0,0.4)]">
      {bottomLinks.map((link, index) => (
        <SidebarNav item={link} key={index + link.title} />
      ))}
    </div>
  );
}

export default SidebarBottom;
