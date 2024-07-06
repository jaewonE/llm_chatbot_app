import React, {useContext, useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import styled from 'styled-components/native';
import {UserContext} from '../content/userContent';

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

const Signup = ({navigation}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const {userName, setUserName} = useContext(UserContext);

  const handleSignup = () => {
    setUserName(name);
    // 추가적인 회원가입 로직
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
      <Button title="Signup" onPress={handleSignup} />
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />
    </Container>
  );
};

export default Signup;
