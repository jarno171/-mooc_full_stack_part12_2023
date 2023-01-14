import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Todo from './Todo'

describe('<Todo />', () => {
  test('renders content', () => {

    const todo = {
      text: "test todo",
      done: false
    }

    const mockHandlerDelete = jest.fn()
    const mockHandlerComplete = jest.fn()

    render(<Todo todo={todo} onClickDelete={mockHandlerDelete} onClickComplete={mockHandlerComplete} />)

    const element = screen.getByText('test todo')
    expect(element).toBeDefined()
  })
})