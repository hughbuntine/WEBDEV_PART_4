const dummy = (blogs) => {
    return 1;
  }

const totalLikes = (blogs) => {
    return blogs.reduce((acc, blog) => acc + blog.likes, 0);
    }

const favouriteBlog = (blogs) => {
    return blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current);
    }
  
  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
  }