import React, { FC, useEffect, useState } from 'react'
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { jsonPlaceHolderServices } from '../services/jsonPlaceHolderServices'
import { colors } from '../theme/appTheme'
import { IPostsScreenProps, IPost } from '../interfaces/interfaces'

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

  const onOpacityPress = (post: any) => navigation.navigate('Post', { ...post })

  return (
    <View>
      {posts && (
        <FlatList
          keyExtractor={({ id }) => `${id}`}
          data={posts}
          renderItem={({ item: post, index }) => (
            <TouchableOpacity
              onPress={() => onOpacityPress(post)}
              style={styles.row}
              testID={post.id.toString()}
            >
              <View style={styles.iconLeft}>
                {index < 20 && (
                  <Icon name="ellipse" size={23} color={colors.blue} />
                )}
              </View>
              <Text style={styles.postTitle}>{post.title}</Text>
              <View style={styles.iconRight}>
                {Platform.OS === 'ios' && (
                  <Icon name="chevron-forward" size={23} color={colors.gray} />
                )}
              </View>
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
    alignItems: 'center',
    backgroundColor: colors.white,
    borderBottomColor: colors.divider,
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  iconLeft: {
    marginRight: 10,
    width: 25
  },
  postTitle: {
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 20
  },
  iconRight: {
    marginLeft: 10,
    width: 25
  }
})
