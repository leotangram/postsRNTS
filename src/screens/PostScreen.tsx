import React, { FC, useEffect, useState } from 'react'
import { Text, StyleSheet, View, FlatList } from 'react-native'

import { IPostScreenProps, IUser, IComment } from '../interfaces/interfaces'
import { jsonPlaceHolderServices } from '../services/jsonPlaceHolderServices'
import { colors } from '../theme/appTheme'

const PostScreen: FC<IPostScreenProps> = ({ route }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [commentsPost, setCommentsPost] = useState<IComment[] | null>(null)

  const { body, id: postId, userId } = route.params

  useEffect(() => {
    if (userId) {
      const getUser = async () => {
        try {
          const { data } = await jsonPlaceHolderServices.getUser(userId)
          setUser(data)
        } catch (error) {
          console.log('error', error)
        }
      }
      getUser()
    }
    return () => {
      setUser(null)
    }
  }, [userId])

  useEffect(() => {
    if (postId) {
      const getCommentsPost = async () => {
        try {
          const { data } = await jsonPlaceHolderServices.getCommentsPost(postId)
          setCommentsPost(data)
        } catch (error) {
          console.log('error', error)
        }
      }
      getCommentsPost()
    }
  }, [postId])

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.description}>{body}</Text>
        {user && (
          <>
            <Text style={styles.label}>User</Text>
            <Text style={styles.description}>Name: {user.name}</Text>
            <Text style={styles.description}>Email: {user.email}</Text>
            <Text style={styles.description}>Phone: {user.phone}</Text>
            <Text style={styles.description}>Website: {user.website}</Text>
          </>
        )}
      </View>
      {commentsPost && (
        <>
          <Text style={[styles.label, styles.labelBackground]}>Comments</Text>
          <FlatList
            keyExtractor={({ id }) => `${id}`}
            data={commentsPost}
            renderItem={({ item: comment }) => (
              <View style={styles.row}>
                <Text style={styles.comment}>{comment.body}</Text>
              </View>
            )}
            testID="posts"
          />
        </>
      )}
    </>
  )
}

export default PostScreen

const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  label: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16
  },
  labelBackground: {
    backgroundColor: colors.gray,
    paddingHorizontal: 15,
    paddingVertical: 4,
    textTransform: 'uppercase'
  },
  description: {
    fontSize: 15,
    marginBottom: 16,
    textAlign: 'justify'
  },
  row: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderBottomColor: colors.divider,
    borderBottomWidth: 1
  },
  comment: {
    fontSize: 15
  }
})
