import PostApi from "@/apis/PostApi";
import ArticleCard from "@/components/article-card";
import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Article } from "@/types";
import { ArrowDownAZ, ArrowDownZA, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import useSWR from "swr";

const HomePage = () => {
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sort, setSort] = useState<string>("desc");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(12);
  const { data, error, isLoading } = useSWR(
    `/posts?q=${search}&sortBy=${sortBy}&sort=${sort}&page=${page}&limit=${limit}`,
    PostApi.getAllPosts
  );

  useEffect(() => {
    setPage(1);
  }, [search, sortBy, sort, limit]);

  return (
    <div className='container mx-auto'>
      <PageTitle title='Home' />
      <div className='mb-8 flex justify-between gap-2 flex-col sm:flex-row'>
        <h1 className='text-3xl font-bold text-primary min-w-max'>Article</h1>
        <div className='flex gap-1'>
          <Input placeholder='Search...' onChange={(e) => setSearch(e.target.value)} value={search} />
          <Select onValueChange={(value) => setSortBy(value)} defaultValue={sortBy}>
            <SelectTrigger className='w-fit'>
              <SelectValue placeholder='Sort By' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='createdAt'>Create At</SelectItem>
              <SelectItem value='title'>Title</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setSort(sort === "asc" ? "desc" : "asc")}>{sort === "asc" ? <ArrowDownAZ /> : <ArrowDownZA />}</Button>
        </div>
      </div>

      {error ? (
        <div className='flex justify-center items-center grow'>
          <h1 className='text-3xl font-bold text-primary text-center'>Something went wrong</h1>
        </div>
      ) : (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mt-12 gap-4'>
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} className='h-24' />)
              : data.posts.map((article: Article, index: number) => <ArticleCard key={index} article={article} />)}
          </div>
          {isLoading ? (
            <Skeleton className='h-24' />
          ) : (
            <div className='flex justify-between mt-8 items-center'>
              <div className='flex gap-2'>
                Showing {data.posts.length} of {data.totalPosts} results
              </div>
              <div className='flex items-center gap-2'>
                <Button variant='outline' onClick={() => setPage(page - 1)} disabled={page <= 1}>
                  <ChevronLeft className='h-5 w-5' />
                </Button>
                <span className='text-sm'>
                  Page {page} of {Math.ceil(data.totalPosts / limit)}
                </span>
                <Button variant='outline' onClick={() => setPage(page + 1)} disabled={page >= Math.ceil(data.totalPosts / limit)}>
                  <ChevronRight className='h-5 w-5' />
                </Button>
                <Select onValueChange={(value) => setLimit(Number(value))} defaultValue={limit.toString()}>
                  <SelectTrigger className='w-fit'>
                    <SelectValue placeholder='Limit' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='12'>12</SelectItem>
                    <SelectItem value='18'>18</SelectItem>
                    <SelectItem value='24'>24</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
