import axios from "axios";
export default async function createPost(
  postTitle,
  postContent,
  imagePreviewRef,
  setShowPostModal,
  getPosts,
  setPosts
) {
  try {
    const token = sessionStorage.getItem("userToken");

    const formData = new FormData();
    formData.append("title", postTitle);
    formData.append("content", postContent);

    if (imagePreviewRef.current?.src) {
      const imgResponse = await fetch(imagePreviewRef.current.src);
      const blob = await imgResponse.blob();
      formData.append("images", blob, "image.jpg");
    }

    const response = await axios.post(
      "https://academics.newtonschool.co/api/v1/linkedin/post",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          projectID: "h6ytk6l7m737",
        },
      }
    );
    const send = response.data.data._id;
    if (send) {
      setPosts([]);
      getPosts(1, 10);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setShowPostModal(false);
  }
}
