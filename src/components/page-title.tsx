import { useEffect } from "react";

const PageTitle = ({ title }: { title: string }) => {
  useEffect(() => {
    document.title = title + " | Big Blog";
  }, [title]);

  return null;
};

export default PageTitle;
