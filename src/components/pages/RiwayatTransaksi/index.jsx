// libraies
import React, { useEffect, useState } from 'react'
// components
import { MainLayout, NoData } from "../..";
// sub components
import HeadTransaction from './HeadTransaction';
import DataWrapper from './DataWrapper'
// styles
import './RiwayatTransaksi.scss';
import Loading from '../../templates/Loading';
import axios from 'axios';
import util from '../../../util';

export default function RiwayatTransaksi(p) { 
  const [data, setData] = useState([
    {
      date: '0000-00-00',
      total: 0,
      data: [
        {
          id_history_payment: 0,
          id_owner: {
            id_owner: 0,
            created_at: '0000-00-00',
            business_name: 'Loading Business Name',
            owner_name: 'Loading Owner Name',
            owner_code: '',
            telp: '',
            email: '',
            is_pro: false,
            start: '0000-00-00 00:00:00',
            end: '0000-00-00 00:00:00'
          },
          date: '0000-00-00',
          start: null,
          end: null,
          paid_off: 30000
        }
      ]
    }
  ])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get(util.server_url+'payment').then(res => {
      setData(res.data.result.results)
      setIsLoading(false)
    }).catch(e => console.log(e))
  }, [p.location.search])

  return(
    <>
      <MainLayout title="Riwayat Transaksi">
        <div className="history-transaction-container">
          <HeadTransaction total={data.length} />
          <div className="transaction-container">
            {isLoading ? <Loading /> : data === null ? <NoData/> : (
              data.map((d, i) => <DataWrapper 
                                    key={i}
                                    date={d.date}
                                    total={d.total}
                                    paymentList={d.data}
                                  />)
            )}
          </div>
          {/* <Pagination /> */}
        </div>
      </MainLayout>
    </>
  )
}