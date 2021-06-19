import api from './api'
import urls from './urls'

export const jsonPlaceHolderServices = {
  getPosts: () => {
    const url = urls.posts()
    return api.get(url)
  },
  getUser: (id: number) => {
    const url = urls.user(id)
    return api.get(url)
  },
  getCommentsPost: (postId: number) => {
    const url = urls.commentsPost(postId)
    return api.get(url)
  }
}
