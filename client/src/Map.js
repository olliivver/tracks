import styled from "styled-components";
import ReactMapBox, { Marker } from "react-map-gl";
import { useState, useEffect } from "react";
import go from "./assets/pedestrian.png";
import stop from "./assets/forbidden.png";
import police from "./assets/policeman.png";
import PopupComponent from "./PopupComponent";
import { useAuth0 } from "@auth0/auth0-react";
import { ContextPage } from "./ContextPage";
import { useContext } from "react";

const { REACT_APP_MAPBOX_TOKEN } = window.__RUNTIME_CONFIG__;

const MapPage = ({ handleClick,  }) => {
  const { currentUser, viewState, setViewState } = useContext(ContextPage);
  const [crossing, setCrossing] = useState(null);
  const [selectCrossing, setSelectCrossing] = useState(null);
  const [infoDiv, setInfoDiv] = useState(false);
  const [refreshMap, setRefreshMap] = useState(false);
  const [policeReport, setPoliceReport] = useState(null);

  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    fetch("/get-crossing")
      .then((res) => res.json())
      .then((data) => {
        setCrossing(data.data);
      });
  }, [refreshMap]);

  const reportPolice = (_id) => {
    setInfoDiv(!infoDiv);
    fetch("/report-police", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: _id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setRefreshMap(!refreshMap);
      });

    fetch(`/police-ts`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: _id }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const reportPoliceGone = (_id) => {
    setInfoDiv(!infoDiv);
    fetch("/report-police-gone", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: _id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSelectCrossing({
          ...selectCrossing,
          [selectCrossing.result.police]: false,
        });
        setRefreshMap(!refreshMap);
      });
  };

  const reportOpen = (_id) => {
    setInfoDiv(!infoDiv);
    fetch("/report-open", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: _id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setRefreshMap(!refreshMap);
      });
  };

  const reportClosed = (_id) => {
    setInfoDiv(!infoDiv);
    fetch("/report-closed", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: _id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setRefreshMap(!refreshMap);
      });
  };

  const onSelect = (e, crossing) => {
    e.preventDefault();
    setSelectCrossing(crossing);
    setInfoDiv(!infoDiv);

    fetch("/get-police-reports")
      .then((res) => res.json())
      .then((data) => {
        let latestReportArr = [];
        data.data.forEach((report) => {
          if (report.crossingName === crossing.result.name) {
            latestReportArr.push(report);
          }
        });
        setPoliceReport(latestReportArr[latestReportArr.length - 1]);
      });
  };


  if (!crossing) {
    return <h1>Loading</h1>;
  }
  return (
    <Wrapper>
      <ReactMapBox
        initialViewState={viewState}
        mapboxAccessToken={REACT_APP_MAPBOX_TOKEN}
        mapStyle={"mapbox://styles/alltherighthype/claviciik000914s952oab0f5"}
        onClick={handleClick}
      >
        {crossing.map((each) => {
          return (
            <Marker
              latitude={each.result.latitude}
              longitude={each.result.longitude}
              key={each._id}
            >
              <div>
                <StyledIconDiv>
                  {each.result.open === true ? (
                    <img src={go} alt="this crossing is currently open" />
                  ) : (
                    <img src={stop} alt="this crossing is currently closed" />
                  )}
                  {each.result.police === true ? (
                    <img src={police} alt="this crossing has police reports" />
                  ) : null}
                </StyledIconDiv>
                <StyledBut key={each._id} onClick={(e) => onSelect(e, each)}>
                  {each.result.name}
                </StyledBut>
              </div>
            </Marker>
          );
        })}
        <PopupComponent
          selectCrossing={selectCrossing}
          infoDiv={infoDiv}
          reportClosed={reportClosed}
          reportOpen={reportOpen}
          reportPolice={reportPolice}
          setRefreshMap={setRefreshMap}
          refreshMap={refreshMap}
          reportPoliceGone={reportPoliceGone}
          policeReport={policeReport}
        />
      </ReactMapBox>
    </Wrapper>
  );
};
const StyledIconDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  img {
    width: 40px;
    bottom: 45px;
  }
`;

const StyledBut = styled.button`
  background-color: black;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 10px;
`;
const Wrapper = styled.div`
  position: absolute;
  top: 100px;
  left: 0;
  right: 0;
  height: 800px;
  background-color: gray;
  padding: 30px;
  left: 25%;
  width: 75%;

  @media (max-width: 1000px) {
    top: 170px;
  }
`;

export default MapPage;
