import React from 'react';
import {Text} from 'react-native';

const ChatList = ({navigate, chatList}) => {
  return chatList.map((chat, index) => (
    <Text key={index} onPress={() => navigate('Chat', {chat})}>
      {chat.name}
    </Text>
  ));
};

export default ChatList;
