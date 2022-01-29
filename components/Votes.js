import React from "react";
import styled from "styled-components/native";

const Text = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
`;

const Votes = ({ vote_average }) => (
  <Text>{vote_average > 0 ? `★ ${vote_average}/10` : `coming soon`}</Text>
);

export default Votes;
