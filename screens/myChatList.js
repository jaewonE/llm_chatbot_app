import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  TouchableOpacity,
  Text,
  View,
  FlatList,
} from 'react-native';
import ChatList from '../views/chatList';
import styled from 'styled-components/native';
import axios from 'axios';
import {UserContext} from '../App';
import {API_URL} from '@env';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const MyChatList = ({navigation: {navigate, setOptions}}) => {
  const {userInfo} = useContext(UserContext);
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [availableModels, setAvailableModels] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
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
        const response = await axios.get(
          `${API_URL}/history/list/user/${userInfo.userName}`,
          {headers: {'x-jwt': jwt}},
        );
        if (response.status === 200 && response.data.status === 'success') {
          setChats(response.data.data.history_list ?? []);
          setAvailableModels(response.data.data.available_models ?? []);
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

  const handleModelSelect = model => {
    setSelectedModel(model);
    setIsModalVisible(false);
    navigate('ViewRouter', {
      screen: 'Chat',
      params: {selectedModel: model},
    });
  };

  return isLoading ? (
    <LoadingContainer>
      <ActivityIndicator size="large" color="#0000ff" />
    </LoadingContainer>
  ) : (
    <Wrapper>
      <ChatList chatList={chats} navigate={navigate} />
      <FloatingButton onPress={() => setIsModalVisible(true)}>
        <FontAwesome name="plus" size={24} color="white" />
      </FloatingButton>
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <ModalContainer>
          <ModalContent>
            <ModalTitle>모델 선택</ModalTitle>
            <FlatList
              data={availableModels}
              keyExtractor={item => item}
              renderItem={({item}) => (
                <ModelItemTouchable onPress={() => handleModelSelect(item)}>
                  <ModelItemText>{item}</ModelItemText>
                </ModelItemTouchable>
              )}
              contentContainerStyle={{alignItems: 'center'}}
            />
            <CloseButtonTouchable onPress={() => setIsModalVisible(false)}>
              <CloseButtonText>Close</CloseButtonText>
            </CloseButtonTouchable>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </Wrapper>
  );
};

export default MyChatList;

const Wrapper = styled.View`
  flex: 1;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const HeaderIcon = styled.TouchableOpacity`
  margin-right: 15px;
`;

const FloatingButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #007bff;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3); /* for iOS */
  elevation: 5; /* for Android */
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
  width: 80%;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  align-items: center;
`;

const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ModelItemTouchable = styled.TouchableOpacity`
  width: 100%;
  padding: 10px;
  align-items: center;
`;

const ModelItemText = styled.Text`
  font-size: 18px;
  text-align: center;
`;

const CloseButtonTouchable = styled.TouchableOpacity`
  margin-top: 20px;
`;

const CloseButtonText = styled.Text`
  font-size: 18px;
  color: red;
`;
