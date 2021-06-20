import React, { createContext, FC, useReducer, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  IPostsState,
  IPostsContextProps,
  IPost
} from '../interfaces/interfaces'
import { postsReducer } from './postsReducer'
import { jsonPlaceHolderServices } from '../services/jsonPlaceHolderServices'

export const postsInitialState: IPostsState = {
  favorites: [],
  posts: [],
  reads: []
}

export const PostsContext = createContext({} as IPostsContextProps)

export const PostsProvider: FC = ({ children }) => {
  const [postsState, dispatch] = useReducer(postsReducer, postsInitialState)
  const [loadPosts, setLoadPosts] = useState(false)
  const [reload, setReload] = useState(false)

  const setFavorites = (favorites: string[]) =>
    dispatch({ type: 'favorites', payload: favorites })

  const getFavorites = async () => {
    const storagedFavorites: string | null = await AsyncStorage.getItem(
      'favorites'
    )
    if (storagedFavorites) {
      const stringToArrayFavorites = JSON.parse(storagedFavorites)
      setFavorites([...stringToArrayFavorites])
    }
  }

  const setPosts = (posts: IPost[]) =>
    dispatch({ type: 'posts', payload: posts })

  const getPosts = () => {
    setLoadPosts(true)
    setTimeout(async () => {
      try {
        const { data } = await jsonPlaceHolderServices.getPosts()
        setPosts(data)
      } catch (error) {
        console.log('error', error)
      } finally {
        setLoadPosts(false)
      }
    }, 1500)
  }

  const resetPosts = () => {
    setReload(true)
    setTimeout(async () => {
      try {
        await AsyncStorage.removeItem('posts')
        await AsyncStorage.removeItem('favorites')
        await AsyncStorage.removeItem('reads')
        getPosts()
        setFavorites([])
        setReads([])
      } catch (error) {
        console.log(error)
      } finally {
        setReload(false)
      }
    }, 1000)
  }

  const setReads = (reads: string[]) =>
    dispatch({ type: 'reads', payload: reads })

  const getReads = async () => {
    const storagedReads: string | null = await AsyncStorage.getItem('reads')
    if (storagedReads) {
      const stringToArrayReads = JSON.parse(storagedReads)
      setReads([...stringToArrayReads])
    }
  }

  return (
    <PostsContext.Provider
      value={{
        getFavorites,
        getPosts,
        getReads,
        loadPosts,
        postsState,
        setPosts,
        reload,
        resetPosts
      }}
    >
      {children}
    </PostsContext.Provider>
  )
}
