import { Link } from "react-router-dom";
import { FcPhone } from "react-icons/fc";
import {
  LuMail as Email,
  LuLock as Lock,
  LuArrowRight as ArrowRight,
} from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/text-field";

export default function Step1() {
  return (
    <div className="max-w-sm m-auto space-y-4">
      <h2 className="text-2xl font-bold leading-tight text-center text-secondary">
        Create Account
      </h2>
      <form className="space-y-3">
        <TextField
          name="phone"
          placeholder="+917048XXXXXX"
          left={<FcPhone />}
        />
        <div className="flex items-center gap-5">
          <TextField placeholder="First Name" />
          <TextField placeholder="Last Name" />
        </div>
        <TextField
          type="email"
          name="email"
          placeholder="example@gmail.com"
          left={<Email />}
        />
        <TextField
          type="password"
          placeholder="Password"
          left={<Lock size={18} />}
        />
        <Button type="button" className="mt-3 ">
          Next <ArrowRight className="ml-2" size={16} />
        </Button>
      </form>
      <hr />
      <p className="text-sm text-center text-gray-600 ">
        Already have an account?{" "}
        <Link
          to="/login"
          className="mt-2 text-sm font-semibold underline transition-all duration-200 text-primary hover:underline"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
