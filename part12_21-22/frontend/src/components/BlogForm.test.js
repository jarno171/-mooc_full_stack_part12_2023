import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('<Blogform>', () => {
  test('updates parent state and calls onSubmit', async () => {
    const handleAddNewBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm handleAddNewBlog={handleAddNewBlog} />)

    const inputs = screen.queryAllByRole('textbox')

    const sendButton = screen.getByText('add')

    await user.type(inputs[0], 'testiblogi')
    await user.type(inputs[1], 'testaaja')
    await user.type(inputs[2], 'www.testi.com')
    await user.click(sendButton)

    expect(handleAddNewBlog.mock.calls).toHaveLength(1)
    expect(handleAddNewBlog.mock.calls[0][0]).toBe('testiblogi')
    expect(handleAddNewBlog.mock.calls[0][1]).toBe('testaaja')
    expect(handleAddNewBlog.mock.calls[0][2]).toBe('www.testi.com')
  })
})