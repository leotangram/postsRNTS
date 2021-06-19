import { StackScreenProps } from '@react-navigation/stack'

export interface IPostsScreenProps extends StackScreenProps<any, any> {}

export interface IPost {
  body: string
  id: number
  title: string
  userId: number
}
