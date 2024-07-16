import React from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';

//   {
//     chat_id: 'a2dada-da2dntya4fs4s-cs3cacacs4-a3ca3',
//     creater: 'JaewonE',
//     model_name: 'Mock',
//     first_message:
//       '요즘 회사가기 너무 싫어. 일이 너무 많고 힘들어. 어떻게 해야 할까?',
//     last_modified_time: '2024-07-10 10:13:12',
//   },

const ChatList = ({navigate, chatList}) => {
  return (
    <Container>
      {chatList.map((chat, index) => (
        <ChatItem key={chat.chat_id} onPress={() => navigate('Chat', {chat})}>
          <ChatHeader>
            <ChatTitle>{chat.model_name}</ChatTitle>
            <ChatTime>{`${chat.creater} | ${chat.last_modified_time}`}</ChatTime>
          </ChatHeader>
          <ChatMessage numberOfLines={1}>{chat.first_message}</ChatMessage>
        </ChatItem>
      ))}
    </Container>
  );
};

export default ChatList;

const Container = styled.ScrollView`
  flex: 1;
  border-top-width: 1px;
  border-top-color: #e0e0e0;
  /* background-color: #ffffff; */
`;

const ChatItem = styled(TouchableOpacity)`
  padding: 16px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
  background-color: #fafafa;
`;

const ChatHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ChatTitle = styled.Text`
  color: #212121;
  font-size: 18px;
  font-weight: 700;
`;

const ChatTime = styled.Text`
  color: #757575;
  font-size: 12px;
`;

const ChatMessage = styled.Text`
  color: #424242;
  font-size: 14px;
  margin-top: 4px;
`;
