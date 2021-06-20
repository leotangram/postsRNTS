import 'react-native-gesture-handler'
import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import { colors } from './src/theme/appTheme'
import StackNavigation from './src/navigation/StackNavigation'
import { PostsProvider } from './src/context/PostsContext'

const App = () => {
  return (
    <PostsProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.primary
        }}
        testID="cotainer"
      >
        <StatusBar animated={true} backgroundColor={colors.darkPrimary} />
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      </SafeAreaView>
    </PostsProvider>
  )
}

export default App
