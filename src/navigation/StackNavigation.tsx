import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { colors } from '../theme/appTheme'
import { RootStackParams } from '../interfaces/interfaces'
import { PostsContext } from '../context/PostsContext'
import PostScreen from '../screens/PostScreen'
import TopTabNavigation from './TopTabNavigation'

const { Navigator, Screen } = createStackNavigator<RootStackParams>()

const StackNavigation = () => {
  const {
    getFavorites,
    postsState: { favorites },
    reload,
    resetPosts
  } = useContext(PostsContext)

  const [reloadfavorite, setReloadfavorite] = useState(false)

  useEffect(() => {
    getFavorites()
  }, [])

  const addToFavorites = async (postId: string) => {
    setReloadfavorite(true)
    let stringifiedArray
    if (favorites.includes(postId)) {
      const removedPostId = favorites.filter(favorite => favorite !== postId)
      stringifiedArray = JSON.stringify([...removedPostId])
    } else {
      stringifiedArray = JSON.stringify([...favorites, postId])
    }

    try {
      await AsyncStorage.setItem('favorites', stringifiedArray)
      getFavorites()
    } catch (error) {
      console.log(error)
    } finally {
      setReloadfavorite(false)
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
      <Screen
        name="Posts"
        component={TopTabNavigation}
        options={{
          headerRight: () =>
            !reload ? (
              <TouchableOpacity
                onPress={resetPosts}
                style={styles.favoriteIcon}
              >
                <Icon name="reload" size={23} color={colors.white} />
              </TouchableOpacity>
            ) : (
              <ActivityIndicator
                style={styles.favoriteIcon}
                size="small"
                color={colors.white}
              />
            )
        }}
      />
      <Screen
        name="Post"
        component={PostScreen}
        options={({ route }) => ({
          headerRight: () => {
            const postId: string = route.params.id.toString()
            const isFavorite = favorites.includes(postId)
            return !reloadfavorite ? (
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
            ) : (
              <ActivityIndicator
                style={styles.favoriteIcon}
                size="small"
                color={colors.white}
              />
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
