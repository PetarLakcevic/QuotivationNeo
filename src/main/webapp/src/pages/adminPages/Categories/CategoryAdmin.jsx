import React,  {useState, useEffect} from 'react'
import { getCategory } from '../../../axios/axios'
import { useParams } from 'react-router-dom'

const CategoryAdmin = () => {
    const [category, setCategory] = useState({})
    const { id } = useParams()
    useEffect(() => {
        getCategory(id)
            .then(response => {
                setCategory(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])
  return (
    <div>CategoryAdmin</div>
  )
}

export default CategoryAdmin