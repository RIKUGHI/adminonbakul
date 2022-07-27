import Outlets from '../Outlets'
import './OutletsList.scss'

export default function OutletsList(props) {
  return(
    <div className="date-list-container">
      <span className="date skeleton1">
        <span>2021-01-01</span>
        <i className="fas fa-calendar-week"></i>
      </span>
      {/* <Outlets list={props.list} /> */}
    </div>
  )
}

