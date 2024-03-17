import axios from "axios";

export default async function getAllChannels(setSuggestedGroups, setLoading) {
  try {
    const token = sessionStorage.getItem("userToken");
    const response = await axios.get(
      "https://academics.newtonschool.co/api/v1/linkedin/channel?limit=50",
      {
        headers: {
          projectID: "h6ytk6l7m737",
        },
      }
    );

    setSuggestedGroups(response.data.data.reverse());
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
}
