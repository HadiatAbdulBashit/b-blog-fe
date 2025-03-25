import PostApi from "@/apis/PostApi";
import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputError from "@/components/ui/input-error";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NewArticle } from "@/types";
import { LoaderCircle } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useSWRMutation from "swr/mutation";

const CreateArticle = () => {
  const navigate = useNavigate();

  const { trigger, isMutating } = useSWRMutation("/posts", PostApi.createPost);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewArticle>();

  const onSubmit: SubmitHandler<NewArticle> = async (data) => {
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
    <div className='container max-w-xl mx-auto'>
      <PageTitle title={"Create Article"} />
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-primary min-w-max'>Create New Article</h1>
      </div>

      <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-6'>
          <div className='grid gap-2'>
            <Label htmlFor='title'>Title</Label>
            <Input
              id='title'
              type='text'
              autoFocus
              tabIndex={1}
              placeholder='Some Title'
              {...register("title", { required: "Title is required" })}
              disabled={isMutating}
              autoComplete='title'
            />
            <InputError message={errors.title?.message} />
          </div>

          <div className='grid gap-2'>
            <div className='flex items-center'>
              <Label htmlFor='content'>Content</Label>
            </div>
            <Textarea
              id='content'
              tabIndex={2}
              autoComplete='content'
              {...register("content", { required: "Content is required" })}
              placeholder='Password'
              disabled={isMutating}
            />
            <InputError message={errors.content?.message} />
          </div>

          <Button type='submit' className='mt-4 w-full' tabIndex={3} disabled={isMutating}>
            {isMutating && <LoaderCircle className='h-4 w-4 animate-spin' />}
            Create Article
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateArticle;
