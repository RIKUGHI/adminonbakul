import axios from 'axios'
import { useEffect, useState } from 'react'
import { FormGroup, MainLayout, Modal, Notification } from '../..'
import { GlobalConsumer } from '../../../context'
import util from '../../../util'
import './Akun.scss'

function Akun(p) {
  const [data, setData] = useState({
    name: '',
    email: ''
  })
  useEffect(() => {
    getAccount()
  }, [])

  const getAccount = () => {
    axios.get(util.server_url+'accounts/detailadmin/'+p.state.id_admin)
    .then(r => {
      if (r.data.result) setData({
        name: r.data.result[0].name,
        email: r.data.result[0].email
      })
    }).catch(e => console.log(e))
  }

  // notification
  const [notification, setNotification] = useState(false)
  const [statusNotif, setStatusNotif] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  
  const handleShowNotif = (status, message) => {
    setNotification(true)
    setStatusNotif(status)
    setStatusMessage(message)
  }
  const handleCloseNotif = () => setNotification(false)

  // modal edit account
  const [showEdit, setShowEdit] = useState(false)
  const [form, setForm] = useState({
    name: data.name,
    email: data.email,
    password: ''
  })

  const handleShowEdit = () => {
    setShowEdit(true)
    setForm({
      name: data.name,
      email: data.email,
      password: ''
    })
  }
  const handleCloseEdit = () => setShowEdit(false)
  const handleSubmitEdit = e => {
    e.preventDefault()
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (form.name === '') {
      handleShowNotif('warning', 'Nama tidak boleh kosong')
    } else if (form.email === '' || !regex.test(String(form.email).toLowerCase())) {
      handleShowNotif('warning', 'Format email salah')
    } else {
      const d = new FormData()
      d.append('name', form.name)
      d.append('email', form.email)
      d.append('password', form.password)

      axios.put(util.server_url+'accounts/editAdmin/'+p.state.id_admin, new URLSearchParams(d))
      .then(r => {
        if (r.data.response_code === 200) {
          getAccount()
          handleShowNotif('success', r.data.result.message)
          document.querySelector('.modal').querySelector('button[type="reset"]').click()
        } else {
          handleShowNotif('warning', r.data.result.message)
        }
      }).catch(e => console.log(e))
    }
  }
  
  return(
    <>
      <MainLayout title="Akun">
        <div className="account-container">
          <img src="https://source.unsplash.com/100x100/?nature" alt="" />
          <div className="info-container">
            <div className="info">
              <div className="wrp">
                <div className="data-account">
                  <label>Nama Admin</label>
                  <p>{data.name}</p>
                </div>
              </div>
            </div>
            <div className="info">
              <div className="wrp">
                <div className="data-account">
                  <label>Email</label>
                  <p>{data.email}</p>
                </div>
                <div className="data-account">
                  <label>Password</label>
                  <p>********</p>
                </div>
              </div>
              <button onClick={handleShowEdit}>Ubah</button>
            </div>
          </div>
        </div>
      </MainLayout>

      {/* notification */}
      <Notification 
        show={notification} 
        status={statusNotif} 
        message={statusMessage}
        onHide={handleCloseNotif} />

      {/* modal edit account */}
      <Modal title="Edit Pelanggan" show={showEdit} onHide={handleCloseEdit} onSubmit={handleSubmitEdit}>
        <Modal.Body>
            <FormGroup name="Nama" value={data.name}  onChange={e => setForm({...form, name: e.target.value})}/>
            <FormGroup name="Email" value={data.email} onChange={e => setForm({...form, email: e.target.value})}/>
            <FormGroup name="Password (tidak wajib)" onChange={e => setForm({...form, password: e.target.value})}/>
        </Modal.Body>

        <Modal.Footer>
          <button type="reset">Batal</button>
          <button type="submit">Simpan</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default GlobalConsumer(Akun)