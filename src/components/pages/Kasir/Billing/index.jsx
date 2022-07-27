import { useState } from 'react'
import { Modal } from '../../..'
import ItemProduct from '../ItemProduct'
import SimpleGroup from '../SimpleGroup'
import './Billing.scss'

export default function Billing() {
  // modal product variant
  const [showVariant, setShowVariant] = useState(true)

  const handleShowVariant = () => setShowVariant(true)
  const handleCloseVariant = () => setShowVariant(false)

  // modal success transaction
  const [showSuccess, setShowSuccess] = useState(false)

  const handleShowSuccess = () => setShowSuccess(true)
  const handleCloseSuccess = () => setShowSuccess(false)

  const handleBgBill = () => {
    const billingContainer = document.querySelector('.billing-container')
    
    billingContainer.classList.remove('active')
  }
  
  return(
    <>
      <div className="billing-container">
        <div className="wrapper-head-bill">
          <span className="title">Tagihan</span>
          <button className="fas fa-times" onClick={handleBgBill}></button>
        </div>
        <div className="product-list">
          {/* <img src="http://localhost:3000/assets/images/empty_cart.svg" alt="" /> */}
          <ItemProduct price="20000" />
          <ItemProduct price="1000" />
          {/* <ItemProduct price="22000" /> */}
          {/* <ItemProduct price="25000" /> */}
        </div>
        <div className="result-container">
          <SimpleGroup title="Total">
            <span className="value">Rp. 100.000.000.000</span>
          </SimpleGroup>
          <SimpleGroup title="Pembeli">
            <button>
              <span>Umum</span>
              <i className="fas fa-caret-down"></i>
            </button>
          </SimpleGroup>
          <div className="payment-method">
            <span>Cara Bayar</span>
            <div className="methods">
              <div className="card-method active">
                <i className="fas fa-money-bill-wave"></i>
                <span>Cash</span>
              </div>
              <div className="card-method">
                <i className="fas fa-qrcode"></i>
                <span>E-Wallet</span>
              </div>
            </div>
          </div>
          <SimpleGroup title="Bayar">
            <input type="text" placeholder="Masukan Uang Bayar" />
          </SimpleGroup>
          <SimpleGroup title="Kembali">
            <span className="value hutang">Rp. 100.000.000.000</span>
          </SimpleGroup>
          <button className="btn-print">Bayar</button>
        </div>
      </div>
      <div className="tmp-bg-bill" onClick={handleBgBill}></div>

      {/* modal product variant */}
      <Modal title="Detail Produk" show={showVariant} onHide={handleCloseVariant}>
        <Modal.Body>
          <Modal.Body.DetailProduct>
            <Modal.Body.DetailProduct.Head>
              <Modal.Body.DetailProduct.Head.ItemData name="Nama" value="es" />
              <Modal.Body.DetailProduct.Head.ItemData name="Barcode" value="es" />
              <Modal.Body.DetailProduct.Head.ItemData name="Kategori" value="es" />
              <Modal.Body.DetailProduct.Head.ItemData name="Harga Jual" value="es" />
              <Modal.Body.DetailProduct.Head.ItemData name="Harga Modal" value="es" />
            </Modal.Body.DetailProduct.Head>
            <Modal.Body.DetailProduct.Unit unit="Pcs" stock="10" stockMin="2" />
          </Modal.Body.DetailProduct>
          <Modal.Body.Variant>
            <Modal.Body.Variant.Item />
          </Modal.Body.Variant>
        </Modal.Body>
        <Modal.Footer>
          <button type="reset">Batal</button>
        </Modal.Footer>
      </Modal>

      {/* modal success transcaction */}
      <Modal.Center show={showSuccess} onHide={handleCloseSuccess}>
        <img src="http://localhost:3000/assets/images/success.svg" alt="" />
        <Modal.Center.Success />
        <Modal.Center.Footer>
          <button>Tutup</button>
          <button>Cetak Struk</button>
        </Modal.Center.Footer>
      </Modal.Center>
    </>
  )
}