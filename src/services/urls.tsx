const baseUrl = 'https://jsonplaceholder.typicode.com/'

const urls = {
  posts: () => '/posts',
  user: (id: number) => `/users/${id}`
}

export default urls
