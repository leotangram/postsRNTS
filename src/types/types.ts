import { IPost } from '../interfaces/interfaces'
export type TPostsAction =
  | { type: 'favorites'; payload: string[] }
  | { type: 'posts'; payload: IPost[] }
  | { type: 'reads'; payload: string[] }
