import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { colors } from '../theme/appTheme'
import { RootStackParams } from '../interfaces/interfaces'
import PostsScreen from '../screens/PostsScreen'
import PostScreen from '../screens/PostScreen'
import { useState } from 'react'
import { useEffect } from 'react'

const { Navigator, Screen } = createStackNavigator<RootStackParams>()

const StackNavigation = () => {
  const [favorites, setFavorites] = useState<string[]>([])
  console.log('favorites', favorites)

  useEffect(() => {
    getFavorites()
  }, [])

  const getFavorites = async () => {
    const storagedFavorites: string | null = await AsyncStorage.getItem(
      'favorites'
    )
    if (storagedFavorites) {
      const stringToArrayFavorites = JSON.parse(storagedFavorites)
      setFavorites([...stringToArrayFavorites])
    }
  }

  const addToFavorites = async (postId: string) => {
    let stringifiedArray
    if (favorites.includes(postId)) {
      const removedPostId = favorites.filter(favorite => favorite !== postId)
      console.log('removedPostId', removedPostId)
      stringifiedArray = JSON.stringify([...removedPostId])
    } else {
      stringifiedArray = JSON.stringify([...favorites, postId])
    }

    try {
      await AsyncStorage.setItem('favorites', stringifiedArray)
      getFavorites()
    } catch (error) {
      console.log(error)
    }
  }

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
      <Screen
        name="Post"
        component={PostScreen}
        options={({ route }) => ({
          headerRight: () => {
            const postId: string = route.params.id.toString()
            const isFavorite = favorites.includes(postId)
            return (
              <TouchableOpacity
                onPress={() => addToFavorites(postId)}
                style={styles.favoriteIcon}
              >
                <Icon
                  name={isFavorite ? 'star' : 'star-outline'}
                  size={23}
                  color={isFavorite ? colors.yellow : colors.white}
                />
              </TouchableOpacity>
            )
          },
          headerBackTitleVisible: false
        })}
      />
    </Navigator>
  )
}

export default StackNavigation

const styles = StyleSheet.create({
  favoriteIcon: {
    marginRight: 15
  }
})
