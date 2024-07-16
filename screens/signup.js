import React, {useContext, useState} from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';
import styled from 'styled-components/native';
import {UserContext} from '../App';
import {useMutation} from 'react-query';
import axios from 'axios';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {API_URL} from '@env';

const Signup = ({navigation: {navigate}}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const {setUserName} = useContext(UserContext);
  const {setItem} = useAsyncStorage('@x-jwt');

  const mutation = useMutation(
    user => axios.post(`${API_URL}/user/signup`, user),
    {
      onSuccess: async data => {
        if (data.status === 200 && data.data.status === 'success') {
          await setItem(data.data['x-jwt']);
          setUserName(name);
        } else {
          Alert.alert('Error', data.data.message);
        }
      },
      onError: error => {
        Alert.alert(
          'Error',
          error.response.data.message ?? 'Something went wrong',
        );
      },
    },
  );

  const handleSignup = () => {
    mutation.mutate({user_name: name, user_password: password});
  };

  return (
    <Container>
      <Title>Signup</Title>
      <Input placeholder="Name" value={name} onChangeText={setName} />
      <Input
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <ButtonContainer onPress={handleSignup}>
        <ButtonText>Sign up</ButtonText>
      </ButtonContainer>
      <GoLogin onPress={() => navigate('Login')}>Go to Login</GoLogin>
    </Container>
  );
};

export default Signup;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 32px;
  margin-bottom: 28px;
`;

const Input = styled.TextInput`
  height: 40px;
  border-color: gray;
  border-width: 1px;
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 10px;
  width: 100%;
`;

const ButtonContainer = styled.TouchableOpacity`
  width: 100%;
  background-color: #833ab4;
  border-radius: 8px;
  padding: 8px;
  padding-bottom: 11px;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 4px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 17px;
  font-weight: 700;
`;

const GoLogin = styled.Text`
  background-color: #ffffff00;
  color: #4285f4;
  font-size: 15px;
  font-weight: 400;
  margin-top: 2px;
`;
