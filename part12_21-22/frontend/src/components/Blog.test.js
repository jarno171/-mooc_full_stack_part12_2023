import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {

  test('renders content', () => {
    const blog = {
      title: 'testiblogi',
      author: 'testaaja',
      url: 'www.testi.com',
      likes: 30
    }

    render(<Blog blog={blog} />)

    screen.getByText('testiblogi')
    screen.getByText('testaaja')

    const urlVisible = screen.queryByText('www.testi.com')
    expect(urlVisible).not.toBeVisible()

    const likesVisible = screen.queryByText('likes 30')
    expect(likesVisible).not.toBeVisible()
  })

  test('clicking the view button shows url and likes of the blog', async () => {
    const blog = {
      title: 'testiblogi',
      author: 'testaaja',
      url: 'www.testi.com',
      likes: 30
    }

    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const urlVisible = screen.getByText('www.testi.com')
    expect(urlVisible).toBeVisible()

    const likesVisible = screen.getByText('likes 30')
    expect(likesVisible).toBeVisible()
  })

  test('clicking the like button means that the event handler receives exactly two calls', async () => {
    const blog = {
      title: 'testiblogi',
      author: 'testaaja',
      url: 'www.testi.com',
      likes: 30
    }

    const mockHandler = jest.fn()

    render(<Blog blog={blog} handleAddLike={mockHandler} />)

    const user = userEvent.setup()
    const buttonView = screen.getByText('view')
    await user.click(buttonView)

    const buttonLike = screen.getByText('like')
    await user.click(buttonLike)
    await user.click(buttonLike)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})