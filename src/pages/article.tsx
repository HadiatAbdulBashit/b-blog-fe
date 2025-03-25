import { format } from "date-fns";

import PageTitle from "@/components/page-title";
import { useParams } from "react-router";
import useSWR from "swr";
import PostApi from "@/apis/PostApi";
import { Skeleton } from "@/components/ui/skeleton";

const ArticlePage = () => {
  const params = useParams();
  const { data, error, isLoading } = useSWR(`/posts/${params.id}`, PostApi.getPost);

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
            <h1 className='text-3xl'>{data.title}</h1>
            <div className='flex justify-between'>
              <p>{format(new Date(data.createdAt), "d LLL")}</p>
              <p>By {data.author.name ?? "Unknown"}</p>
            </div>
            <div className='text-justify'>{data.content}</div>
          </>
        )}
      </article>
    </div>
  );
};

export default ArticlePage;
