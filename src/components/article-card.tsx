import { Link } from "react-router";
import { format } from "date-fns";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Article } from "@/types";

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <Card className='inline-grid'>
      <CardHeader className='flex flex-col justify-between'>
        <Link to={"/articles/" + article.id}>
          <CardTitle className={`hover:text-primary text-xl`}>
            <h2>{article.title}</h2>
          </CardTitle>
        </Link>
        <CardDescription className={`flex text-base justify-between gap-4 w-full`}>
          <p>{format(new Date(article.createdAt ?? ""), "d LLL y")}</p>
          <p className=''>By {article.author?.name ?? "Unknown"}</p>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default ArticleCard;
