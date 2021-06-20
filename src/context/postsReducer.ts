import { IPostsState } from '../interfaces/interfaces'
import { TPostsAction } from '../components/types/types'

export const postsReducer = (
  state: IPostsState,
  action: TPostsAction
): IPostsState => {
  switch (action.type) {
    case 'posts':
      return {
        ...state
      }

    default:
      return state
  }
}
