import { Link } from 'react-router-dom';

interface NavbarNavigationProps {
  navLinks: {
    title: string;
    to: string;
  }[];
}

function NavbarNavigation({ navLinks }: NavbarNavigationProps) {
  return (
    <ul className="list-none flex gap-8">
      {navLinks.map(({ title, to }) => {
        return (
          <li key={title}>
            <Link to={to} className="text-white no-underline">
              {title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default NavbarNavigation;
