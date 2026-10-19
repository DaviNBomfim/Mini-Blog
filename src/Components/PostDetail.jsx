import styles from "./PostDetail.module.css"
import { Link } from "react-router-dom"

const PostDetail = ({post}) => {
  const tags = Array.isArray(post.tag) ? post.tag : typeof post.tag === "string" ? post.tag.split(",").map((tag) => tag.trim()).filter(Boolean) : []
  return (
    <div className={styles.post_detail}>
      <img src={post.img} alt={post.titulo} />
      <h2>{post.titulo}</h2>
      <p className={styles.createdby}>{post.createdBy}</p>

      <div className={styles.tags}>
        {tags.map((tag) => 
        (
          <p key={tag}>
            <span>#</span>{tag}
          </p>
        ))}
      </div>

      <Link to={`/posts/${post.id}`} className="btn btn-outline">
        Ler
      </Link>
    </div>
  )
}

export default PostDetail;


