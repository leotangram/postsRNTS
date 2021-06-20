import React, { createContext, FC, useReducer } from 'react'
import { IPostsState, IPostsContextProps } from '../interfaces/interfaces'
import { postsReducer } from './postsReducer'

export const postsInitialState: IPostsState = {
  posts: null
}

export const PostsContext = createContext({} as IPostsContextProps)

export const PostsProvider: FC = ({ children }) => {
  const [postsState, dispatch] = useReducer(postsReducer, postsInitialState)

  return (
    <PostsContext.Provider value={{ postsState }}>
      {children}
    </PostsContext.Provider>
  )
}
