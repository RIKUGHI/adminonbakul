// component
import { MainLayout } from "../..";
import Billing from "./Billing";

// style
import './Kasir.scss'
import Product from "./Product";

export default function Kasir() {
  return(
    <MainLayout title="Kasir">
      <div className="cashier-container">
        <Product />
        <Billing />
      </div>
    </MainLayout>
  )
}