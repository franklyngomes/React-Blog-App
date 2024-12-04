import React from 'react'
import { useParams } from 'react-router-dom'

const BlogDetails = () => {
  let {id} = useParams();
  console.log(id, "id")
  return (
    <div>
      {id === }
    </div>
  )
}

export default BlogDetails