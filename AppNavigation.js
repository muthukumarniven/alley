import React from 'react';
import { View, Text, Image,StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CreateAccount from './screens/CreateAccount';
import CodeVerification from './screens/CodeVerification';
import CreateProfile from './screens/CreateProfile';
import Home from './screens/tabs/Home';
import Explore from './screens/tabs/Explore';
import Saved from './screens/tabs/Saved';
import Profile from './screens/tabs/Profile';
import AddCollection from './screens/AddCollection';
import { BlurView } from 'expo-blur';
import Notification from './screens/Notification';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CustomTabButton = ({ focused, label, iconSource }) => {
  const activeColor = '#FDB93A';
  const activeTextColor = '#FFFFFF';
  const inactiveColor = '#ADAEB1';

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
      {focused && (
        <View style={{ position: 'absolute', backgroundColor: '#3D3D40', borderRadius: 50, height: 44, width: 100 }} />
      )}

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={iconSource}
          resizeMode="contain"
          style={{
            height: 20,
            width: 20,
            marginRight: 5,
            tintColor: focused ? activeColor : inactiveColor,
          }}
        />
        <Text
          style={{
            color: focused ? activeTextColor : inactiveColor,
            fontSize: 9,
          }}
        >
          {label}
        </Text>
      </View>
    </View>
  );
};

const TabNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: insets.bottom > 0 ? insets.bottom : 20,
          left: 15,
          right: 15,
          height: 65,
          borderRadius: 35,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#1C1C1E',
          borderTopWidth: 0,
          elevation: 0,
          marginHorizontal: 20,
          paddingHorizontal: 20
        },
        tabBarBackground:()=>{
          <BlurView intensity={200}
          style={{...StyleSheet.absoluteFillObject,overflow:"hidden", backgroundColor:"transparent"}}/>
        }
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabButton
              focused={focused}
              label="Home"
              iconSource={require('./images/home.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabButton
              focused={focused}
              label="Explore"
              iconSource={require('./images/explore.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Saved"
        component={Saved}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabButton
              focused={focused}
              label="Saved"
              iconSource={require('./images/save.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabButton
              focused={focused}
              label="Profile"
              iconSource={require('./images/profile.png')}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='CreateAccount' component={CreateAccount} />
      <Stack.Screen name='CodeVerification' component={CodeVerification} />
      <Stack.Screen name='CreateProfile' component={CreateProfile} />
      <Stack.Screen name='Home' component={TabNavigator} />
      <Stack.Screen name='AddCollection' component={AddCollection} />
      <Stack.Screen name='Notification' component={Notification}/>

    </Stack.Navigator>
  );
}
