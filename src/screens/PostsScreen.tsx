import React, { FC } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface PostsScreenProps extends StackScreenProps<any, any> {}

const PostsScreen: FC<PostsScreenProps> = ({ navigation }) => {
  const [items] = React.useState(
    new Array(20).fill(null).map((_, idx) => idx + 1)
  )

  const onOpacityPress = (item: any) => navigation.navigate('Post', item)

  return (
    <View>
      <Text style={styles.header}>List of numbers from 1 to 20</Text>
      <FlatList
        keyExtractor={(_, idx) => `${idx}`}
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onOpacityPress(item)}
            style={styles.row}
          >
            <Text>Item number {item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default PostsScreen

const divider = '#DDDDDD'

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 16
  },
  row: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomColor: divider,
    borderBottomWidth: 1
  }
})
