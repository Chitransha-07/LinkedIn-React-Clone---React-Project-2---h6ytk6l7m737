import axios from "axios";
import getSingleGroup from "./getSingleGroup";
export default async function createGroup(
  postTitle,
  postContent,
  imageSrc,
  setShowPostModal,
  setGroups,
  setError
) {
  try {
    const token = sessionStorage.getItem("userToken");
    const formData = new FormData();
    formData.append("name", postTitle);
    formData.append("description", postContent);

    if (imageSrc) {
      const imgResponse = await fetch(imageSrc);
      const blob = await imgResponse.blob();
      formData.append("image", blob, "image.jpg");
    }

    const response = await axios.post(
      "https://academics.newtonschool.co/api/v1/linkedin/channel",
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
      getSingleGroup(send, setGroups);
    }
  } catch (error) {
    console.log(error);
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 5000);
  } finally {
    setShowPostModal(false);
  }
}
