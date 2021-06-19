import React from 'react'
import { Text, StyleSheet, View } from 'react-native'

const PostScreen = (props: any) => {
  const item = Number.parseInt(props.route.params, 10)

  return (
    <View>
      <Text style={styles.header}>Showing details for {item}</Text>
      <Text style={styles.body}>the number you have chosen is {item}</Text>
    </View>
  )
}

export default PostScreen

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 16
  },
  body: {
    textAlign: 'center'
  }
})
