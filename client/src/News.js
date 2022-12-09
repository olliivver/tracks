import styled from 'styled-components';
import { useEffect, useState } from 'react';
const { REACT_APP_NEWS_KEY } = window.__RUNTIME_CONFIG__;

const News = () => {

  // useEffect(() => {
  //   fetch(
  //     `https://newsapi.org/v2/everything?q=train+montreal&apiKey=${REACT_APP_NEWS_KEY}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }, []);

  return (
    <StyledNews>
      <ul>
        <li>
          <a href="https://www.cbc.ca/news/canada/montreal/montreal-mile-end-pedestrian-crossing-canadian-pacific-1.6374736">
            <h3>
              Montreal's Mile End residents fight for pedestrian crossing after
              train hits woman
            </h3>
          </a>
        </li>
        <li>
          <a href="https://montreal.ctvnews.ca/montrealers-ticketed-654-for-crossing-mile-end-train-tracks-mps-in-talks-after-fatal-accident-1.5804776">
            <h3>
              Montrealers ticketed $654 for crossing Mile End train tracks; MPs
              in talks after fatal accident
            </h3>
          </a>
        </li>
        <li>
          <a href="https://globalnews.ca/news/8596278/montreal-pedestrian-train-crossing-mile-end/">
            <h3>
              Calls renewed for safe alternative to illegal train crossing in
              Montreal's Mile End
            </h3>
          </a>
        </li>
      </ul>
    </StyledNews>
  );
}
const StyledNews = styled.div`
  margin: 150px;
  @media (max-width: 1000px) {
    margin: 180px 20px;
  }
`;
export default News;