import PageTitle from "@/components/page-title";

const Home = () => {
  return (
    <div className='container mx-auto'>
      <PageTitle title='Home' />
      <div className='flex gap-12 items-center mb-8'>
        <h1 className='text-3xl font-bold text-primary min-w-max'>Article</h1>
      </div>
    </div>
  );
};

export default Home;
