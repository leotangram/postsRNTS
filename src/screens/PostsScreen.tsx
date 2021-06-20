import React, { FC, useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { jsonPlaceHolderServices } from '../services/jsonPlaceHolderServices'
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

  return (
    <View>
      {posts && (
        <FlatList
          keyExtractor={({ id }) => `${id}`}
          data={posts}
          renderItem={({ item: post, index }) => (
            <PostItem
              index={index}
              onOpacityPress={onOpacityPress}
              post={post}
              reads={reads}
            />
          )}
          testID="posts"
        />
      )}
    </View>
  )
}

export default PostsScreen
