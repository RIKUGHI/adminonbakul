import FormSearch from './FormSearch'
import './Head.scss'

export default function Head() {
  return(
    <div className="head">
      <span>Daftar Produk</span>
      <div className="action">
        <button className="photo fas fa-camera"></button>
        <FormSearch className="search hide1" icon="fas fa-search" placeholder="Cari Produk" />
        <FormSearch icon="fas fa-barcode" placeholder="8999999042257" />
      </div>
    </div>
  )
}