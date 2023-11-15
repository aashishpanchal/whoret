import { img } from "@/constants/img";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/text-field";
import {
  LuUser as User,
  LuLock as Lock,
  LuArrowRight as ArrowRight,
} from "react-icons/lu";
import { authApi } from "@/http/apis";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas/auth";
import { useAppDispatch } from "@/app/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { setAuth } from "@/app/features/auth.slice";

export default function Login() {
  const dispatch = useAppDispatch();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  async function onSubmit({ username, password }: LoginSchema) {
    try {
      const res = await authApi.login(username, password);
      if (res.status === 200) dispatch(setAuth(res.data));
    } catch (error) {
    } finally {
      reset({ password: "" });
    }
  }

  return (
    <main className="flex items-center justify-center w-screen h-screen">
      <div className="w-2/3 px-4 py-5 space-y-3 bg-white md:rounded-lg md:shadow-md md:w-96">
        <div className="self-center w-32 m-auto">
          <img src={img.fastsale} alt="fastsale Logo" className="w-full" />
        </div>
        <h2 className="text-2xl font-bold leading-tight text-center text-secondary">
          Login to your account
        </h2>
        <form method="POST" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("username")}
            label="Username"
            placeholder="Email and Phone"
            left={<User size={18} />}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            {...register("password")}
            label="Password"
            type="password"
            placeholder="Password"
            left={<Lock size={18} />}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" className="mt-3">
            Get started <ArrowRight className="ml-2" size={16} />
          </Button>
        </form>
        <hr />
        <Button variant="light" className="w-full gap-5">
          <FcGoogle size={24} />
          Sign in with Google
        </Button>
        <p className="text-sm text-center text-gray-600 ">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="mt-2 text-sm font-semibold underline transition-all duration-200 text-primary hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
