import { useState } from 'react'
import { Modal, Notification } from '../..'
import './Landing.scss'

import Grafik from './grafik.png'
import Devices from './devices.png'
import Easy from './easy.png'
import Barcode from './barcode.svg'
import Cam from './cam.svg'
import Wallet from './wallet.svg'
import Print from './print.svg'
import axios from 'axios'
import util from '../../../util'
import { GlobalConsumer } from '../../../context'

function Landing(p) {
  const [show, setShow] = useState(false)
  const [login, setLogin] = useState(false)
  const [isProsess, setIsProsess] = useState(false)

  const handleShowSuccess = e => {
    setShow(true)
    if (e.target.textContent.toLowerCase() === 'masuk') {
      setLogin(true)
    } else {
      setLogin(false)
    }

    // reset value
    setFormLogin({
      email: '',
      password: ''
    })
    setFormSignUp({
      code: '',
      name: '',
      email: '',
      password: ''
    })
  }
  const handleCloseSuccess = () => setShow(false)

  const handleMode = () => {
    setLogin(!login)

    // reset value
    setFormLogin({
      email: '',
      password: ''
    })
    setFormSignUp({
      code: '',
      name: '',
      email: '',
      password: ''
    })
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

  const [formLogin, setFormLogin] = useState({
    email: '',
    password: ''
  })
  const [formSignUp, setFormSignUp] = useState({
    code: '',
    name: '',
    email: '',
    password: ''
  })

  const handleSubmit = e => {
    e.preventDefault()
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (login) {
      if (formLogin.email === '' || !regex.test(String(formLogin.email).toLowerCase())) {
        handleShowNotif('warning', 'Format email salah')
      } else if (formLogin.password === '' || formLogin.password.length < 4) {
        handleShowNotif('warning', 'Password minimal lebih dari 3 karakter')
      } else {
        const form = new FormData()
        form.append('email', formLogin.email)
        form.append('password', formLogin.password)

        setIsProsess(true)
        axios.post(util.server_url+'auth/loginadmin', form)
        .then(r => {
          if (r.data.response_code === 200) {
            p.state.signIn({
              name: r.data.result.name,
              id_admin: r.data.result.id_admin
            })
            window.location.href = '/dashboard'
          } else {
            handleShowNotif('warning', r.data.result.message)
          }

          setIsProsess(false)
        }).catch(e => console.log(e))
      }
    } else {
      if (formSignUp.code !== 'OnBakul') {
        handleShowNotif('warning', 'Kode salah')
      } else if (formSignUp.name === '') {
        handleShowNotif('warning', 'Nama admin tidak boleh kosong')
      } else if (formSignUp.email === '' || !regex.test(String(formSignUp.email).toLowerCase())) {
        handleShowNotif('warning', 'Format email salah')
      } else if (formSignUp.password === '' || formSignUp.password.length < 4) {
        handleShowNotif('warning', 'Password minimal lebih dari 3 karakter')
      } else {
        const form = new FormData()
        form.append('name', formSignUp.name)
        form.append('email', formSignUp.email)
        form.append('password', formSignUp.password)
        
        setIsProsess(true)
        axios.post(util.server_url+'auth/signupadmin', form)
        .then(r => {
          if (r.data.response_code === 200) {
            p.state.signIn({
              name: r.data.result.name,
              id_admin: r.data.result.id_admin
            })
            window.location.href = '/dashboard'
          } else {
            handleShowNotif('warning', r.data.result.message)
          }

          setIsProsess(false)
        }).catch(e => console.log(e))
      }
    }
  }

  return(
    <>
      <div className="header-hero">
        <img src="assets/images/logo/logo.png" alt="" />
        <div className="wrp-btns">
          <button onClick={handleShowSuccess}>Masuk</button>
          {/* <button onClick={handleShowSuccess}>Daftar</button> */}
        </div>
      </div>

      <div className="image-hero">
        <h1>Mudah Digunakan</h1>
        <span>Tinggal daftar dan langsung bisa dipakai tanpa perlu install dulu</span>
        <button>Mulai Gratis Sekarang</button>
      </div>
  
      <section>
        <ProfitItem 
          title="Laporan Grafik" 
          content="Grafik yang terdapat akan berubah seiring dengan transaksi maupun perubahan yang anda lakukan." 
          img={Grafik}/>
        <ProfitItem reverse 
          title="Flexible di Semua Perangkat" 
          content="Bisa dibuka di desktop, tablet, maupun mobile dengan menggunakan browser." 
          img={Devices}/>
        <ProfitItem 
        title="Mudah Digunakan" 
        content="Cocok untuk pelaku usaha UMKM yang sedang menjalankan bisnis." 
        img={Easy}/>
      </section>
      <section className="fitur">
        <div className="f-head">
          <h1>Fitur Yang Kami Tawarkan</h1>
          <p>Berikut ini adalah beberapa fitur yang akan anda peroleh jika</p>
          <p>menggunakan aplikasi onBakul</p>
        </div>
        <div className="f-container">
          <FiturItem 
            title="Scan Barcode" 
            content="Lorem Lorem" 
            img={Barcode}/>
          <FiturItem 
            title="Scan Barcode" 
            content="Lorem Lorem" 
            img={Cam}/>
          <FiturItem 
            title="Scan Barcode" 
            content="Lorem Lorem" 
            img={Wallet}/>
          <FiturItem 
            title="Scan Barcode" 
            content="Lorem Lorem" 
            img={Print}/>
        </div>
      </section>

      {/* notification */}
      <Notification 
        show={notification} 
        status={statusNotif} 
        message={statusMessage}
        onHide={handleCloseNotif} />

      {/* modal login & sign up */}
      <Modal.LoginSignUp show={show} onHide={handleCloseSuccess}>
        <div className="decoration-bg"></div>
        <div className="container-login">
          <div className="head">
            <h2>{login ? 'Masuk' : 'Daftar'}</h2>
          </div>
          <form className="body" onSubmit={handleSubmit}>
            {login ? 
              <>
                <Modal.LoginSignUp.FormItem 
                  firstIcon="fas fa-envelope" 
                  placeholder="Email" 
                  secondIcon="fas fa-check"
                  onChange={e => setFormLogin({...formLogin, email: e.target.value})} />
                <Modal.LoginSignUp.FormItem.Password 
                  firstIcon="fas fa-lock" 
                  placeholder="Password"
                  onChange={e => setFormLogin({...formLogin, password: e.target.value})} />
              </> : 
              <>
                <Modal.LoginSignUp.FormItem 
                  firstIcon="fas fa-user" 
                  placeholder="Kode" 
                  secondIcon="fas fa-times"
                  onChange={e => setFormSignUp({...formSignUp, code: e.target.value})} />
                <Modal.LoginSignUp.FormItem 
                  firstIcon="fas fa-user" 
                  placeholder="Nama Admin" 
                  secondIcon="fas fa-times"
                  onChange={e => setFormSignUp({...formSignUp, name: e.target.value})} />
                <Modal.LoginSignUp.FormItem 
                  firstIcon="fas fa-envelope" 
                  placeholder="Email" 
                  secondIcon="fas fa-check" 
                  onChange={e => setFormSignUp({...formSignUp, email: e.target.value})} />
                <Modal.LoginSignUp.FormItem.Password 
                  firstIcon="fas fa-lock" 
                  placeholder="Password"
                  onChange={e => setFormSignUp({...formSignUp, password: e.target.value})} />
              </> }

            <button type='submit' className={isProsess ? 'disable' : ''}>{isProsess ? 'Proses' : login ? 'Masuk' : 'Daftar'}</button>
            <p>{login ? 'Belum' : 'Sudah'} punya akun?<strong onClick={handleMode}>{login ? 'Daftar' : 'Masuk'}</strong></p>
          </form>
        </div>
      </Modal.LoginSignUp>
    </>
  )
}

export default GlobalConsumer(Landing)

const ProfitItem = ({reverse, title, content, img}) => {
  return(
    <div className={`profit-card${reverse ? ' reverse' : ''}`}>
      <div className="profit-content">
        <h1>{title}</h1>
        <p>{content}</p>
      </div>
      <div className="img-content">
        <img src={img} alt="" />
      </div>
    </div>
  )
}

const FiturItem = ({title, content, img}) => {
  return(
    <div className="f-card">
      <div className="img-content">
        <img src={img} alt="" />
      </div>
      <div className="f-content">
        <strong>{title}</strong>
        <p>{content}</p>
      </div>
    </div>
  )
}