import { Link } from 'react-router-dom';

import logo from '~/assets/logo.png';
import Button from '~/components/Button/Button.tsx';

function NotFound() {
  return (
    <div className="text-white xl:text-[0.75vw]">
      <header className="bg-[#0000002e] flex flex-col text-[10px] leading-[1.2] overflow-hidden z-[1000] fixed top-0 left-0 right-0">
        <div className="bg-[#000000f7] h-[var(--notfound-navbar-height)] left-0 px-[45px] fixed right-0 top-0 z-[20]">
          <div className="left-[40px] absolute top-[11px]">
            <Link to="/">
              <img src={logo} alt="logo" className="h-[47px] overflow-hidden w-[115px]" />
            </Link>
          </div>
        </div>
      </header>
      <main className="bg-[url('src/assets/bg-lost-in-space.png')] bg-no-repeat bg-size bg-cover flex flex-col justify-center items-center pt-[var(--notfound-navbar-height)] text-center select-none w-screen h-screen">
        <h1 className="text-inherit mt-0 [text-shadow:_0_1px_2px_rgba(0,0,0,.57)] text-[6em] font-[500] mb-[2vw] z-[1]">
          Lost your way?
        </h1>
        <div className="flex flex-col pb-[2em] w-[50vw] z-[1]">
          <p className="text-[2.2em] font-[300] text-inherit mt-0 [text-shadow:_0_1px_2px_rgba(0,0,0,.57)] mb-[1.5rem]">
            Sorry, we can't find that page. You'll find lots to explore on the home page.
          </p>
          <div className="flex justify-center">
            <Button to="/" variant="primary" hasLabel>
              <span>Netflix Home</span>
            </Button>
          </div>
          <div className="items-start flex flex-1 justify-center mt-[1.5rem]">
            <span className="border-l border-[#e50914] text-[2.4em] font-[100] tracking-[.1em] px-[1vw]">
              Error Code <strong>404</strong>
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
export default NotFound;
