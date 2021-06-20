import React, { createContext, FC, useReducer } from 'react'
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

  const setPosts = (posts: IPost[] | null) =>
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
    try {
      await AsyncStorage.removeItem('posts')
      await AsyncStorage.removeItem('favorites')
      await AsyncStorage.removeItem('reads')
      getPosts()
      setReads([])
      setFavorites([])
    } catch (error) {
      console.log(error)
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
        resetPosts
      }}
    >
      {children}
    </PostsContext.Provider>
  )
}
