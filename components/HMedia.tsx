import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;
const HMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
`;
const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;
const Overview = styled.Text`
  color: white;
  opacity: 0.8;
  width: 80%;
`;
const Release = styled.Text`
  color: white;
  font-size: 12px;
  margin-vertical: 10px;
`;

interface HMediaProps {
  poster_path: string;
  original_title: string;
  release_date?: string;
  vote_average?: number;
  overview: string;
}

const HMedia: React.FC<HMediaProps> = ({
  poster_path,
  original_title,
  release_date,
  vote_average,
  overview,
}) => (
  <HMovie>
    <Poster path={poster_path}></Poster>
    <HColumn>
      <Title>{original_title}</Title>
      {release_date ? (
        <Release>
          {new Date(release_date).toLocaleDateString("ko", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </Release>
      ) : null}

      <Overview>
        {overview !== "" && overview.length > 13
          ? `${overview.slice(0, 150)}...`
          : overview}
      </Overview>
    </HColumn>
  </HMovie>
);

export default HMedia;
