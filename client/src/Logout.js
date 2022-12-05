import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const Logout = () => {
  const { logout, isAuthenticated } = useAuth0();

  return isAuthenticated && <StyledButton onClick={() => logout()}>Logout</StyledButton>;
};

const StyledButton = styled.button`
  background-color: black;
  border: 2px solid white;
`;

export default Logout;
