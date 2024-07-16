import React, {useContext} from 'react';
import styled from 'styled-components/native';
import {removeData} from '../utils/storage';
import {UserContext} from '../App';

const Setting = ({navigation: {navigate}}) => {
  const {setUserName} = useContext(UserContext);
  return (
    <Container>
      <Title>Setting</Title>
      <LogoutButton
        title="Log out"
        color="#ff0000"
        onPress={() => {
          removeData('@x-jwt');
          setUserName('');
        }}
      />
    </Container>
  );
};

export default Setting;

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: #fff;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const LogoutButton = styled.Button`
  margin-top: auto;
  border-radius: 12px;
  background-color: #ff0000;
  color: #fff;
`;
