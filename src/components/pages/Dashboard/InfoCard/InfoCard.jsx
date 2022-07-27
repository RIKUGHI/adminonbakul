import './InfoCard.scss'

export default function InfoCard(props) {
  return(
    <div className={`info-card${props.isLoading ? ' skeleton' : ''}`}>
      <div className="wrapper-content">
        <div className={`icon ${props.icon}`}></div>
        <div className="info">
          <span className="val">{props.val}</span>
          <span className="title">{props.title}</span>
        </div>
      </div>
      {/* <button>Lihat Detail</button> */}
    </div>
  )
}