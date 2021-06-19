import React from 'react'
import { render } from '@testing-library/react-native'

import App from '../App'

describe('<App />', () => {
  test('should render correctly', () => {
    const { getByTestId, toJSON } = render(<App />)
    expect(getByTestId('cotainer')).toBeDefined()
    expect(toJSON()).toMatchSnapshot()
  })
})
