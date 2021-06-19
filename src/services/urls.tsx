const baseUrl = 'https://jsonplaceholder.typicode.com/'

const urls = {
  posts: () => '/posts',
  user: (id: number) => `/users/${id}`,
  commentsPost: (postId: number) => `/comments?postId=${postId}`
}

export default urls
