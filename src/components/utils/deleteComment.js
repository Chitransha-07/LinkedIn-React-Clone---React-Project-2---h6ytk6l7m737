export default async function deleteComment(id) {
  const token = sessionStorage.getItem("userToken");
  const config = {
    method: "DELETE",
    headers: {
      projectID: "h6ytk6l7m737",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(
      `https://academics.newtonschool.co/api/v1/linkedin/comment/${id}`,
      config
    );
  } catch (error) {
    console.log(error);
  }
}
