import axios from "axios";
import getComments from "./getComments";
export default async function postComment(
  id,
  newComment,
  setComments,
  setNewComment
) {
  const token = sessionStorage.getItem("userToken");
  const config = {
    headers: {
      projectID: "h6ytk6l7m737",
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(id);
  try {
    const response = await axios.post(
      `https://academics.newtonschool.co/api/v1/linkedin/comment/${id}`,
      { content: newComment },
      config
    );
    getComments(id, setComments);
    setNewComment("");
  } catch (error) {
    console.log(error);
  }
}
