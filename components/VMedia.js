import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

const Movie = styled.View`
  align-items: center;
`;
const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const VMedia = ({ poster_path, original_title, vote_average }) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", {
      screen: "Detail",
      params: { original_title },
    });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <Movie>
        <Poster path={poster_path}></Poster>
        <Title>
          {original_title.slice(0, 11)}
          {original_title.length > 13 ? "..." : null}
        </Title>
        <Votes vote_average={vote_average}></Votes>
      </Movie>
    </TouchableOpacity>
  );
};

export default VMedia;
