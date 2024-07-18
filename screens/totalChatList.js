import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import {ActivityIndicator, Alert} from 'react-native';
import ChatList from '../views/chatList';
import styled from 'styled-components/native';
import axios from 'axios';
import {UserContext} from '../App';
import {API_URL} from '@env';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TotalChatList = ({navigation: {navigate, setOptions}}) => {
  const {userInfo} = useContext(UserContext);
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const initStart = useRef(false);
  const HeaderRightRenderer = useRef(() => (
    <HeaderIcon onPress={getChatList}>
      <Ionicons name="refresh" size={24} color="black" />
    </HeaderIcon>
  ));

  const getChatList = useCallback(async () => {
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
  }, [userInfo]);

  useEffect(() => {
    if (!initStart.current) {
      getChatList();
    }
  }, [userInfo, getChatList]);

  useEffect(() => {
    setOptions({
      headerRight: HeaderRightRenderer.current,
    });
  }, [setOptions, getChatList]);

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

const HeaderIcon = styled.TouchableOpacity`
  margin-right: 15px;
`;
