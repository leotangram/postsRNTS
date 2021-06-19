import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { colors } from '../theme/appTheme'
import PostsScreen from '../screens/PostsScreen'
import PostScreen from '../screens/PostScreen'
import { RootStackParams } from '../interfaces/interfaces'

const { Navigator, Screen } = createStackNavigator<RootStackParams>()

const StackNavigation = () => {
  return (
    <Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.background
        },
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
          backgroundColor: colors.primary
        },
        headerTintColor: colors.white
      }}
    >
      <Screen name="Posts" component={PostsScreen} />
      <Screen name="Post" component={PostScreen} />
    </Navigator>
  )
}

export default StackNavigation
