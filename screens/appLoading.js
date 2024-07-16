import React from 'react';
import styled from 'styled-components/native';

const ImageBackground = styled.ImageBackground`
  height: 100%;
  width: 100%;
`;

const AppLoading = () => (
  <ImageBackground
    source={require('../assets/images/kangnam_university.jpeg')}
  />
);

export default AppLoading;
