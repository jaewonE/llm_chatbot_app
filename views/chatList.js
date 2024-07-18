import React from 'react';
import styled from 'styled-components/native';
import {TouchableWithoutFeedback} from 'react-native';

const ChatList = ({navigate, chatList}) => {
  const getTimeString = time => {
    let result = '';
    const arr = time.split(' ');
    result += arr[0].slice(5).split('-').join('/');
    result += ' ';
    result += arr[1].split(':', 2).join(':');
    return result;
  };
  return (
    <Container>
      {chatList.map(chat => (
        <TouchableWithoutFeedback
          key={chat.chat_id}
          onPress={() =>
            navigate('ViewRouter', {
              screen: 'Chat',
              params: {chatId: chat.chat_id},
            })
          }>
          <ChatItem>
            <ChatHeader>
              <ChatTitle>{chat.model_name}</ChatTitle>
              <ChatTime>{`${getTimeString(chat.last_modified_time)}\n${
                chat.creater
              }`}</ChatTime>
            </ChatHeader>
            <ChatMessage numberOfLines={1}>{chat.last_message}</ChatMessage>
          </ChatItem>
        </TouchableWithoutFeedback>
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

const ChatItem = styled.View`
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
  text-align: right;
  color: #757575;
  font-size: 12px;
`;

const ChatMessage = styled.Text`
  color: #424242;
  font-size: 14px;
  margin-top: 4px;
`;
