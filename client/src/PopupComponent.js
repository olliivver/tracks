import styled from "styled-components";
import moment from "moment";

const PopupComponent = ({
  selectCrossing,
  infoDiv,
  reportClosed,
  reportOpen,
  reportPolice,
  reportPoliceGone,
  policeReport,
}) => {
  if (!selectCrossing) {
    return <h1>Loading</h1>;
  }
  return (
    <>
      {selectCrossing !== null ? (
        <StyledInfo infoDiv={infoDiv}>
          <h2>{selectCrossing.result.name}</h2>
          <div>
            {selectCrossing.result.open === true ? (
              <div>
                <p>Crossing currently open</p>
                <button onClick={() => reportClosed(selectCrossing._id)}>
                  Report Closed
                </button>
              </div>
            ) : (
              <div>
                <p>Crossing currently closed</p>
                <button onClick={() => reportOpen(selectCrossing._id)}>
                  Report Open
                </button>
              </div>
            )}
            {selectCrossing.result.police === true ? (
              <div>
                {policeReport ? (
                  <p>
                    Police last reported{" "}
                    {moment(policeReport.timeStamp).format(
                      "H:mm • MMM Do YYYY"
                    )}
                  </p>
                ) : (
                  <p>Police never reported</p>
                )}
                <button onClick={() => reportPoliceGone(selectCrossing._id)}>
                  Report Police Gone
                </button>
              </div>
            ) : (
              <div>
                <p>police currently not reported.</p>
                <button onClick={() => reportPolice(selectCrossing._id)}>
                  Report Police
                </button>
                {policeReport ? (
                  <p>
                    {" "}
                    Police last reported{" "}
                    {moment(policeReport.timeStamp).format("H:mm • D MMM YY")}
                  </p>
                ) : (
                  <p>Police never reported</p>
                )}
              </div>
            )}
            {selectCrossing.result.bike === "true" ? (
              <p>This crossing is wide enough for bicycles</p>
            ) : (
              <p>This crossing is too small for bicycles</p>
            )}
          </div>
        </StyledInfo>
      ) : null}
    </>
  );
};

const StyledInfo = styled.div`
  display: ${(props) => (props.infoDiv ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  width: 300px;
  padding: 20px;
  font-size: 1.1rem;
  background-color: black;
  p {
    border-top: 2px solid white;
    padding: 5px;
  }
  button {
    background-color: gray;
    cursor: pointer;
    padding: 5px;
  }
  h2 {
    padding: 3px;
  }
`;

export default PopupComponent;
