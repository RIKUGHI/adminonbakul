import util from '../../../../util'
import './DataWrapper.scss'

export default function DataWrapper({ date, total, paymentList }) {
  const getDay = date => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    return days[new Date(date).getDay()]
  }
  const dateToInaFormat = date => {
    const split = date.split('-')
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des']
    return split[2]+' '+months[parseInt(split[1]) - 1]+' '+split[0]
  }
  
  return(
    <div className="data-wrapper">
      <div className="lead-content">
        <h4>{getDay(date)}, {dateToInaFormat(date)}</h4>
        <h4>Total: {util.formatRupiah(total)}</h4>
      </div>
      <table border="0" className="transaction-table">
        <thead>
          <tr>
            <th>Nama Pemilik</th>
            <th>Metode Pembayaran</th>
            <th>Tanggal Mulai - Akhir</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {paymentList.map(d => (
            <tr>
              <td>{d.id_owner === null ? 'Akun tidak tersedia' : d.id_owner.owner_name}</td>
              <td>GoPay</td>
              <td>{d.start} s/d {d.end}</td>
              <td>{util.formatRupiah(d.paid_off)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}