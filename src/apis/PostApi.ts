import { EditArticle, NewArticle } from "@/types";
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

  static async createPost(url: string, { arg }: { arg: NewArticle }) {
    try {
      await axiosInstance.post(url, { ...arg });

      toast.success("Article created successfully");
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw new Error("PostApi createPost: " + error.response.data.error);
    }
  }

  static async editPost(url: string, { arg }: { arg: EditArticle }) {
    try {
      await axiosInstance.post(url, { ...arg });

      toast.success("Article edited successfully");
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw new Error("PostApi editPost: " + error.response.data.error);
    }
  }
}

export default PostApi;
