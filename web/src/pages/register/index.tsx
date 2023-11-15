import Stepper from "@/components/stepper";
import { img } from "@/constants/img";
import Step1 from "./step-1";

type Props = {};

export default function Register({}: Props) {
  return (
    <main className="flex items-center justify-center w-screen h-screen">
      <div className="px-4 py-5 space-y-3 bg-white md:rounded-lg md:shadow-md">
        <hr />
        <Stepper
          steps={["create account", "account verify", "onboarding dashboard"]}
          currentStep={0}
        />
        <div className="self-center w-32 m-auto">
          <img src={img.fastsale} alt="fastsale Logo" className="w-full" />
        </div>
        <Step1 />
      </div>
    </main>
  );
}
