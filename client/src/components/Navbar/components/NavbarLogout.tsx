import { FaPowerOff } from 'react-icons/fa';

import { useLogout } from '~/apis/auth/logout.ts';
import { userKeys } from '~/apis/user/queryKey.ts';
import queryClient from '~/lib/react-query/client.ts';

function NavbarLogout() {
  const { mutate: logout } = useLogout();
  const user = queryClient.getQueryData(userKeys.detail);
  const isLoggedIn = Boolean(user);

  if (!isLoggedIn) return <></>;

  return (
    <button onClick={() => logout()}>
      <FaPowerOff className="text-[#f34242]" />
    </button>
  );
}

export default NavbarLogout;
