import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { render, waitFor } from '@testing-library/react-native'
import StackNavigation from '../../src/navigation/StackNavigation'

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

describe('<StackNavigation />', () => {
  test('should show posts in <PostsScreen />', async () => {
    const component = (
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    )

    const { queryByTestId, toJSON } = render(component)

    await waitFor(() => expect(queryByTestId('posts')).toBeTruthy())
    expect(toJSON()).toMatchSnapshot()
  })
})
