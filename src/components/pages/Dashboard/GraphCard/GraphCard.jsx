// libraries
import Chart from 'chart.js/auto'
import { Component, createRef, useEffect, useRef } from 'react'

// styles
import './GraphCard.scss'

// export default function GraphCard(props) {
//   const canvas = useRef(null)
  
//   useEffect(() => {
//     new Chart(canvas.current, {
//       type: props.type,
//       data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//           label: 'Transaksi Per Hari',
//           data: [12, 19, 3, 5, 2, 3],
//           backgroundColor: [
//             'rgba(255, 99, 132, 0.2)',
//             'rgba(54, 162, 235, 0.2)',
//             'rgba(255, 206, 86, 0.2)',
//             'rgba(75, 192, 192, 0.2)',
//             'rgba(153, 102, 255, 0.2)',
//             'rgba(255, 159, 64, 0.2)'
//           ],
//           borderColor: [
//             'rgba(255, 99, 132, 1)',
//             'rgba(54, 162, 235, 1)',
//             'rgba(255, 206, 86, 1)',
//             'rgba(75, 192, 192, 1)',
//             'rgba(153, 102, 255, 1)',
//             'rgba(255, 159, 64, 1)'
//           ],
//           borderWidth: 1
//         }]
//       },
//       options: {
//         legend: {
//           display: true
//         },
//         barValueSpacing: 20,
//         scales: {
//           yAxes: [{
//               ticks: {
//                   min: 0,
//               }
//           }],
//           xAxes: [{
//                   gridLines: {
//                       color: "rgba(0, 0, 0, 0)",
//                   }
//                 }]
//           }
//       }
//     })
//   })

//   return(
//     <div className="graph-card">
//       <h3>{props.title}</h3>
//       <canvas id="transaction-by-years" ref={canvas}></canvas>
//     </div>
//   )
// }

export default class GraphCard extends Component {
  constructor(props){
    super(props)
    this.canvas = createRef()
  }

  componentDidMount(){
    new Chart(this.canvas.current, {
      type: this.props.type,
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: 'Transaksi Per Hari',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: true
        },
        barValueSpacing: 20,
        scales: {
          yAxes: [{
              ticks: {
                  min: 0,
              }
          }],
          xAxes: [{
                  gridLines: {
                      color: "rgba(0, 0, 0, 0)",
                  }
                }]
          }
      }
    })
  }

  render() {
    return (
      <div className="graph-card">
        <h3>{this.props.title}</h3>
        <canvas id="transaction-by-years" ref={this.canvas}></canvas>
      </div>
    )
  }
}