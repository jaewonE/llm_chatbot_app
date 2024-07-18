import React, {
  useEffect,
  useCallback,
  useState,
  useContext,
  useRef,
} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import styled from 'styled-components/native';
import {UserContext} from '../App';
import axios from 'axios';
import {API_URL} from '@env';
import {Alert} from 'react-native';
import {useMutation} from 'react-query';

const Chat = ({route, navigation: {setOptions}}) => {
  let chatId = route?.params?.chatId ?? null;
  const modelName = useRef(route?.params?.selectedModel ?? '');
  const [messages, setMessages] = useState([]);
  const {userInfo} = useContext(UserContext);
  const hasInit = useRef(false);
  const jwt = useRef(userInfo.jwt ?? '');
  const userName = useRef(userInfo.userName ?? '');
  const RobotAvatarRenderer = useRef(() => (
    <AvatarWrapper>
      <AvatarImage source={require('../assets/images/chatbot.jpg')} />
    </AvatarWrapper>
  ));
  const UserAvatarRenderer = useRef(() => (
    <AvatarWrapper>
      <AvatarImage source={require('../assets/images/user.jpg')} />
    </AvatarWrapper>
  ));

  useEffect(() => {
    const getChatList = async () => {
      if (chatId && jwt.current) {
        try {
          const response = await axios.get(`${API_URL}/history/${chatId}`, {
            headers: {Authorization: `Bearer ${jwt.current}`},
          });
          if (response.status === 200 && response.data.status === 'success') {
            modelName.current = response.data.data.history.model_name ?? 'Mock';
            const mes = response.data.data.history.messages ?? [];
            setMessages(
              mes.map(m => ({
                _id: m.mes_id,
                text: m.content,
                createdAt: new Date(m.time),
                user: {
                  _id: m.user_name,
                  name: m.user_name,
                  avatar:
                    m.user_name === 'assistant'
                      ? RobotAvatarRenderer.current
                      : UserAvatarRenderer.current,
                },
              })),
            );
            setOptions({title: modelName.current});
          }
        } catch (error) {
          Alert.alert(
            'Error',
            error.response?.data?.message ?? 'Something went wrong',
          );
        }
      } else {
        setMessages([
          {
            _id: Math.round(Math.random() * 1000000),
            text: '안녕 인간. 뭐해줄까?',
            createdAt: new Date(),
            user: {
              _id: 'assistant',
              name: 'assistant',
              avatar: RobotAvatarRenderer.current,
            },
          },
        ]);
        setOptions({title: modelName.current});
      }
      hasInit.current = true;
    };
    if (hasInit.current === false) {
      getChatList();
    }
  }, [chatId, setOptions]);

  const mutation = useMutation(
    postData =>
      axios.post(
        chatId ? `${API_URL}/chat/${chatId}` : `${API_URL}/chat/new`,
        postData,
        {
          headers: {Authorization: `Bearer ${jwt.current}`},
        },
      ),
    {
      onSuccess: async data => {
        if (data.status === 200 && data.data.status === 'success') {
          if (!chatId) {
            chatId = data.data.data.chat_id;
          }
          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, [
              {
                _id: Math.round(Math.random() * 1000000),
                text: data.data.data.answer ?? 'Something wrong...',
                createdAt: new Date(),
                user: {
                  _id: 'assistant',
                  name: 'assistant',
                  avatar: RobotAvatarRenderer.current,
                },
              },
            ]),
          );
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

  const onSend = useCallback(
    async (mesObj = []) => {
      // mesObj: [{"_id": "9f81ac72-5763-4c2a-9b93-596a1640261d", "createdAt": 2024-07-17T08:49:56.794Z, "text": "asd", "user": {"_id": "JaewonE", "name": "JaewonE"}}]
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, mesObj),
      );
      mutation.mutate({
        model_name: modelName.current,
        user_name: userName.current,
        query: mesObj[0].text,
      });
    },
    [mutation],
  );

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      renderUsernameOnMessage={true}
      renderAvatarOnTop={true}
      onSend={mesObj => onSend(mesObj)}
      user={{
        _id: userName.current,
        name: userName.current,
      }}
    />
  );
};

export default Chat;

const AvatarWrapper = styled.View`
  width: 36px;
  height: 36px;
  margin-right: -6px;
`;

const AvatarImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 9999px;
  background-color: #fff;
`;
