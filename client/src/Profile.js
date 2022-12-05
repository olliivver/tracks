import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Login from "./Login";
import MapPage from "./Map";
import { ContextPage } from "./ContextPage";
import { useContext } from "react";

const Profile = () => {
  const { isAuthenticated, user } = useAuth0();
  const [form, setForm] = useState({});
  const { currentUser, setCurrentUser } = useContext(ContextPage);

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`/handle-user`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email, ...form }),
      })
        .then((res) => res.json())
        .then((data) => {
          setCurrentUser(data.data);
        });
    }
  }, [isAuthenticated]);

  const settingsClick = () => {
    fetch(`/update-user`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email, ...form }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data.data);
      });
  };

  const handleClick = (e) => {
    e.preventDefault();
    setForm({ ...form, latitude: e.lngLat.lat, longitude: e.lngLat.lng });
  };

  if (!isAuthenticated) {
    return (
      <StyledPage>
        <h3>Please Log in</h3>
        <Login />
      </StyledPage>
    );
  }
  return (
    isAuthenticated && (
      <StyledPage>
        <ProfileLegend>
          <h2>This is your custom map page</h2>
          <p>
            To change map settings, adjust the map and then click here:{" "}
            <button onClick={settingsClick}>Save settings</button>
          </p>
        </ProfileLegend>
        <MapPage
          handleClick={handleClick}
          currentUser={currentUser}
        />
      </StyledPage>
    )
  );
};
const ProfileLegend = styled.div`
  width: 23%;
  button {
    background-color: black;
    border: 2px solid white;
    margin: 5px 0;
  }
`;

const StyledPage = styled.div`
  margin: 110px 20px;
  @media (max-width: 1000px) {
    margin: 180px 20px;
  }
`;
export default Profile;
