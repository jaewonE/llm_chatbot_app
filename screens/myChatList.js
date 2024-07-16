import React from 'react';
import {Text} from 'react-native';
import ChatList from '../views/chatList';

const MyChatList = ({navigation: {navigate}}) => {
  const chats = [
    {
      chat_id: 'a2dada-da2da4fs4s-cs3cacacs4-a3ca3',
      creater: 'JaewonE',
      model_name: 'Mock',
      first_message:
        '요즘 회사가기 너무 싫어. 일이 너무 많고 힘들어. 어떻게 해야 할까?',
      last_modified_time: '2024-07-10 14:13:12',
    },
    {
      chat_id: 'a2dada-da2dqwe4fs4s-cs3cacacs4-a3ca3',
      creater: 'JaewonE',
      model_name: 'Llama2',
      first_message:
        '요즘 회사가기 너무 싫어. 일이 너무 많고 힘들어. 어떻게 해야 할까?',
      last_modified_time: '2024-07-10 13:13:12',
    },
    {
      chat_id: 'a2dada-da2qya4fs4s-cs3cacacs4-a3ca3',
      creater: 'JaewonE',
      model_name: 'Mock',
      first_message:
        '요즘 회사가기 너무 싫어. 일이 너무 많고 힘들어. 어떻게 해야 할까?',
      last_modified_time: '2024-07-10 12:13:12',
    },
    {
      chat_id: 'a2dada-da2dsfba4fs4s-cs3cacacs4-a3ca3',
      creater: 'JaewonE',
      model_name: 'Llama2',
      first_message:
        '요즘 회사가기 너무 싫어. 일이 너무 많고 힘들어. 어떻게 해야 할까?',
      last_modified_time: '2024-07-10 11:13:12',
    },
    {
      chat_id: 'a2dada-da2dntya4fs4s-cs3cacacs4-a3ca3',
      creater: 'JaewonE',
      model_name: 'Mock',
      first_message:
        '요즘 회사가기 너무 싫어. 일이 너무 많고 힘들어. 어떻게 해야 할까?',
      last_modified_time: '2024-07-10 10:13:12',
    },
  ];
  return <ChatList chatList={chats} navigate={navigate} />;
};

export default MyChatList;
