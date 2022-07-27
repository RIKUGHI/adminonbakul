import './ProductCard.scss'

export default function ProductCard() {
  return(
    <div className="product-card">
      <div className="img-wrapper skeleton1v">
        <img src="assets/images/users/no-product-image.jpg" alt="" />
      </div>
      <div className="content-wrapper">
        <span className="name">Roti Sari</span>
        <span className="price">Rp. 100.000.000.000</span>
      </div>
    </div>
  )
}