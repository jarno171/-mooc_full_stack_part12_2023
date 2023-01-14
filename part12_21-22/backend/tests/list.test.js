const listHelper = require('../utils/list_helper')

// arrays for testing
const listOfBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'Of being a Leevi',
    author: 'Leevi L. Leevinen',
    url: 'www.leevi.com',
    likes: 5000
  },
  {
    title: 'Testblog 123',
    author: 'Leevi L. Leevinen',
    url: 'https://www.dbdas.com/=SA?Zvcxcb432&¤/&#"',
    likes: 50000
  }
]

const secondListOfBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'Go To Statement Considered Not so harmuful (second revision)',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/hello.html',
    likes: 45321
  },
  {
    title: 'Of being a Leevi',
    author: 'Leevi L. Leevinen',
    url: 'www.leevi.com',
    likes: 5000
  },
  {
    title: 'Testblog 123',
    author: 'Leevi L. Leevinen',
    url: 'https://www.dbdas.com/=SA?Zvcxcb432&¤/&#"',
    likes: 50000
  }
]

const oneBlog = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

const emptyListOfBlogs = [
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  
  test('sum of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyListOfBlogs)
    expect(result).toBe(0)
  })

  test('likes of one blog equal the likes of that blog', () => {
    const result = listHelper.totalLikes(oneBlog)
    expect(result).toBe(5)
  })

  test('sum of likes of bloglist equal to the sum of the likes', () => {
    const result = listHelper.totalLikes(listOfBlogs)
    expect(result).toBe(55005)
  })
})

describe('favorite blog', () => {
  
  test('favorite blog of empty list is empty', () => {
    const result = listHelper.favoriteBlog(emptyListOfBlogs)
    expect(result).toEqual({ })
  })

  test('favorite blog of one blog is that blog', () => {
    const result = listHelper.favoriteBlog(oneBlog)
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5
     })
  })

  test('favorite blog from a list of blogs', () => {
    const result = listHelper.favoriteBlog(listOfBlogs)
    expect(result).toEqual({
      title: 'Testblog 123',
      author: 'Leevi L. Leevinen',
      url: 'https://www.dbdas.com/=SA?Zvcxcb432&¤/&#"',
      likes: 50000
    })
  })
})

describe("most blogs", () => {

  test('empty blogs returns empty object', () => {
    const result = listHelper.mostBlogs(emptyListOfBlogs)
    expect(result).toEqual( {} )
  })
  
  test('one blog returns the top author with one blog', () => {
    const result = listHelper.mostBlogs(oneBlog)
    expect(result).toEqual( {
      author: "Edsger W. Dijkstra",
      blogs: 1
    } )
  })
  
  test('many blogs returns the top author, with combined amount of all blogs', () => {
    const result = listHelper.mostBlogs(listOfBlogs)
    expect(result).toEqual( {
      author: "Leevi L. Leevinen",
      blogs: 2
    } )
  })

  test('if two authors have the same amount of blogs', () => {
    const result = listHelper.mostBlogs(secondListOfBlogs)
    expect(result).toEqual( {
      author: "Leevi L. Leevinen",
      blogs: 2
    } )
  })
})

describe('most likes', () => {

  test('empty bloglist should return empty object', () => {
    const result = listHelper.mostLikes(emptyListOfBlogs)
    expect(result).toEqual( { } )
  })

  test('bloglist of one author/blog should return that blogs likes', () => {
    const result = listHelper.mostLikes(oneBlog)
    expect(result).toEqual( { 
      author: 'Edsger W. Dijkstra',
      likes: 5
    } )
  })

  test('most likes of multiple blogs', () => {
    const result = listHelper.mostLikes(listOfBlogs)
    expect(result).toEqual( { 
      author: 'Leevi L. Leevinen',
      likes: 55000
    } )
  })
})