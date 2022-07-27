import { Link } from 'react-router-dom'
import './Pagination.scss'

export default function Pagination() {
  return(
    <div className="pagination-container">
      <Link to="#">
        <i className="fas fa-angle-left"></i>
      </Link>
      <Link to="#"className="active" >1</Link>
      <Link to="#">2</Link>
      <Link to="#">3</Link>
      <Link to="#">4</Link>
      <Link to="#">5</Link>
      <Link to="#">
        <i className="fas fa-angle-right"></i>
      </Link>
    </div>
  )
}