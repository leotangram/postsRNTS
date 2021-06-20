import React, { FC, useEffect, useState } from 'react'
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/Ionicons'

import { jsonPlaceHolderServices } from '../services/jsonPlaceHolderServices'
import { colors } from '../theme/appTheme'
import { IPostsScreenProps, IPost } from '../interfaces/interfaces'
import PostItem from '../components/PostItem'

const PostsScreen: FC<IPostsScreenProps> = ({ navigation }) => {
  const [posts, setPosts] = useState<IPost[] | null>(null)
  const [reads, setReads] = useState<string[]>([])

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

    const getPosts = async () => {
      try {
        const { data } = await jsonPlaceHolderServices.getPosts()
        setPosts(data)
      } catch (error) {
        console.log('error', error)
      }
    }
  }, [])

  useEffect(() => {
    if (posts) {
      getReads()
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

  const getReads = async () => {
    const storagedReads: string | null = await AsyncStorage.getItem('favorites')
    if (storagedReads) {
      const stringToArrayFavorites = JSON.parse(storagedReads)
      setReads([...stringToArrayFavorites])
    }
  }

  const onOpacityPress = async (post: IPost) => {
    const postId = post.id.toString()
    let stringifiedReads
    if (reads.includes(postId)) {
      const removedPostId = reads.filter(read => read !== postId)
      stringifiedReads = JSON.stringify([...removedPostId])
    } else {
      stringifiedReads = JSON.stringify([...reads, postId])
    }

    try {
      await AsyncStorage.setItem('favorites', stringifiedReads)
      getReads()
    } catch (error) {
      console.log(error)
    }
    navigation.navigate('Post', { ...post })
  }

  const deletePost = (postId: number) => {
    setPosts(posts!.filter(({ id }) => id !== postId))
  }

  const deleteAllPosts = () => {
    setPosts(null)
  }

  const deleteIOSButton = () => (
    <TouchableOpacity onPress={deleteAllPosts} style={styles.deleteIOSButton}>
      <Text style={styles.deleteIOSText}>Delete All</Text>
    </TouchableOpacity>
  )

  const deleteAndroidButton = () => (
    <TouchableOpacity
      onPress={deleteAllPosts}
      style={styles.deleteAndroidButton}
    >
      <Icon name="trash" size={30} color={colors.white} />
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      {posts && (
        <>
          <FlatList
            keyExtractor={({ id }) => `${id}`}
            data={posts}
            renderItem={({ item: post, index }) => (
              <PostItem
                deletePost={deletePost}
                index={index}
                onOpacityPress={onOpacityPress}
                post={post}
                reads={reads}
              />
            )}
            testID="posts"
          />
          {Platform.OS === 'android'
            ? deleteAndroidButton()
            : deleteIOSButton()}
        </>
      )}
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
  }
})
