import axios from "axios";

export default async function getSingleGroup(id, setGroups) {
  try {
    const token = sessionStorage.getItem("userToken");
    const response = await axios.get(
      `https://academics.newtonschool.co/api/v1/linkedIn/channel/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          projectID: "h6ytk6l7m737",
        },
      }
    );
    const myGroups = sessionStorage.getItem("linkedin-myGroups");
    if (myGroups) {
      let parsedMyGroups = JSON.parse(myGroups);
      parsedMyGroups = [...parsedMyGroups, response.data.data];
      sessionStorage.setItem(
        "linkedin-myGroups",
        JSON.stringify(parsedMyGroups)
      );
    } else {
      sessionStorage.setItem(
        "linkedin-myGroups",
        JSON.stringify([response.data.data])
      );
    }
    setGroups((prev) => {
      return JSON.parse(sessionStorage.getItem("linkedin-myGroups"));
    });
  } catch (error) {
    console.log(error);
  }
}
