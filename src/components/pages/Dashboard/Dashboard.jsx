// libraries
import { Component, useEffect } from 'react';
import Chart from 'chart.js/auto'

// components
import { MainLayout } from '../..'
import OutletsList from './OutletsList/OutletsList';
import InfoCard from './InfoCard/InfoCard';

// styles
import './Dashboard.scss'
import GraphCard from './GraphCard/GraphCard';
import axios from 'axios';
import util from '../../../util';
import { Line } from 'react-chartjs-2';

export default class Dashboard extends Component {
  state = {
    isLoading: true,
    total_users: 0,
    new_users: [
      {
        created_at: '',
        total: 0
      }
    ]
  }

  componentDidMount(){
    axios.get(util.server_url+'accounts/dashboard')
    .then(r => {
      this.setState({
        isLoading: false,
        total_users: r.data.result.total_users,
        new_users: r.data.result.new_users
      })
    }).catch(e => console.log(e))
      this.Keuntungan()
  }

  Keuntungan(){
    // axios.get(util.server_url+'accounts/keuntungan')
    // .then(r => {
    //   // this.setState({
    //   //  paid_off: r.data.result.paid_off[0].untung
    //   // })
    //   console.log(r.data.result.paid_off[0].untung);
    // }).catch(e => console.log(e))
    axios.get(util.server_url+'accounts/keuntungan')
    .then((res) => {
      this.setState({
        paid_off: res.data.result.paid_off[0].untung
      })
      console.log(res.data);
    })
  }
  
  componentDidUpdate() {
    // const ctx = document.getElementById('profit')

    // new Chart(ctx, {
    //   type: 'line',
    //   data: {
    //     labels: this.state.new_users.map(d => d.created_at),
    //     datasets: [{
    //       label: 'Pengguna Baru Per Hari',
    //       data: this.state.new_users.map(d => d.total),
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.2)'
    //       ],
    //       borderColor: [
    //         'rgba(255, 99, 132, 1)'
    //       ],
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     legend: {
    //       display: true
    //     },
    //     barValueSpacing: 20,
    //     scales: {
    //       yAxes: [{
    //           ticks: {
    //               min: 0,
    //           }
    //       }],
    //       xAxes: [{
    //               gridLines: {
    //                   color: "rgba(0, 0, 0, 0)",
    //               }
    //             }]
    //       }
    //   }
    // })
  }

  render() {
    return (
      
      <MainLayout title="Dashboard">
      {/* <OutletsList list={['Semua','Bamban 1', 'Nar 2', 'Cabang 3', 'Cabang 4', 'Es teh Hangat Anjir Mantab Lah wkwkw', '1', '2']} /> */}
      <div className="card-container">
        <InfoCard isLoading={this.state.isLoading} icon="fas fa-file-invoice-dollar" title="Pengguna" val={this.state.total_users} />
        <InfoCard icon="fas fa-hand-holding-usd" title="Keuntungan" val={this.state.paid_off} />
      </div>
      <div className={`graph-container${this.state.isLoading ? ' skeleton' : ''}`}>
        <div className="main-graph-card">
          <h3>Grafik Pengguna Baru</h3>
          {/* <canvas id="profit"></canvas> */}
          <Line options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: false,
                text: 'Chart.js Line Chart',
              },
            },
          }} data={{
            labels: this.state.new_users.map(d => d.created_at).sort(),
            datasets: [
              {
                label: 'Pengguna Baru Per Hari',
                data: this.state.new_users.map(d => d.total).sort(),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 1
              }
            ],
          }} />
        </div>
        {/* <div className="wrapper-graph">
          <GraphCard type="bar" title="Top 10 Barang Terlaris" />
          <GraphCard type="line" title="Transaksi 7 Hari Terakhir" />
          <GraphCard type="line" title="Transaksi Bulan September" />
          <GraphCard type="line" title="Transaksi Tahun 2021" />
        </div> */}
      </div>
    </MainLayout>
    )
  }
}
