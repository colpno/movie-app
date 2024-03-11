import background from '~/assets/login.jpg';
import BackgroundImage from '~/components/BackgroundImage.tsx';
import SignUpForm from './components/SignUpForm';

function SignUp() {
  return (
    <div className="relative">
      <BackgroundImage src={background} className="h-[calc(h-screen-var(--header-height))]" />
      <div className="absolute top-0 left-0 bg-[#00000080] h-screen w-screen grid grid-row-[15vh 85v]">
        <SignUpForm />
      </div>
    </div>
  );
}

export default SignUp;
