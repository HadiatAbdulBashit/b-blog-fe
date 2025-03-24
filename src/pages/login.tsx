import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "sonner";

import { LoaderCircle } from "lucide-react";

import InputError from "@/components/ui/input-error";
import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type Inputs = {
  email: string;
  password: string;
  remember: boolean;
};

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);

    setIsLoading(true);
    toast.success("Login successful!");
    reset();
    setIsLoading(false);
    navigate("/");
  };

  return (
    <>
      <PageTitle title='Login' />
      <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-6'>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email address</Label>
            <Input
              id='email'
              type='email'
              autoFocus
              tabIndex={1}
              placeholder='email@example.com'
              {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })}
              disabled={isLoading}
              autoComplete='email'
            />
            <InputError message={errors.email?.message} />
          </div>

          <div className='grid gap-2'>
            <div className='flex items-center'>
              <Label htmlFor='password'>Password</Label>
            </div>
            <Input
              id='password'
              type='password'
              tabIndex={2}
              autoComplete='password'
              {...register("password", { required: "Password is required" })}
              placeholder='Password'
              disabled={isLoading}
            />
            <InputError message={errors.password?.message} />
          </div>

          <div className='flex items-center space-x-3'>
            <Checkbox id='remember' {...register("remember")} tabIndex={3} disabled={isLoading} />
            <Label htmlFor='remember'>Remember me</Label>
          </div>

          <Button type='submit' className='mt-4 w-full' tabIndex={4} disabled={isLoading}>
            {isLoading && <LoaderCircle className='h-4 w-4 animate-spin' />}
            Log in
          </Button>
        </div>

        <div className='text-muted-foreground text-center text-sm'>
          Don't have an account?{" "}
          <Link to={"/register"} tabIndex={5} className='hover:underline'>
            Register
          </Link>
        </div>
      </form>
    </>
  );
};

export default Login;
