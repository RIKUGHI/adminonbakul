import { useRef, useState } from 'react'
import './HeadTransaction.scss'

export default function HeadTransaction({ total }) {
  const selectContainer = useRef(null)
  const [searchBox, setSearchBox] = useState('Semua')
  const [stylePeriode, setStylePeriode] = useState('single')

  const handleSelectedOpen = () => {
    selectContainer.current.classList.toggle('open')

    document.body.onclick = e => {
      if (!e.target.classList.contains('select-selected') && window.location.pathname === '/riwayat-transaksi') {
        selectContainer.current.classList.remove('open')
      }
    }
  }

  const handleSelected = e => {
    const selected = selectContainer.current.querySelector('.select-selected span')
    const choiceList = selectContainer.current.querySelectorAll('.control-select-option ul li') 
    
    choiceList.forEach(e => e.classList.remove('active'));
    e.target.classList.add('active')
    setSearchBox(e.target.innerText)
    setStylePeriode(e.target.innerText === 'Semua' ? 'single' : 'periode')
    handleSelectedOpen()
  }

  return(
    <div className="head-transaction">
      <h3>Total Transaksi: {total}</h3>
      {/* <div className={`wrapper ${stylePeriode}`}>
        <div className="wrapper-act">
          <div className="select-container" ref={selectContainer}>
            <div className="select-selected" onClick={handleSelectedOpen}>
              <span>{searchBox}</span>
              <i className="fas fa-caret-down"></i>
            </div>
            <div className="control-select-option">
              <ul>
                <li className="active" onClick={handleSelected}>Semua</li>
                <li onClick={handleSelected}>Per Periode</li>
              </ul>
            </div>
          </div>
          <button className="export-btn">Export</button>
        </div>

        <form className="form-search-transaction">
          {
            searchBox === 'Semua' ? (
              <>
                <input type="text" placeholder="Cari Invoice/Status" />
                <button className="fas fa-search"></button>
              </>
            ) : (
              <>
                <input className="date-input" type="text" placeholder="Tanggal Awal" />
                <input className="date-input" type="text" placeholder="Tanggal Akhir" />
                <button className="show-btn">Tampilkan</button>
              </>
            )
          }
        </form>
      </div>
      <button className="export-btn">Export</button> */}
    </div>
  )
}