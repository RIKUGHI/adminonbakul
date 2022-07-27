import { useEffect, useRef, useState } from 'react'
import './ItemProduct.scss'

export default function ItemProduct(props) {
  const [qty, setQty] = useState(1)
  const subTotal = parseInt(props.price)
  const btnMinus = useRef(null)
  const btnPlus = useRef(null)

  const lol = () => {
    console.log('lol');
  }

  useEffect(() => {
    btnPlus.current.onclick = () => {
      setQty(qty + 1)
      btnMinus.current.classList.remove('disable')
    }

    btnMinus.current.onclick = e => {
      if (qty !== 1) {
        setQty(qty - 1)
      }
  
      if (qty <= 2) {
        setQty(1)
        e.target.classList.add('disable')
      }
    }
  })

  return(
    <div className="item-product">
      <span className="name">Kopi Kapal Api</span>
      <div className="wrapper-act">
        <div className="qty">
          <button className="fas fa-minus disable" ref={btnMinus}></button>
          <input type="text" value={qty} maxLength="4" onChange={lol} />
          <button className="fas fa-plus" ref={btnPlus}></button>
        </div>
        <span className="sub-total">{qty * subTotal}</span>
      </div>
    </div>
  )
}