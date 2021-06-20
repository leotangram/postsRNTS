import React, { FC } from 'react'
import {
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

const PostItem: FC<IPostItemProps> = ({
  deletePost,
  index,
  onOpacityPress,
  post,
  reads
}) => {
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
      >
        <Animated.Text style={{ ...styles.deleteText, transform: [{ scale }] }}>
          Delete
        </Animated.Text>
      </TouchableOpacity>
    )
  }

  return (
    <Swipeable renderLeftActions={swipeLeft}>
      <TouchableOpacity
        onPress={() => onOpacityPress(post)}
        style={styles.row}
        testID={post.id.toString()}
      >
        <View style={styles.iconLeft}>
          {index < 20 && !reads.includes(post.id.toString()) && (
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
