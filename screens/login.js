import React, {useContext, useState} from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';
import styled from 'styled-components/native';
import {useMutation} from 'react-query';
import axios from 'axios';
import {UserContext} from '../App';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {API_URL} from '@env';

const Login = ({navigation: {navigate}}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const {setUserName} = useContext(UserContext);
  const {setItem} = useAsyncStorage('@x-jwt');

  const mutation = useMutation(
    user => axios.post(`${API_URL}/user/signin`, user),
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

  const handleLogin = () => {
    mutation.mutate({user_name: name, user_password: password});
  };

  return (
    <Container>
      <Title>Login</Title>
      <Input placeholder="Name" value={name} onChangeText={setName} />
      <Input
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Go to Signup" onPress={() => navigate('Signup')} />
    </Container>
  );
};

export default Login;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  height: 40px;
  border-color: gray;
  border-width: 1px;
  margin-bottom: 20px;
  padding: 10px;
  width: 100%;
`;
