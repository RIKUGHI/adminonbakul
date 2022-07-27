import axios from "axios";
import { useEffect, useState } from "react";
import { FormGroup, FormSearch, Loading, ManagementLayout, Modal, NoData, Notification, TripleButtons } from "../..";
import util from "../../../util";
import './Pengguna.scss';

const getCurrentDateTime = (today, now) => {
  return `${today} ${fixingTime(now.getHours())}:${fixingTime(now.getMinutes())}:${fixingTime(now.getSeconds())}`
}

const fixingTime = (t) => {
  return t.toString().length === 1 ? '0'+t.toString() : t 
}

export default function Pengguna(p) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getData(p.location.search === '' ? '' : p.location.search)
  }, [p.location.search])

  const getData = q => {
    setIsLoading(true)
    axios.get(util.server_url+'accounts'+q)
    .then(r => {
      r.data.result.results !== null ? setData(r.data.result.results) : setData(null)
      setIsLoading(false)
    }).catch(e => console.log(e))
  }

  const submitSearch = e => {
    e.preventDefault()
    p.history.push(`pengguna${e.target[0].value === '' ? '' : `?q=${e.target[0].value}`}`)
  }

  // notification
  const [notification, setNotification] = useState(false)
  
  const handleShowNotif = () => setNotification(true)
  const handleCloseNotif = () => setNotification(false)
  

  // modal detail product
  const [showDetail, setShowDetail] = useState(false)
  const [indexDetail, setIndexDetail] = useState(0)
  // const [showSuspend, setShowSuspend] = useState(false)
  // const [indexSuspend, setIndexSuspend] = useState(0)

  const handleShowDetail = index => {
    setShowDetail(true)

    setIndexDetail(index)
  }
  const handleCloseDetail = () => setShowDetail(false)
  const handleShowSuspend = index =>{
    console.log(index);
  }
  return(
    <>
      <ManagementLayout 
        title="Pengguna"
        onSubmit={submitSearch}>
        {isLoading ? <Loading /> : data === null ? <NoData /> : (
          <table border="0" className="product-table">
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nama Pemilik</th>
                <th>Nama Usaha</th>
                <th>Total Outlet</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => <ItemData 
                              key={d.id_owner}
                              name={d.owner_name}
                              ispro={d.is_pro && (getCurrentDateTime(d.today , new Date()) < d.end ? getCurrentDateTime(d.today , new Date()) : d.end < d.end) ? true : false}
                              bussinessName={d.business_name}
                              totalOutlets={d.outlets.length}
                              handleShowDetail={() => handleShowDetail(i)} 
                              handleShowSuspend={() => handleShowSuspend(d.id_owner)}/>)}
            </tbody>
          </table>
        )}
        
      </ManagementLayout>

      {/* notification */}
      <Notification show={notification} status="warning" onHide={handleCloseNotif} />

      {/* modal detail product */}
      <Modal 
        title={data && (data[indexDetail].is_pro && (getCurrentDateTime(data[indexDetail].today , new Date()) < data[indexDetail].end ? getCurrentDateTime(data[indexDetail].today , new Date()) : data[indexDetail].end < data[indexDetail].end) ? 'Detail Produk - Akun Premium' : 'Detail Produk')} 
        show={showDetail} 
        onHide={handleCloseDetail}>
        {/* <Loading /> */}
        <Modal.Body>
          <Modal.Body.DetailProduct>
            <Modal.Body.DetailProduct.Head>
              <Modal.Body.DetailProduct.Head.ItemData name="Nama Pemilik" value={data && data[indexDetail].owner_name} />
              <Modal.Body.DetailProduct.Head.ItemData name="Nama Usaha" value={data && data[indexDetail].business_name} />
              <Modal.Body.DetailProduct.Head.ItemData name="Total Produk" value={data && data[indexDetail].total_products} />
              <Modal.Body.DetailProduct.Head.ItemData name="Total Outlet" value={data && data[indexDetail].outlets.length} />
              <Modal.Body.DetailProduct.Head.ItemData name="Email" value={data && data[indexDetail].email} />
              <Modal.Body.DetailProduct.Head.ItemData name="Telp" value={data && data[indexDetail].telp} />
              <Modal.Body.DetailProduct.Head.ItemData name="Start Date" value={data && data[indexDetail].start} />
              <Modal.Body.DetailProduct.Head.ItemData name="End Date" value={data && data[indexDetail].end} />
            </Modal.Body.DetailProduct.Head>
          </Modal.Body.DetailProduct>

        </Modal.Body>
        <Modal.Footer>
          <button type="reset">Batal</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

const ItemData = (props) => {
  return(
    <tr>
      <td>
        <div className="img-container">
          <img src="https://source.unsplash.com/100x100/?natureg" alt="" />
          {props.ispro && <i className="fas fa-star"></i>}
        </div>
      </td>
      <td>{props.name}</td>
      <td>{props.bussinessName}</td>
      <td>{props.totalOutlets}</td>
      <td>
        <TripleButtons 
          onShowDetail={props.handleShowDetail}
          onShowSuspend={props.handleShowSuspend}
        />
      </td>
    </tr>
  )
}