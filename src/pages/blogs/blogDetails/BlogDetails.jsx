import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'

const BlogDetails = () => {
  let {id} = useParams();
  console.log(id, "id")
  const fetchData = async () => {
    
  }
  useEffect(() => {
  },[])
  return (
    <div>
      {id === }
    </div>
  )
}

export default BlogDetails