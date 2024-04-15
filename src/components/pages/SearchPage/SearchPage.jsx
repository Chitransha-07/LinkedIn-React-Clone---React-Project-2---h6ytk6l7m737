import React, { useEffect, useState } from "react";
import "./SearchPage.css";
import { useSearchParams } from "react-router-dom";
import { useSearch } from "../../providers/SearchProvider";
import { SinglePost } from "../Feed/Feed";
import { useDarkMode } from "../../providers/DarkModeProvider";

//  this component provides the functionality to search for posts based on different criteria and displays the search results in a structured layout. 
function SearchPage({ loading, setLoading }) {
  const { darkMode } = useDarkMode();
  const [searchedData, setSearchedData] = useState([]);
  const { searchTerm, searchField, setSearchField } = useSearch();
  const { name } = JSON.parse(sessionStorage.getItem("userDetails"));
  const handleSearch = async () => {
    const config = {
      method: "GET",
      headers: {
        projectID: "h6ytk6l7m737",
      },
    };
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/linkedin/post?search={"${searchField}":"${searchTerm}"}`,
        config
      );
      const result = await response.json();
      if (result.data) {
        setSearchedData((prev) => {
          return [...result.data];
        });
      } else {
        setSearchedData([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleSearch();
  }, [searchTerm, searchField]);
  return (
    !loading && (
      <div className="all-content-container">
        <div className="feedPage-layout-container">
          <nav className={`searchPage-field-navbar ${darkMode ? "dark" : ""}`}>
            <ul className={`searchPage-field-lists ${darkMode ? "dark" : ""}`}>
              <li>search posts by: </li>
              <li
                className={`${
                  searchField.includes("content") ? "active" : "unactive"
                }`}
                onClick={(e) => {
                  setSearchField("content");
                }}
              >
                Content
              </li>
              <li
                className={`${
                  searchField.includes("author") ? "active" : "unactive"
                }`}
                onClick={(e) => {
                  setSearchField("author.name");
                }}
              >
                Author
              </li>
              <li
                className={`${
                  searchField.includes("title") ? "active" : "unactive"
                }`}
                onClick={(e) => {
                  setSearchField("title");
                }}
              >
                title
              </li>
              <li
                className={`${
                  searchField.includes("channel") ? "active" : "unactive"
                }`}
                onClick={(e) => {
                  setSearchField("channel.name");
                }}
              >
                Channel
              </li>
            </ul>
          </nav>
          {/* Grid layout */}
          <div className="feedPage-layout searchPage-layout">
            {/* sidebar */}
            <div className="feedPage-layout--sidebar">
              <div
                style={{ top: "120px" }}
                className={`feedPage-layout--aside-social-connect-container ${
                  darkMode ? "dark" : ""
                }`}
              >
                <div
                  className={`searchPage-sidebar-content ${
                    darkMode ? "dark" : ""
                  }`}
                >
                  <span>On this page</span>
                  <p>Posts</p>
                </div>
              </div>
            </div>

            {/* main */}
            <div className="feedPage-layout--main">
              {searchedData.length == 0 ? (
                <div className={`feedPage-main--box ${darkMode ? "dark" : ""}`}>
                  <div className={`no-post-found ${darkMode ? "dark" : ""}`}>
                    Sorry No Post Found!
                  </div>
                </div>
              ) : (
                searchedData.map((post, index) => (
                  <SinglePost
                    key={index}
                    post={post}
                    index={index}
                    setPosts={setSearchedData}
                  />
                ))
              )}
            </div>

            {/* aside */}
            <div className="feedPage-layout--aside">
              <div
                style={{ top: "120px" }}
                className={`feedPage-layout--aside-social-connect-container ${
                  darkMode ? "dark" : ""
                }`}
              >
                <div
                  className={`feedPage-layout--aside-social-connect ${
                    darkMode ? "dark" : ""
                  }`}
                >
                  <p>Ad</p>
                  <div>
                    <img
                      src={`https://ui-avatars.com/api/?name=${name.slice(
                        0,
                        1
                      )}&background=random`}
                      alt=""
                    />
                    <img
                      src={
                        "https://media.licdn.com/dms/image/D4D03AQEAGKpE3guIKA/profile-displayphoto-shrink_100_100/0/1682748449835?e=1708560000&v=beta&t=H1ZWtqL-UCoh3C8c0DmzTCpKuaAudZl1Pjg71WVnjQk"
                      }
                      alt=""
                    />
                  </div>
                  <p>
                    {name}, connect with <span>Chitransha</span>
                  </p>
                  <a
                    href="https://www.linkedin.com/in/chitransha-dixit-81a35014b/"
                    target="_blank"
                  >
                    Connect
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default SearchPage;
