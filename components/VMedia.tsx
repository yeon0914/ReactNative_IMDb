import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, TouchableOpacityBase } from "react-native";
import styled from "styled-components/native";
import Detail from "../screens/Detail";
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

interface VMediaProps {
  poster_path: string;
  original_title: string;
  vote_average: number;
}

const VMedia: React.FC<VMediaProps> = ({
  poster_path,
  original_title,
  vote_average,
}) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", { screen: Detail });
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
