import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import PostsScreen from '../screens/PostsScreen'

const { Navigator, Screen } = createMaterialTopTabNavigator()

const TopTabNavigation = () => {
  return (
    <Navigator>
      <Screen name="All" component={PostsScreen} />
      <Screen name="Favorites" component={PostsScreen} />
    </Navigator>
  )
}

export default TopTabNavigation
