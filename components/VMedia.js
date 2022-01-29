import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

const Container = styled.View`
  align-items: center;
`;
const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const VMedia = ({ poster_path, original_title, vote_average, full_data }) => {
  console.log(full_data);
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", {
      screen: "Detail",
      params: { ...full_data },
    });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <Container>
        <Poster path={poster_path}></Poster>
        <Title>
          {original_title.slice(0, 11)}
          {original_title.length > 13 ? "..." : null}
        </Title>
        <Votes vote_average={vote_average}></Votes>
      </Container>
    </TouchableOpacity>
  );
};

export default VMedia;
