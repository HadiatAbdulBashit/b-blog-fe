import axiosInstance from "./axiosInstance";
import { toast } from "sonner";

class PostApi {
  static async getAllPosts(url: string) {
    try {
      const { data } = await axiosInstance.get(url);

      return data;
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw new Error("PostApi GetAllPosts: " + error.response.data.error);
    }
  }

  static async getPost(url: string) {
    try {
      const { data } = await axiosInstance.get(url);

      return data;
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw new Error("PostApi GetPost: " + error.response.data.error);
    }
  }
}

export default PostApi;
