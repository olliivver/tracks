import styled from "styled-components";
import { Link } from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";


const Header = () => {
  return (
    <StyledHeader>
      <Link to="/">
        <h1>tracks</h1>
      </Link>
      <h3>tracking crossings in mtl, qc</h3>
      <Link to="/news">
        <h3>News</h3>
      </Link>
    <Login/>
    <Logout/>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  background-color: black;
  height: 100px;
  width: 100%;
  position: absolute;
  top: 0;
  color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #fff;
  h1{
    font-size: 1.5rem;
  }
  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    height:170px;
  }
`;

export default Header;
