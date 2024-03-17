export default async function likePost(id, setLikeCount) {
  const token = sessionStorage.getItem("userToken");
  const config = {
    method: "POST",
    headers: {
      projectID: "h6ytk6l7m737",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(
      `https://academics.newtonschool.co/api/v1/linkedin/like/${id}`,
      config
    );
    const result = await response.json();
    if (sessionStorage.getItem(id)) {
      sessionStorage.removeItem(id);
      setLikeCount((n) => n - 1);
    } else {
      sessionStorage.setItem(id, true);
      setLikeCount((n) => n + 1);
    }
  } catch (error) {
    console.log(error);
  }
}
