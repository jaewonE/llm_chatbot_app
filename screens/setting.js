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
        onPress={() => {
          removeData('@x-jwt');
          setUserName('');
        }}>
        <LogoutText>Log out</LogoutText>
      </LogoutButton>
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

const LogoutButton = styled.TouchableOpacity`
  margin-top: auto;
  border-radius: 8px;
  background-color: #db4437;
  padding: 8px;
  padding-bottom: 11px;
  margin-bottom: 12px;
`;

const LogoutText = styled.Text`
  color: #fff;
  font-size: 18px;
  text-align: center;
  font-weight: 600;
`;
