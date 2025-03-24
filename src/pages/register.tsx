import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useSWRMutation from "swr/mutation";

import { LoaderCircle } from "lucide-react";

import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputError from "@/components/ui/input-error";

import AuthApi from "@/apis/AuthApi";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigate = useNavigate();

  const { trigger, isMutating } = useSWRMutation("/register", AuthApi.register);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await trigger(data);

    reset();
    navigate("/login");
  };

  return (
    <>
      <PageTitle title='Register' />
      <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-6'>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Name</Label>
            <Input
              id='name'
              type='text'
              autoFocus
              tabIndex={1}
              placeholder='John Doe'
              {...register("name", { required: "Name is required" })}
              disabled={isMutating}
              autoComplete='name'
            />
            <InputError message={errors.name?.message} />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email address</Label>
            <Input
              id='email'
              type='email'
              tabIndex={2}
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
              tabIndex={3}
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must be at least 8 characters with one uppercase letter, one lowercase letter, one digit, and one special character",
                },
              })}
              placeholder='Password'
              disabled={isMutating}
              autoComplete='password'
            />
            <InputError message={errors.password?.message} />
          </div>
          <div className='grid gap-2'>
            <div className='flex items-center'>
              <Label htmlFor='confirmPassword'>Confirm Password</Label>
            </div>
            <Input
              id='confirmPassword'
              type='password'
              tabIndex={4}
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (val: string) => {
                  if (watch("password") != val) {
                    return "Your passwords do no match";
                  }
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must be at least 8 characters with one uppercase letter, one lowercase letter, one digit, and one special character",
                },
              })}
              placeholder='Password'
              disabled={isMutating}
              autoComplete='confirm-password'
            />
            <InputError message={errors.confirmPassword?.message} />
          </div>

          <Button type='submit' className='mt-4 w-full' tabIndex={5} disabled={isMutating}>
            {isMutating && <LoaderCircle className='h-4 w-4 animate-spin' />}
            Create account
          </Button>
        </div>

        <div className='text-muted-foreground text-center text-sm'>
          Already have an account?{" "}
          <Link to={"/login"} tabIndex={5} className='hover:underline'>
            Log in
          </Link>
        </div>
      </form>
    </>
  );
};

export default Register;
