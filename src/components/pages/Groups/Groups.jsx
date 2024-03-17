import React, { useEffect, useState } from "react";
import "./Groups.css";
import getAllChannels from "../../utils/getAllChannels";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import createGroup from "../../utils/createGroup";
import { useDarkMode } from "../../providers/DarkModeProvider";
function Groups({ loading, setLoading }) {
  const [active, setActive] = useState(true);
  const { darkMode } = useDarkMode();
  const { name } = JSON.parse(sessionStorage.getItem("userDetails"));
  const [groups, setGroups] = React.useState(() => {
    const myGroups = sessionStorage.getItem("linkedin-myGroups");
    if (myGroups) {
      return JSON.parse(myGroups);
    }
    return [];
  });
  const [suggestedGroups, setSuggestedGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  function handleNavigate(id) {
    navigate(`/group/${id}`);
  }
  useEffect(() => {
    getAllChannels(setSuggestedGroups, setLoading);
  }, []);
  return (
    !loading && (
      <>
        <div className="all-content-container">
          <div className="feedPage-layout-container">
            <div className="groupPage-layout">
              <div className="groupPage-layout--main">
                <div
                  className={`groupPage-common-container ${
                    darkMode ? "dark" : ""
                  }`}
                >
                  <div className="create-and-discover-group-container">
                    <div
                      className={`create-and-your-groups ${
                        darkMode ? "dark" : ""
                      }`}
                    >
                      <div>
                        <p
                          className={`${active ? "active" : ""}`}
                          onClick={() => setActive(true)}
                        >
                          Your groups
                        </p>
                        <p
                          className={`${!active ? "active" : ""}`}
                          onClick={() => setActive(false)}
                        >
                          Discover
                        </p>
                      </div>
                      <button onClick={() => setShowModal(true)}>
                        Create group
                      </button>
                    </div>
                    <div className="groupPage-my-groups">
                      {active ? (
                        <>
                          {groups.length == 0 ? (
                            <div
                              className={`groupPage-empty-my-groups ${
                                darkMode ? "dark" : ""
                              }`}
                            >
                              <h2>Discover Groups</h2>
                              <p>
                                Find other trusted communities that share and
                                support your goals.
                              </p>
                              <button onClick={() => setActive(false)}>
                                Discover
                              </button>
                            </div>
                          ) : (
                            <div className="myGroups-list">
                              {groups.map((item, index) => (
                                <div
                                  onClick={() => {
                                    handleNavigate(item._id);
                                  }}
                                  key={index}
                                  className={`myGroups-item ${
                                    darkMode ? "dark" : ""
                                  }`}
                                >
                                  {item.image ? (
                                    <img src={item.image} alt="" />
                                  ) : (
                                    <img
                                      src="https://static.licdn.com/aero-v1/sc/h/5v7kdqzhyyiogppftp4sj6sa0"
                                      alt=""
                                    />
                                  )}
                                  <div>
                                    <span>{item.name}</span>
                                    <span>Owner: {item.owner.name}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="discover-groups-container">
                            {suggestedGroups.map((item, index) => (
                              <SuggestedGroupCard
                                key={index}
                                item={item}
                                groups={groups}
                                setGroups={setGroups}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="groupPage-layout--aside">
                <div
                  className={`groupPage-common-container ${
                    darkMode ? "dark" : ""
                  }`}
                >
                  <div
                    className={`group-seggestion-heading ${
                      darkMode ? "dark" : ""
                    }`}
                  >
                    <span>Groups you might be interested in</span>
                    <div className="suggested-groups-container">
                      {suggestedGroups.map((item, index) => (
                        <SuggestedGroupCard
                          key={index}
                          item={item}
                          groups={groups}
                          setGroups={setGroups}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div
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
        {showModal && (
          <CreateGroupModal
            setShowModal={setShowModal}
            setGroups={setGroups}
            setError={setError}
          />
        )}
        <SomethingWentWrongModal error={error} setError={setError} />
      </>
    )
  );
}

export default Groups;

function CreateGroupModal({ setShowModal, setGroups, setError }) {
  const { darkMode } = useDarkMode();
  const [imageSrc, setImageSrc] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [createBtnActive, setCreateBtnActive] = useState(false);
  function handleFileInput(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImageSrc("");
    }
    reader.onloadend = function () {
      setImageSrc(reader.result);
    };
  }
  function handleCreateGroup() {
    if (groupDescription && groupName) {
      createGroup(
        groupName,
        groupDescription,
        imageSrc,
        setShowModal,
        setGroups,
        setError
      );
    }
  }
  useEffect(() => {
    if (groupDescription && groupName) {
      setCreateBtnActive(true);
    } else {
      setCreateBtnActive(false);
    }
  }, [groupDescription, groupName]);
  return (
    <>
      {createPortal(
        <div
          onClick={() => {
            setShowModal(false);
          }}
          className="create-post-modal-container"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`create-group-modal ${darkMode ? "dark" : ""}`}
          >
            <button
              onClick={() => {
                setShowModal(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                id="close-medium"
                aria-hidden="true"
                role="none"
                data-supported-dps="24x24"
                fill="currentColor"
              >
                <path d="M13.42 12L20 18.58 18.58 20 12 13.42 5.42 20 4 18.58 10.58 12 4 5.42 5.42 4 12 10.58 18.58 4 20 5.42z"></path>
              </svg>
            </button>
            <div className={`create-group-heading ${darkMode ? "dark" : ""}`}>
              <span>Create group</span>
            </div>
            <div className="create-group-details">
              <div className={`group-cover-image ${darkMode ? "dark" : ""}`}>
                {imageSrc ? (
                  <img src={imageSrc} alt="" />
                ) : (
                  <img
                    src="https://static.licdn.com/aero-v1/sc/h/5v7kdqzhyyiogppftp4sj6sa0"
                    alt=""
                  />
                )}
                <label htmlFor="group-image">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    id="edit-small"
                    aria-hidden="true"
                    role="none"
                    data-supported-dps="16x16"
                    fill="currentColor"
                  >
                    <path d="M14.13 1.86a3 3 0 00-4.17 0l-7 7L1 15l6.19-2 6.94-7a3 3 0 000-4.16zm-8.36 9.71l-1.35-1.34L9.64 5 11 6.35z"></path>
                  </svg>
                </label>
                <input onInput={handleFileInput} id="group-image" type="file" />
              </div>
              <div
                className={`group-name-input-container ${
                  darkMode ? "dark" : ""
                }`}
              >
                <label htmlFor="group-name">Group name*</label>
                <input
                  id="group-name"
                  type="text"
                  placeholder="Talks About React"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>
              <div
                className={`group-description-input-container ${
                  darkMode ? "dark" : ""
                }`}
              >
                <label htmlFor="group-description">Description*</label>
                <textarea
                  id="group-description"
                  placeholder="What is the purpose of your group?"
                  value={groupDescription}
                  onChange={(e) => setGroupDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div
              className={`create-group-buttons ${darkMode ? "dark" : ""} ${
                createBtnActive ? "active-create-group-buttons" : ""
              }`}
            >
              <button onClick={handleCreateGroup}>Create</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

export function SuggestedGroupCard({ item, groups, setGroups }) {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  function addToMyGroups() {
    const myGroups = sessionStorage.getItem("linkedin-myGroups");
    if (myGroups) {
      let parsedMyGroups = JSON.parse(myGroups);
      parsedMyGroups = [...parsedMyGroups, item];
      sessionStorage.setItem(
        "linkedin-myGroups",
        JSON.stringify(parsedMyGroups)
      );
    } else {
      sessionStorage.setItem("linkedin-myGroups", JSON.stringify([item]));
    }
    setGroups((prev) => {
      return JSON.parse(sessionStorage.getItem("linkedin-myGroups"));
    });
  }
  function leaveGroup() {
    const myGroups = sessionStorage.getItem("linkedin-myGroups");
    let parsedMyGroups = JSON.parse(myGroups);
    let filteredyGroups = parsedMyGroups.filter((group) => {
      return group._id !== item._id;
    });
    sessionStorage.setItem(
      "linkedin-myGroups",
      JSON.stringify(filteredyGroups)
    );
    setGroups((prev) => {
      return filteredyGroups;
    });
  }
  function handleNavigate() {
    navigate(`/group/${item._id}`);
  }
  return (
    <div className={`suggested-group-card ${darkMode ? "dark" : ""}`}>
      <div>
        {item.image ? (
          <img src={item.image} alt="" />
        ) : (
          <img
            src="https://static.licdn.com/aero-v1/sc/h/5v7kdqzhyyiogppftp4sj6sa0"
            alt=""
          />
        )}
        <div style={{ cursor: "pointer" }} onClick={handleNavigate}>
          <span>{item.name}</span>
          <span>Owner: {item.owner.name}</span>
        </div>
      </div>
      {groups.find((group) => {
        return group._id === item._id;
      }) ? (
        <button onClick={leaveGroup}>leave</button>
      ) : (
        <button onClick={addToMyGroups}>Join</button>
      )}
    </div>
  );
}

function SomethingWentWrongModal({ error, setError }) {
  const { darkMode } = useDarkMode();
  return (
    <>
      {createPortal(
        <div
          className={`something-went-wrong ${
            error ? "something-went-wrong-animation" : ""
          } ${darkMode ? "dark" : ""}`}
        >
          Something went wrong, try later
        </div>,
        document.body
      )}
    </>
  );
}
