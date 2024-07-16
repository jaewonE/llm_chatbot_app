import React, {createContext, useCallback, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import InnerRoutes from './router/innerRoutes';
import OuterRouter from './router/outerRoutes';
import {QueryClient, QueryClientProvider} from 'react-query';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import AppLoading from './screens/appLoading';
import axios from 'axios';
import {API_URL} from '@env';

const queryClient = new QueryClient();
export const UserContext = createContext();

const App = () => {
  const [userName, setUserName] = useState('');
  const [isAppLoading, setIsAppLoading] = useState(true);
  const {getItem, setItem} = useAsyncStorage('@x-jwt');

  const getUser = useCallback(async () => {
    const jwt = await getItem();
    if (jwt) {
      try {
        const response = await axios.get(`${API_URL}/user/get`, {
          headers: {'x-jwt': jwt},
        });
        if (response.status === 200 && response.data.status === 'success') {
          const name = response.data.user_name;
          if (name) {
            setUserName(name);
            await setItem(jwt);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    setTimeout(() => {
      setIsAppLoading(false);
    }, 500);
  }, [getItem, setItem, setUserName]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return isAppLoading ? (
    <AppLoading />
  ) : (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <UserContext.Provider value={{userName, setUserName}}>
          {userName ? <InnerRoutes /> : <OuterRouter />}
        </UserContext.Provider>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
