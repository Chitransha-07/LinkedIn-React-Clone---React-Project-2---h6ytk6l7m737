export default async function getComments(id, setComments) {
  const token = sessionStorage.getItem("userToken");
  const config = {
    method: "GET",
    headers: {
      projectID: "h6ytk6l7m737",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(
      `https://academics.newtonschool.co/api/v1/linkedin/post/${id}/comments`,
      config
    );
    const result = await response.json();
    result.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setComments(result.data);
  } catch (error) {
    console.log(error);
  }
}
