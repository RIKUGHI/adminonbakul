import { useEffect, useState } from 'react'
import { Outlets } from '../..'
import { GlobalConsumer } from '../../../context'
import './Header.scss'

const Header = (props) => {
  const [cart, setCart] = useState(false)
  const [outlets, setOutlets] = useState(false)

  useEffect(() => {
    const currentUrl = window.location.pathname
    const path = ['/produk', '/satuan', '/kategori', '/pelanggan', '/supplier', '/riwayat-transaksi']

    // if user reload kasir page
    currentUrl === '/kasir' && window.innerWidth <= 1000 ? setCart(true) : setCart(false)

    path.includes(currentUrl) ? setOutlets(true) : setOutlets(false) 

    document.body.onresize = e => {
      window.location.pathname === '/kasir' && window.innerWidth <= 1000 ? setCart(true) : setCart(false)
    }
  }, [])

  const handleToggle = () => {
    const mainContainer = document.querySelector('main')
    const sideBar = document.querySelector('.side-bar')
    const menuToggle = document.querySelector('.menu-toggle')

    if (window.innerWidth > 768){
      mainContainer.classList.toggle('open')
      menuToggle.classList.toggle('active')
    }
    sideBar.classList.toggle('active')
  }

  const handleToogleCart = () => {
    const billingContainer = document.querySelector('.billing-container')
    
    billingContainer.classList.add('active')
  }

  return(
    <header>
      <div className="wrapper-title">
        <MenuToggle handleToggle={handleToggle} />
        <h2 className="title">{props.title}</h2>
      </div>
      <div className="wrapper-icons">
        {/* <button className="fas fa-expand"></button> */}
        {/* <button className="fas fa-bell">
          <span>!</span> */}
          {/* <div className="notif-container">
            <h3>Notifikasi</h3>
            <div className="notif-card">
              <p>Produk <strong>Luwak Black Coffe</strong> Tersisa <strong>10</strong> pack</p>
              <p>Silahkan lakukan restock</p>
            </div>
          </div> */}
        {/* </button> */}
        {cart && (
          <button className="fas fa-shopping-cart" onClick={handleToogleCart}>
            <span>!</span>
          </button>
        )}
      {/* {outlets && (
        <Outlets list={['Semua']} />
      )} */}
      </div>
    </header>
  )
}

export default GlobalConsumer(Header)

const MenuToggle = (props) => {
  return(
    <div className="menu-toggle" onClick={props.handleToggle}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}