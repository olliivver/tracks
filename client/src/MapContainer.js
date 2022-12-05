import styled from "styled-components";
import MapPage from "./Map";
import Legend from "./Legend";
import { useEffect } from "react";

const MapContainer = () => {

  return (
    <StyledBg>
      <Legend />
      <StyledMap>
        <MapPage />
      </StyledMap>
    </StyledBg>
  );
};
const StyledBg = styled.div`
  width: 100%;
  height: 100vh;
  background-color: black;
`;



const StyledMap = styled.div`
  margin-top: 100px;

`;

export default MapContainer;
