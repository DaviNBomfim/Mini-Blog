import React from 'react'
import { Link } from 'react-router-dom'

//css
import styles from './search.module.css'


//hooks
import {useFetchDocuments} from '../../Hooks/useFetchDocuments'
import {useQuery} from '../../Hooks/useQuery'

//components
import PostDetail from '../../Components/PostDetail'


const search = () => {
    const query = useQuery()
    const search = query.get("q")
    const {documents: posts} = useFetchDocuments("posts", search)
  return (
    <div className={styles.search}>

      <h2>Busca</h2>
      <div>
        {posts && posts.length === 0 && (
            <div className={styles.noposts}>
                <p>Não foram encontrados resultados para a busca "{search}"</p>
                <Link to="/" className='btn btn-dark'>Voltar</Link>
            </div>   
        )}


        {posts && posts.map((post) => (<PostDetail key={post.id} post={post} />))}    
      </div>
    </div>
  )
}

export default search
