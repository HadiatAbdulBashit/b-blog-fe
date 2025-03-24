import axiosInstance from "./axiosInstance";
import { toast } from "sonner";

class PostApi {
  static async getAllPost(url: string) {
    try {
      const { data } = await axiosInstance.get(url);

      return data;
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw new Error("PostApi login: " + error.response.data.error);
    }
  }
}

export default PostApi;
