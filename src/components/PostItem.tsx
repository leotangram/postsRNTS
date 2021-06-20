import React, { FC, useContext } from 'react'
import {
  ActivityIndicator,
  Animated,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import { IPostItemProps } from '../interfaces/interfaces'
import { colors } from '../theme/appTheme'
import { PostsContext } from '../context/PostsContext'

const PostItem: FC<IPostItemProps> = ({
  deletePost,
  loadDeletePost,
  index,
  onOpacityPress,
  post,
  reads
}) => {
  const {
    postsState: { favorites }
  } = useContext(PostsContext)

  const swipeLeft = (_: any, dragX: Animated.AnimatedInterpolation) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    })
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => deletePost(post.id)}
        style={styles.deleteBox}
        disabled={loadDeletePost}
      >
        {!loadDeletePost ? (
          <Animated.Text
            style={{ ...styles.deleteText, transform: [{ scale }] }}
          >
            Delete
          </Animated.Text>
        ) : (
          <ActivityIndicator size="small" color={colors.white} />
        )}
      </TouchableOpacity>
    )
  }

  return (
    <Swipeable renderLeftActions={swipeLeft}>
      <TouchableOpacity
        onPress={() => onOpacityPress(post)}
        style={styles.row}
        testID={post.id.toString()}
        disabled={loadDeletePost}
      >
        <View style={styles.iconLeft}>
          {index < 20 && !reads.includes(post.id.toString()) && (
            <Icon name="ellipse" size={23} color={colors.blue} />
          )}
          {Platform.OS === 'ios' && favorites.includes(post.id.toString()) && (
            <Icon name="star" size={23} color={colors.yellow} />
          )}
        </View>
        <Text style={styles.postTitle}>{post.title}</Text>
        <View style={styles.iconRight}>
          {Platform.OS === 'ios' && (
            <Icon name="chevron-forward" size={23} color={colors.gray} />
          )}
          {Platform.OS === 'android' &&
            favorites.includes(post.id.toString()) && (
              <Icon name="star" size={23} color={colors.yellow} />
            )}
        </View>
      </TouchableOpacity>
    </Swipeable>
  )
}

export default PostItem

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
  },
  deleteBox: {
    alignItems: 'center',
    backgroundColor: colors.red,
    height: 'auto',
    justifyContent: 'center',
    width: 100
  },
  deleteText: {
    color: colors.white,
    fontSize: 25
  }
})
