import './FormGroup.scss'

export default function FormGroup({name, value, onChange}) {
  return(
    <div className="form-group">
      <label>{name}</label>
      <input type="text" defaultValue={value} onChange={onChange} /> 
      {/* <span>{name} wajib diisi</span> */}
    </div>
  )
}

FormGroup.WithoutWarning = function WithoutWarning({name}) {
  return(
    <div className="form-group disable1">
      <label>{name}</label>
      <input type="text" /> 
    </div>
  )
}

FormGroup.WithImg = function WithImg() {
  return(
    <div className="form-group">
      <label>Foto</label>
      <div className="img-container">
        <label htmlFor="file-photo">Pilih Foto</label>
        <input type="file" accept="image/x-png,image/jpeg,image/jpg,image/svg" id="file-photo" />
        {/* <img src="http://localhost:3000/assets/images/users/no-product-image.jpg" alt="" /> */}
      </div>
    </div>
  )
}

FormGroup.TextArea = function TextArea({name}) {
  return(
    <div className="form-group">
      <label>{name}</label>
      <textarea></textarea> 
    </div>
  )
}