import Image from "next/image";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";

import GroundpassLogo from "@/assets/logo.png";

const page = () => {
  return (
    <div className="welcome-page">
      <div className="welcome-page__image">
        <Image src={GroundpassLogo} alt="Groundpass Logo" />
      </div>
      <div className="welcome-page__text">
        <div className="title">
          <Text variant="regular-white-28">Welcome to Groundpass</Text>
        </div>
        <div className="description">
          <Text variant="regular-gray-15">
            Your journey to seamless travel starts here.
          </Text>
        </div>
      </div>
      <div className="welcome-page__buttons">
        <Button variant="primary">Create an account</Button>
        <Button variant="orange">Sign in</Button>
      </div>
    </div>
  );
};
export default page;
