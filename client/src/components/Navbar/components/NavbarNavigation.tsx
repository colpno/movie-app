import { Link } from 'react-router-dom';

function NavbarNavigation() {
  const links = [
    { name: 'Home', link: '/' },
    { name: 'TV Shows', link: '/tv' },
    { name: 'Movies', link: '/movies' },
    { name: 'My List', link: '/mylist' },
  ];

  return (
    <ul className="list-none flex gap-8">
      {links.map(({ name, link }) => {
        return (
          <li key={name}>
            <Link to={link} className="text-white no-underline">
              {name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default NavbarNavigation;
