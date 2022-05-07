import React from "react";
import styled from "styled-components/native";

interface VotesProps {
    votes: number;
}

const Text = styled.Text`
    font-size: 12px;
    font-weight: normal;
    margin-top: 0px;
    color: ${props => props.theme.textColorDeemed};
`;

const Votes: React.FC<VotesProps> = ({ voteAverage }) => (
    <Text>{voteAverage > 0 ? `★${voteAverage}/10` : `Coming soon`}</Text>
);

export default Votes;