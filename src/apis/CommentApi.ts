import { EditComment, NewComment } from "@/types";
import axiosInstance from "./axiosInstance";
import { toast } from "sonner";

class CommentApi {
  static async getAllComments(url: string) {
    try {
      const { data } = await axiosInstance.get(url);

      return data;
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw new Error("CommentApi GetAllComments: " + error.response.data.error);
    }
  }

  static async createComment(url: string, { arg }: { arg: NewComment }) {
    try {
      await axiosInstance.post(url, { ...arg });

      toast.success("Comment created successfully");
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw new Error("CommentApi createComment: " + error.response.data.error);
    }
  }

  static async editComment(url: string, { arg }: { arg: EditComment }) {
    try {
      await axiosInstance.put(url, { ...arg });

      toast.success("Comment edited successfully");
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw new Error("CommentApi editComment: " + error.response.data.error);
    }
  }

  static async deleteComment(url: string, { arg }: { arg: string }) {
    try {
      await axiosInstance.delete(url + arg);

      toast.success("Comment deleted successfully");
    } catch (error: any) {
      toast.error(error.response.data.error);
      throw new Error("CommentApi deleteComment: " + error.response.data.error);
    }
  }
}

export default CommentApi;
