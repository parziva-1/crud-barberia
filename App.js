import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { BottomNavigation, Icon, PaperProvider } from 'react-native-paper'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen } from './src/components/home-screen'
import { ReportsScreen } from './src/components/reports-screen'
import { NavigationContainer } from '@react-navigation/native'
import { CommonActions } from '@react-navigation/native'

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <StatusBar style="auto" />
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
          }}
          tabBar={({ navigation, state, descriptors, insets }) => (
            <BottomNavigation.Bar
              navigationState={state}
              safeAreaInsets={insets}
              onTabPress={({ route, preventDefault }) => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                })

                if (event.defaultPrevented) {
                  preventDefault()
                } else {
                  navigation.dispatch({
                    ...CommonActions.navigate(route.name, route.params),
                    target: state.key,
                  })
                }
              }}
              renderIcon={({ route, focused, color }) => {
                const { options } = descriptors[route.key]
                if (options.tabBarIcon) {
                  return options.tabBarIcon({ focused, color, size: 24 })
                }

                return null
              }}
              getLabelText={({ route }) => {
                const { options } = descriptors[route.key]
                const label =
                  options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                      ? options.title
                      : route.title

                return label
              }}
            />
          )}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => {
                return <Icon name="home" size={size} color={color} />
              },
            }}
          />
          <Tab.Screen
            name="Settings"
            component={ReportsScreen}
            options={{
              tabBarLabel: 'Settings',
              tabBarIcon: ({ color, size }) => {
                return <Icon name="cog" size={size} color={color} />
              },
            }}
          />
        </Tab.Navigator>
      </PaperProvider>
    </NavigationContainer>
  )
}
