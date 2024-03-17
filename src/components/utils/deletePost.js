import axios from "axios";
export default async function deletePost(id) {
  const token = sessionStorage.getItem("userToken");

  try {
    const result = await axios.delete(
      `https://academics.newtonschool.co/api/v1/linkedIn/post/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          projectID: "h6ytk6l7m737",
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
}
