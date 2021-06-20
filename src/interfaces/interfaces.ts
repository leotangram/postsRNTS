import { StackScreenProps } from '@react-navigation/stack'

export type RootStackParams = {
  Posts: undefined
  Post: IPost
}

export interface IPostsScreenProps extends StackScreenProps<any, any> {}

export interface IPostScreenProps
  extends StackScreenProps<RootStackParams, 'Post'> {}

export interface IPostItemProps {
  index: number
  post: IPost
  reads: string[]
  deletePost: (postId: number) => void
  onOpacityPress: (post: IPost) => void
}

export interface IPost {
  body: string
  id: number
  title: string
  userId: number
}

export interface IUser {
  id: number
  email: string
  name: string
  phone: string
  website: string
}

export interface IComment {
  id: string
  body: string
}

export interface IPostsState {
  favorites: string[]
  posts: IPost[]
  reads: string[]
}

export interface IPostsContextProps {
  postsState: IPostsState
  reload: boolean
  getFavorites: () => void
  getPosts: () => void
  getReads: () => void
  setPosts: (posts: IPost[]) => void
  resetPosts: () => void
}
