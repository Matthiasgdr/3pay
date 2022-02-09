import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  background-color: ${(p) => p.theme.colors.background.primary};
`;

const Example = () => {
  return (
    <div>
      <Title>Example</Title>
    </div>
  );
};

export { Example };
