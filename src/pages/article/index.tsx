import { format } from "date-fns";

import PageTitle from "@/components/page-title";
import { useNavigate, useParams } from "react-router";
import useSWR from "swr";
import PostApi from "@/apis/PostApi";
import { Skeleton } from "@/components/ui/skeleton";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Comments from "@/components/comments";

const ArticlePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth.user);
  const { data, error, isLoading } = useSWR(`/posts/${params.id}`, PostApi.getPost);

  const onDeleteClick = async () => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      await PostApi.deletePost(`/posts/${params.id}`);
      navigate("/articles/my");
    }
  };

  const onEditClick = () => navigate(`/articles/${params.id}/edit`, { state: data });

  return (
    <div className='container max-w-xl mx-auto'>
      <PageTitle title={data?.title ?? "Article"} />
      <article className='flex flex-col gap-4'>
        {error ? (
          <div className='flex justify-center items-center grow'>
            <h1 className='text-3xl font-bold text-primary text-center'>Something went wrong</h1>
          </div>
        ) : isLoading ? (
          <Skeleton className='h-24' />
        ) : (
          <>
            <h1 className='text-3xl font-bold'>{data.title}</h1>
            <div className='flex justify-between'>
              <p>{format(new Date(data.createdAt), "d LLL y")}</p>
              <p>By {data.author.name ?? "Unknown"}</p>
            </div>
            <div className='text-justify'>{data.content}</div>
            {data.author.id === user.id && (
              <div className='flex gap-4'>
                <Button className='bg-amber-700' onClick={onEditClick}>
                  Edit
                </Button>
                <Button onClick={onDeleteClick}>Delete</Button>
              </div>
            )}
            <Separator />
            <Comments postId={params.id || ""} />
          </>
        )}
      </article>
    </div>
  );
};

export default ArticlePage;
