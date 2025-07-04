import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CreateAccount from './screens/CreateAccount';
import CodeVerification from './screens/CodeVerification';
import CreateProfile from './screens/CreateProfile';
import AddCollection from './screens/AddCollection';
import Notification from './screens/Notification';
import Home from './screens/Home';
import Explore from './screens/Explore';
import Saved from './screens/Saved';
import Profile from './screens/Profile'
import Collections from './screens/Collections';
import Gallery from './screens/Gallery';
import SavedCollection from './screens/SavedCollection';
import ProfileCollection from './screens/ProfileCollection';
import GalleryAddCollect from './screens/GalleryAddCollect'
import Canvas from './screens/Canvas';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false, animationEnabled: false, animation: "fade", }}>
      <Stack.Screen name='CreateAccount' component={CreateAccount} />
      <Stack.Screen name='CodeVerification' component={CodeVerification} />
      <Stack.Screen name='CreateProfile' component={CreateProfile} />
      <Stack.Screen name='AddCollection' component={AddCollection} />
      <Stack.Screen name='Notification' component={Notification} />
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Explore' component={Explore} />
      <Stack.Screen name='Saved' component={Saved} />
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='Collections' component={Collections} />
      <Stack.Screen name='Gallery' component={Gallery} />
      <Stack.Screen name='SavedCollection' component={SavedCollection} />
      <Stack.Screen name='ProfileCollection' component={ProfileCollection} />
      <Stack.Screen name='GalleryAddCollect' component={GalleryAddCollect} />
      <Stack.Screen name='Canvas' component={Canvas} />

      


    </Stack.Navigator>
  );
}



