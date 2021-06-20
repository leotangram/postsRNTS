import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import PostsScreen from '../screens/PostsScreen'
import { colors } from '../theme/appTheme'

const { Navigator, Screen } = createMaterialTopTabNavigator()

const TopTabNavigation = () => {
  // const

  return (
    <Navigator
      tabBarOptions={{
        indicatorStyle:
          Platform.OS === 'android'
            ? styles.androidIndicatorStyle
            : styles.iOSIndicatorStyle,
        style:
          Platform.OS === 'android' ? styles.androidStyle : styles.iOSStyle,
        activeTintColor: colors.white,
        inactiveTintColor: Platform.OS === 'ios' ? colors.primary : undefined
      }}
    >
      <Screen name="All" component={PostsScreen} />
      <Screen name="Favorites" component={PostsScreen} />
    </Navigator>
  )
}

export default TopTabNavigation

const styles = StyleSheet.create({
  androidStyle: {
    backgroundColor: colors.primary
  },
  androidIndicatorStyle: {
    backgroundColor: colors.white
  },
  iOSStyle: {
    borderColor: colors.primary,
    borderRadius: 6,
    borderWidth: 2,
    marginHorizontal: 20,
    marginVertical: 10
  },
  iOSIndicatorStyle: {
    backgroundColor: colors.primary,
    color: 'white',
    height: '100%'
  }
})
