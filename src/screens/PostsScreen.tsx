import React, { FC, useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { IPostsScreenProps, IPost } from '../interfaces/interfaces'
import { jsonPlaceHolderServices } from '../services/jsonPlaceHolderServices'
import { colors } from '../theme/appTheme'

const PostsScreen: FC<IPostsScreenProps> = ({ navigation }) => {
  const [posts, setPosts] = useState<IPost[] | null>(null)

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await jsonPlaceHolderServices.getPosts()
        setPosts(data)
      } catch (error) {
        console.log('error', error)
      }
    }
    getPosts()
  }, [])

  const onOpacityPress = (post: any) => navigation.navigate('Post', post)

  return (
    <View>
      {posts && (
        <FlatList
          keyExtractor={({ id }) => `${id}`}
          data={posts}
          renderItem={({ item: post }) => (
            <TouchableOpacity
              onPress={() => onOpacityPress(post)}
              style={styles.row}
            >
              <Text style={styles.postTitle}>{post.title}</Text>
            </TouchableOpacity>
          )}
          testID="posts"
        />
      )}
    </View>
  )
}

export default PostsScreen

const styles = StyleSheet.create({
  row: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderBottomColor: colors.divider,
    borderBottomWidth: 1
  },
  postTitle: {
    fontSize: 20
  }
})
