import { IPostsState } from '../interfaces/interfaces'
import { TPostsAction } from '../types/types'

export const postsReducer = (
  state: IPostsState,
  action: TPostsAction
): IPostsState => {
  switch (action.type) {
    case 'favorites':
      return {
        ...state,
        favorites: action.payload
      }
    case 'posts':
      return {
        ...state,
        posts: action.payload
      }
    case 'reads':
      return {
        ...state,
        reads: action.payload
      }

    default:
      return state
  }
}
