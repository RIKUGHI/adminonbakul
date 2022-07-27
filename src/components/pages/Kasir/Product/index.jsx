import { NoData, Pagination } from '../../..'
import Head from '../Head'
import ProductCard from '../ProductCard'
import './Product.scss'

export default function Product() {
  return(
    <div className="product-container">
      <Head />
      <div className="product-card-container data">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        {/* <NoData /> */}
      </div>
        <Pagination />
    </div>
  )
}