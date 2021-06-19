import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
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

  test('should go to <PostScreen /> to show details', async () => {
    const component = (
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    )

    const { findByTestId, findByText, toJSON } = render(component)
    const toPress = await findByTestId('1')

    fireEvent(toPress, 'press')
    const descriptionHead = await findByText('Description')
    const userHead = await findByText('User')
    const commentsHead = await findByText('Comments')

    await waitFor(() => {
      expect(descriptionHead).toBeTruthy()
      expect(userHead).toBeTruthy()
      expect(commentsHead).toBeTruthy()
    })
    expect(toJSON()).toMatchSnapshot()
  })
})
