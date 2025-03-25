import CommentApi from "@/apis/CommentApi";
import useSWR from "swr";
import { Skeleton } from "./ui/skeleton";
import { Comment, NewComment } from "@/types";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import InputError from "./ui/input-error";
import { LoaderCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";
import { useState } from "react";

const Comments = ({ postId }: { postId: string }) => {
  const { isAuthenticated, user } = useSelector((state: any) => state.auth);
  const [selectedComment, setSelectedComment] = useState<string>("");

  const { data, error, isLoading, mutate } = useSWR(`/comments/${postId}`, CommentApi.getAllComments);
  const { trigger, isMutating } = useSWRMutation(`/comments`, CommentApi.createComment);
  const { trigger: editTrigger, isMutating: editIsMutating } = useSWRMutation(`/comments/${selectedComment}`, CommentApi.editComment);
  const { trigger: deleteTrigger } = useSWRMutation(`/comments/${selectedComment}`, CommentApi.deleteComment);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<NewComment>();

  const onSubmit: SubmitHandler<NewComment> = async (data) => {
    try {
      if (selectedComment) {
        await editTrigger(data);
      } else {
        await trigger(data);
      }
      setSelectedComment("");
      mutate();
      reset();
    } catch (error) {
      // For Development
      // console.log(error);
    }
  };

  const onEditClick = (comment: Comment) => {
    setSelectedComment(comment.id);
    setValue("content", comment?.content);
    setValue("postId", comment?.postId);
  };

  const onDeleteClick = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      await deleteTrigger(id);
      mutate();
    }
  };

  const onCancelClick = () => {
    setSelectedComment("");
    reset();
  };

  return (
    <div className='flex flex-col gap-4 mt-4'>
      <h2 className='text-xl font-semibold text-primary min-w-max'>Comments</h2>
      {isAuthenticated && (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex gap-2'>
              <Input
                type='text'
                placeholder='Enter your comment'
                className='input input-bordered w-full'
                {...register("content", { required: "Email is required" })}
                disabled={isMutating || editIsMutating}
              />
              <input type='hidden' value={postId} {...register("postId", { required: "Post ID is required" })} />
              <Button type='submit' className='w-fit' tabIndex={4} disabled={isMutating || editIsMutating}>
                {isMutating || (editIsMutating && <LoaderCircle className='h-4 w-4 animate-spin' />)}
                {isMutating || editIsMutating ? "Submitting..." : selectedComment ? "Edit" : "Comment"}
              </Button>
              {selectedComment && (
                <Button variant={"outline"} onClick={onCancelClick}>
                  Cancel
                </Button>
              )}
            </div>
            <InputError message={errors.content?.message} />
          </form>
          <Separator />
        </>
      )}

      {error ? (
        <div className='flex justify-center items-center grow'>
          <h1 className='text-3xl font-bold text-primary text-center'>Something went wrong</h1>
        </div>
      ) : isLoading ? (
        <Skeleton className='h-24' />
      ) : (
        data.map((comment: Comment) => (
          <div key={comment.id}>
            <p>{comment.content}</p>
            <div className='text-xs flex gap-1'>
              <p>{formatDistanceToNow(comment.createdAt)} ago • </p>
              <p>By {comment.author.name ?? "Unknown"}</p>
            </div>
            {isAuthenticated && comment.author.id === user.id && !selectedComment && (
              <div className='flex gap-1 mt-2'>
                <Button size={"sm"} className='bg-amber-600' onClick={() => onEditClick(comment)}>
                  Edit
                </Button>
                <Button size={"sm"} onClick={() => onDeleteClick(comment.id)}>
                  Delete
                </Button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Comments;
