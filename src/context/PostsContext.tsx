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

  const getPosts = async () => {
    try {
      const { data } = await jsonPlaceHolderServices.getPosts()
      setPosts(data)
    } catch (error) {
      console.log('error', error)
    }
  }

  const resetPosts = async () => {
    setReload(true)
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
