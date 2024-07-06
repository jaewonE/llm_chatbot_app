// import React, {useEffect, useCallback, useState, useLayoutEffect} from 'react';
// import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import {Avatar} from 'react-native-elements';
// import {GiftedChat} from 'react-native-gifted-chat';

// // HeaderLeft 컴포넌트 정의
// const HeaderLeft = () => (
//   <View style={{marginLeft: 20}}>
//     <Avatar
//       rounded
//       source={{
//         uri: 'https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp&w=256',
//       }}
//     />
//   </View>
// );

// // HeaderRight 컴포넌트 정의
// const HeaderRight = ({signOutNow}) => (
//   <TouchableOpacity style={{marginRight: 10}} onPress={signOutNow}>
//     <Text>logout</Text>
//   </TouchableOpacity>
// );

// const Chat = ({navigation}) => {
//   const [messages, setMessages] = useState([]);
//   const signOutNow = useCallback(() => {
//     console.log('signing out');
//   }, []);

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerLeft: () => <HeaderLeft />,
//       headerRight: () => <HeaderRight signOutNow={signOutNow} />,
//     });
//   }, [navigation, signOutNow]);

//   useEffect(() => {
//     setMessages([
//       {
//         _id: 1,
//         text: 'Hello developer',
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: 'React Native',
//           avatar: 'https://placeimg.com/140/140/any',
//         },
//       },
//     ]);
//   }, []);

//   const onSend = useCallback((mes = []) => {
//     setMessages(previousMessages => GiftedChat.append(previousMessages, mes));
//   }, []);

//   return (
//     <GiftedChat
//       messages={messages}
//       showAvatarForEveryMessage={true}
//       onSend={mes => onSend(mes)}
//       user={{
//         _id: 'id1',
//         name: 'name1',
//         avatar:
//           'https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp&w=256',
//       }}
//     />
//   );
// };

// export default Chat;

import React from 'react';
import {Text} from 'react-native';

const Chat = ({navigation: {navigate}}) => <Text>Chat</Text>;

export default Chat;
