import PostApi from "@/apis/PostApi";
import ArticleCard from "@/components/article-card";
import PageTitle from "@/components/page-title";
import { Skeleton } from "@/components/ui/skeleton";
import { Article } from "@/types";
import useSWR from "swr";

const MyArticlePage = () => {
  const { data, error, isLoading } = useSWR(`/posts/my`, PostApi.getAllPosts);

  return (
    <div className='container mx-auto'>
      <PageTitle title='Home' />
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-primary min-w-max'>Article</h1>
      </div>

      {error ? (
        <div className='flex justify-center items-center grow'>
          <h1 className='text-3xl font-bold text-primary text-center'>Something went wrong</h1>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-12 gap-4'>
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} className='h-24' />)
            : data.map((article: Article, index: number) => <ArticleCard key={index} article={article} />)}
        </div>
      )}
    </div>
  );
};

export default MyArticlePage;
