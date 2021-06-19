import React from 'react'
import { render } from '@testing-library/react-native'

import App from '../App'

describe('Screen 1', () => {
  it('navigates on button press', () => {
    const { getByTestId, toJSON } = render(<App />)
    expect(getByTestId('cotainer')).toBeDefined()
    expect(toJSON()).toMatchSnapshot()
  })
})
