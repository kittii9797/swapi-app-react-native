import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Detail } from '../screens/Detail';
import { Home } from '../screens/Home';
import { Search } from '../screens/Search';
import { Image, TouchableOpacity } from 'react-native';
import type { MainStackParamList } from '../navigators/types';

const Stack = createNativeStackNavigator<MainStackParamList>();

export function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          headerLargeTitle: true,
          headerTitle: () => (
            <Image
              source={require('../../assets/logo.png')}
              style={{ width: 100, height: 100 }}
            />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Search')} style={{ marginRight: 10 }}>
              <MaterialIcons name="search" color="black" size={32} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerTitle: '',
          headerTransparent: true,
          headerTintColor: 'white',
          presentation: 'modal', // This line enables the "slide from bottom" animation
        }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Search" component={Search} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
