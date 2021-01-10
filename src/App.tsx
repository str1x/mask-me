import React from 'react';
import styled from 'styled-components';
import WebcamVideo from '@src/WebcamVideo';

const App = styled.div`
  font-family: system-ui;
`;
const Title = styled.h1`
  background-color: red;
`;

export default () => (
  <App>
    <Title>PEPEPEPEPE</Title>
    <WebcamVideo />
  </App>
);
