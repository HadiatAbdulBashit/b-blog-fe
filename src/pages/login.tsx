import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";

import { LoaderCircle } from "lucide-react";

import InputError from "@/components/ui/input-error";
import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import useSWRMutation from "swr/mutation";
import AuthApi from "@/apis/AuthApi";
import type { Login } from "@/types";

const LoginPage = () => {
  const navigate = useNavigate();

  const { trigger, isMutating } = useSWRMutation("/login", AuthApi.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Login>();

  const onSubmit: SubmitHandler<Login> = async (data) => {
    try {
      await trigger(data);

      reset();
      navigate("/");
    } catch (error) {
      // For Development
      // console.log(error);
    }
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
              disabled={isMutating}
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
              disabled={isMutating}
            />
            <InputError message={errors.password?.message} />
          </div>

          <div className='flex items-center space-x-3'>
            <Checkbox id='remember' {...register("remember")} tabIndex={3} disabled={isMutating} />
            <Label htmlFor='remember'>Remember me</Label>
          </div>

          <Button type='submit' className='mt-4 w-full' tabIndex={4} disabled={isMutating}>
            {isMutating && <LoaderCircle className='h-4 w-4 animate-spin' />}
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

export default LoginPage;
