import React, { FC, useEffect, useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import { IPostScreenProps, IUser } from '../interfaces/interfaces'
import { jsonPlaceHolderServices } from '../services/jsonPlaceHolderServices'

const PostScreen: FC<IPostScreenProps> = ({ route }) => {
  const [user, setUser] = useState<IUser | null>(null)

  const { body, userId } = route.params

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

  return (
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
  description: {
    fontSize: 15,
    marginBottom: 16,
    textAlign: 'justify'
  }
})
