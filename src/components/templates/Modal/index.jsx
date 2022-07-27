import { useEffect, useState } from 'react'
import FormGroup from '../FormGroup'
import './Modal.scss'

export default function Modal({children, title, show, onHide, onSubmit}) {
  const [isShow, setIsShow] = useState(true)
  const [modal, setModal] = useState('')
  const [dialog, setDialog] = useState('')

  useEffect(() => {
    if (show && isShow) {
      setModal(' open')
      setDialog(' open')
    }
  }, [show, isShow])

  const handleCloseModal = e => {
    const target = e.target
    if (target.classList.contains('modal') || target.classList.contains('fa-times') || e.target.innerText === 'Batal') {
      setIsShow(false)
      setModal('')
      setDialog('')
  
      setTimeout(() => {
        onHide()
        setIsShow(true)
      }, 150);
    }
  }

  if (!show) {
    return null
  } else {
    return(
      <div className={`modal${modal}`} onClick={handleCloseModal}>
        <div className={`modal-dialog${dialog}`}>
          <div className="modal-header">
            <h3>{title}</h3>
            <button className="fas fa-times"></button>
          </div>
          <form onSubmit={onSubmit}>
            {children}
          </form>
        </div>
      </div>
    )
  }
}

Modal.Body = function Body({children}) {
  return <div className="modal-body">{children}</div>
}

Modal.Body.DetailProduct = function DetailProduct({children}) {
  return(
    <div className="container-detail-product">
      {children}
    </div>
  )
}

Modal.Body.DetailProduct.Head = function DetailProductHead({children}) {
  return(
    <div className="cdp-head">
      <img src="https://source.unsplash.com/100x100/?nature" alt="" />
      <div className="cdp-wrapper">
        {children}
      </div>
    </div>
  )
}

Modal.Body.DetailProduct.Head.ItemData = function DetailProductHeadItemData({name, value}) {
  return(
    <div className="cdp-data">
      <span>{name}</span>
      <span>{value}</span>
    </div>
  )
} 

Modal.Footer = function Footer({children}) {
  return <div className="modal-footer">{children}</div>
}

Modal.Center = function ModalCenter({children, show, onHide}) {
  const [isShow, setIsShow] = useState(true)
  const [modal, setModal] = useState('')
  const [dialog, setDialog] = useState('')

  useEffect(() => {
    if (show && isShow) {
      setModal(' open')
      setDialog(' open')
    }
  }, [show, isShow])

  const handleCloseModal = e => {
    const target = e.target
    if (target.classList.contains('modal') || e.target.innerText === 'Batal' || e.target.innerText === 'Tutup') {
      setIsShow(false)
      setModal('')
      setDialog('')
  
      setTimeout(() => {
        onHide()
        setIsShow(true)
      }, 150);
    }
  }

  if (!show) return null 

  return(
    <div className={`modal${modal}`} onClick={handleCloseModal}>
      <div className={`modal-dialog-center${dialog}`}>
        {children}
      </div>
    </div>
  )
}

Modal.Center.TitleDelete = function ModalCenterTitleDelete() {
  return(
    <>
      <label>Apakah anda yakin akan menghapus</label>
      <h2>Rokok ?</h2>
    </>
  )
}

Modal.Center.Warning =  function ModalCenterWarning(){
  return(
    <div className="modal-center-warning">
      <strong>Jika iya:</strong>
      <ul>
        <li>Secara otomatis mempengaruhi grafik penjualan</li>
        <li>Secara otomatis mempengaruhi grafik penjualan</li>
      </ul>
    </div>
  )
}

Modal.Center.Footer = function ModalCenterFooter({children}) {
  return(
    <div className="modal-center-footer">{children}</div>
  )
}

Modal.LoginSignUp = function ModalLoginSignUp({children, show, onHide}) {
  const [isShow, setIsShow] = useState(true)
  const [modal, setModal] = useState('')
  const [dialog, setDialog] = useState('')

  useEffect(() => {
    if (show && isShow) {
      setModal(' open')
      setDialog(' open')
    }
  }, [show, isShow])

  const handleCloseModal = e => {
    const target = e.target
    if (target.classList.contains('modal') || e.target.innerText === 'Batal' || e.target.innerText === 'Tutup') {
      setIsShow(false)
      setModal('')
      setDialog('')
  
      setTimeout(() => {
        onHide()
        setIsShow(true)
      }, 150);
    }
  }

  if (!show) return null 

  return(
    <div className={`modal${modal}`} onClick={handleCloseModal}>
      <div className={`modal-dialog-login${dialog}`}>
        {children}
      </div>
    </div>
  )
}

Modal.LoginSignUp.FormItem = function ModalLoginSignUpFormItem({firstIcon, placeholder, secondIcon, onChange}) {
  return(
    <div className="form-auth">
      <div className="wrap-auth">
        <i className={firstIcon}></i>
        <input type="text" placeholder={placeholder} onChange={onChange} />
        {/* <i className={secondIcon}></i> */}
      </div>
      {/* <span className="warning">Email sudah terdaftar</span> */}
    </div>
  )
}

Modal.LoginSignUp.FormItem.Password = function ModalLoginSignUpFormItemPassword({firstIcon, placeholder, onChange}) {
  const [hide, setHide] = useState(true)
  const [icon, setIcon] = useState('fas fa-eye-slash')

  const handleHide = () => {
    setHide(!hide)
    setIcon(icon === 'fas fa-eye-slash' ? 'fas fa-eye' : 'fas fa-eye-slash')
  }

  return(
    <div className="form-auth">
      <div className="wrap-auth">
        <i className={firstIcon}></i>
        <input type={hide ? 'password' : 'text'} placeholder={placeholder} onChange={onChange} />
        <i className={icon} onClick={handleHide}></i>
      </div>
      {/* <span className="warning">Email sudah terdaftar</span> */}
    </div>
  )
}