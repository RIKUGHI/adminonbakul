import './TripleButtons.scss'

export default function TripleButtons({onShowDetail,onShowSuspend}) {
  return(
    <div className="action-triple-btns">
      <button className="fas fa-eye" onClick={onShowDetail} ></button>
      <button className="fas fa-user-lock" onClick={onShowSuspend}></button>
    </div>
  )
}