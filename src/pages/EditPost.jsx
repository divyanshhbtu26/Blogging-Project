import React , {useEffect , useState} from 'react'
import {Container , PostForm} from "../components"
import appWriteService from "../appWrite/conf"
import { useParams , useNavigate} from 'react-router-dom'

function EditPost() {
    const navigate = useNavigate()
    const [post , setPosts] = useState()
    const {slug} = useParams()
    useEffect(() => {
        if(slug){
            appWriteService.getPost(slug)
            .then((post) => {
                if(post) {
                    setPosts(post)
                }
            })
        }
        else{
            navigate('/')
        }
    },[slug, navigate])

  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ) : (null)
}

export default EditPost
