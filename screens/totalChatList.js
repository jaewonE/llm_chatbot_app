import React, {useContext, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Alert} from 'react-native';
import ChatList from '../views/chatList';
import styled from 'styled-components/native';
import axios from 'axios';
import {UserContext} from '../App';
import {API_URL} from '@env';

const TotalChatList = ({navigation: {navigate}}) => {
  const {userInfo} = useContext(UserContext);
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const initStart = useRef(false);

  useEffect(() => {
    const getChatList = async () => {
      initStart.current = true;
      const jwt = userInfo.jwt ?? '';
      if (jwt) {
        try {
          const response = await axios.get(`${API_URL}/history/list/all`, {
            headers: {'x-jwt': jwt},
          });
          if (response.status === 200 && response.data.status === 'success') {
            setChats(response.data.data.history_list ?? []);
          }
        } catch (error) {
          Alert.alert(
            'Error',
            error.response?.data?.message ?? 'Something went wrong',
          );
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    if (!initStart.current) {
      getChatList();
    }
  }, [userInfo]);

  return isLoading ? (
    <LoadingContainer>
      <ActivityIndicator size="large" color="#0000ff" />
    </LoadingContainer>
  ) : (
    <ChatList chatList={chats} navigate={navigate} />
  );
};

export default TotalChatList;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
