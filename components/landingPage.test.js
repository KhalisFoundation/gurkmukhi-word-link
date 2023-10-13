/* eslint-disable no-unused-vars */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import renderer, { act } from 'react-test-renderer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../firebase';
import HomeScreen from './homeScreen/landingPage';

const Stack = createStackNavigator();
const Store = {
  getState: jest.fn(() => ({})),
  dispatch: jest.fn(),
  subscribe: jest.fn()
};

jest.mock('../firebase', () => ({
  auth: {
    signInAnonymously: jest.fn(() => Promise.resolve()),
    onAuthStateChanged: jest.fn(),
  },
  addEventListener: jest.fn(),
  attachEvent: jest.fn()
}));

jest.mock('expo-firebase-analytics', () => ({
  Analytics: {
    logEvent: jest.fn(() => Promise.resolve()),
    setCurrentScreen: jest.fn(() => Promise.resolve())
  }
}));

describe('HomeScreen', () => {
  let component;

  beforeEach(() => {
    component = (
      <Provider store={Store}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Menu"
                component={HomeScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    );
  });

  test('renders without crashing', async () => {
    await act(async () => {
      const rendered = renderer.create(component).toJSON();
      expect(rendered).toMatchSnapshot();
    });
  });

  test('renders without crashing - with user', async () => {
    await act(async () => {
      await AsyncStorage.setItem('user', 'user');
      const rendered = renderer.create(component).toJSON();
      expect(rendered).toMatchSnapshot();
    });
  });
});
