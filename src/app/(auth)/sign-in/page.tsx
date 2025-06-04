import Image from "next/image";
import Logo from "@/assets/logo.png";
import SignInForm from "@/components/auth/SiginInForm";

const SignInPage = () => {
  return (
    <div className="signin-page">
      <div className="signin-page__image">
        <Image src={Logo} alt="Groundpass Logo" />
      </div>

      <SignInForm />
    </div>
  );
};

export default SignInPage;
