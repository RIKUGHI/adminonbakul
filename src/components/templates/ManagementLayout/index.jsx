import { FormSearch, MainLayout, Pagination, TripleButtons } from '../..'
import './ManagementLayout.scss'

export default function ManagementLayout(props) {
  return(
    <MainLayout title={props.title}> 
      <div className="mng-product-container">
        <div className="head-product">
          <span className="title">Daftar {props.title}</span>
          <div className="wrapper-action">
            <FormSearch onSubmit={props.onSubmit} className="search hide1" icon="fas fa-search" placeholder={`Cari ${props.title}`} />
          </div>
        </div>
        <div className="main-management-container">
          {props.children}
        </div>
        {/* <Pagination/> */}
      </div>
    </MainLayout>
  )
}
