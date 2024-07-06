import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import InnerRoutes from './router/innerRoutes';
import OuterRouter from './router/outerRoutes';
import {UserContext, UserProvider} from './content/userContent';

const AppWrapper = () => {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
};

const App = () => {
  const {userName, setUserName} = useContext(UserContext);
  return (
    <NavigationContainer>
      {userName ? <InnerRoutes /> : <OuterRouter />}
    </NavigationContainer>
  );
};

export default AppWrapper;
