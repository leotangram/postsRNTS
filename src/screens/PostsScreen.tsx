import React, { FC, useContext, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/Ionicons'
import AnimatedLoader from 'react-native-animated-loader'

import { colors } from '../theme/appTheme'
import { IPostsScreenProps, IPost } from '../interfaces/interfaces'
import PostItem from '../components/PostItem'
import { PostsContext } from '../context/PostsContext'

const PostsScreen: FC<IPostsScreenProps> = ({ navigation, route }) => {
  const [favoritePosts, setFavoritePosts] = useState<IPost[]>([])
  const [loadDeleteAllPosts, setLoadDeleteAllPosts] = useState(false)
  const [loadDeletePost, setloadDeletePost] = useState(false)

  const {
    getFavorites,
    getPosts,
    getReads,
    loadPosts,
    postsState: { favorites, posts, reads },
    reload,
    setPosts
  } = useContext(PostsContext)

  useEffect(() => {
    const getPostsStoraged = async () => {
      try {
        const storagedPosts = await AsyncStorage.getItem('posts')
        if (!storagedPosts) {
          getPosts()
        } else {
          setPosts(JSON.parse(storagedPosts))
        }
      } catch (error) {}
    }
    getPostsStoraged()
  }, [])

  useEffect(() => {
    if (posts) {
      getReads()
      getFavorites()
      const addPostsToStorage = async () => {
        try {
          await AsyncStorage.setItem('posts', JSON.stringify(posts))
        } catch (error) {
          console.log(error)
        }
      }
      addPostsToStorage()
    }
  }, [posts])

  useEffect(() => {
    if (favorites) {
      console.log('favorites', favorites)

      const allFavorites = posts.filter(({ id }) =>
        favorites.includes(id.toString())
      )
      setFavoritePosts(allFavorites)
    }
  }, [favorites])

  const onOpacityPress = async (post: IPost) => {
    const postId = post.id.toString()
    if (!reads.includes(postId)) {
      const stringifiedReads = JSON.stringify([...reads, postId])
      try {
        await AsyncStorage.setItem('reads', stringifiedReads)
        getReads()
      } catch (error) {
        console.log(error)
      }
    }
    navigation.navigate('Post', { ...post })
  }

  const deletePost = async (postId: number) => {
    setloadDeletePost(true)
    try {
      const favoriteDelete = favorites.filter(
        favorite => favorite !== postId.toString()
      )
      await AsyncStorage.setItem('favorites', JSON.stringify(favoriteDelete))
      setPosts(posts!.filter(({ id }) => id !== postId))
    } catch (error) {
      console.log(error)
    } finally {
      setloadDeletePost(false)
    }
  }

  const deleteAllPosts = () => {
    setLoadDeleteAllPosts(true)
    setTimeout(() => {
      setPosts([])
      setLoadDeleteAllPosts(false)
    }, 1500)
  }

  const deleteIOSButton = () => (
    <TouchableOpacity
      onPress={deleteAllPosts}
      style={styles.deleteIOSButton}
      disabled={loadDeleteAllPosts}
    >
      {!loadDeleteAllPosts ? (
        <Text style={styles.deleteIOSText}>Delete All</Text>
      ) : (
        <ActivityIndicator size="small" color={colors.white} />
      )}
    </TouchableOpacity>
  )

  const deleteAndroidButton = () => (
    <TouchableOpacity
      onPress={deleteAllPosts}
      style={styles.deleteAndroidButton}
    >
      {!loadDeleteAllPosts ? (
        <Icon name="trash" size={30} color={colors.white} />
      ) : (
        <ActivityIndicator size="small" color={colors.white} />
      )}
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <AnimatedLoader
        visible={reload || loadPosts}
        overlayColor="rgba(255,255,255,0.75)"
        source={require('../assets/loties/8428-loader.json')}
        animationStyle={styles.lottie}
        speed={3}
        loop
      >
        <Text>Loading...</Text>
      </AnimatedLoader>
      <AnimatedLoader
        visible={loadDeleteAllPosts}
        overlayColor="rgba(255,255,255,0.75)"
        source={require('../assets/loties/7502-delete.json')}
        animationStyle={styles.lottie}
        speed={2}
        loop
      >
        <Text>Removing...</Text>
      </AnimatedLoader>
      <FlatList
        keyExtractor={({ id }) => `${id}`}
        data={route.name === 'All' ? posts : favoritePosts}
        renderItem={({ item: post, index }) => (
          <PostItem
            deletePost={deletePost}
            index={index}
            loadDeletePost={loadDeletePost}
            onOpacityPress={onOpacityPress}
            post={post}
            reads={reads}
          />
        )}
        testID="posts"
      />
      {Platform.OS === 'android' ? deleteAndroidButton() : deleteIOSButton()}
    </View>
  )
}

export default PostsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  deleteIOSButton: {
    alignItems: 'center',
    backgroundColor: colors.red,
    height: 50,
    justifyContent: 'center'
  },
  deleteIOSText: {
    color: colors.white,
    fontSize: 18
  },
  deleteAndroidButton: {
    alignItems: 'center',
    backgroundColor: colors.red,
    borderRadius: 100,
    bottom: 20,
    elevation: 5,
    height: 65,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    width: 65
  },
  lottie: {
    width: 300,
    height: 300
  }
})
