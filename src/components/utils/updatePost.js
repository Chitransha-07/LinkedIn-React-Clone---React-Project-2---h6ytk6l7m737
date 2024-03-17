import axios from "axios";
export default async function updatePost(
  id,
  postTitle,
  postContent,
  imagePreviewRef,
  setShowEditModal,
  setPosts,
  getPosts
) {
  try {
    const token = sessionStorage.getItem("userToken");

    const formData = new FormData();
    formData.append("title", postTitle);
    formData.append("content", postContent);

    if (imagePreviewRef.current) {
      const imgResponse = await fetch(
        imagePreviewRef.current.src.replace("https", "")
      );
      const blob = await imgResponse.blob();
      formData.append("images", blob, "image.jpg");
    }

    const response = await axios.patch(
      `https://academics.newtonschool.co/api/v1/linkedIn/post/${id}`,
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
    setShowEditModal(false);
  }
}
