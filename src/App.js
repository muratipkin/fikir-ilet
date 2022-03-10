import React, { Component } from 'react'
import axios from 'axios';
import './App.css';
import Admin from "./Admin";

export default class App extends Component {
  state={
    tamIsim:"",
    email:"",
    fikirTuru:"Öneri",
    fikir:"",

    alertSuccessDisplay:"none",
    alertErrorDisplay:"none",
    adminPanelMi:false
  }

  formuTemizle=()=>{
    this.setState({tamIsim:"",email:"",fikirTuru:"Öneri",fikir:""});
  }

  formValidation=()=>{
    const{tamIsim,email,fikirTuru,fikir}=this.state;
    if(!tamIsim || !email || !fikirTuru || !fikir) return false;
    return true;
  }
  
  formuGonder=()=>{
    const {tamIsim,email,fikirTuru,fikir}=this.state;

    if(!this.formValidation()) return;

    axios.post("http://localhost:5555/fikirkaydet",{tamIsim,email,fikirTuru,fikir}).then(res=>{
      //console.log(res);
      this.formuTemizle();
      this.setState({alertSuccessDisplay:"block"});
      setTimeout(()=>{
        this.setState({alertSuccessDisplay:"none"})
      },2500);
    }).catch(err=>{
      this.setState({alertErrorDisplay:"block"});
      setTimeout(()=>{
        this.setState({alertErrorDisplay:"none"})
      },3500);
    });
  }

  render() {

    if(this.state.adminPanelMi) return <Admin/>;

    return (
      <div className='text-center mt-3'>
        <h1>Fikir İlet Uygulaması</h1>

        <div className="m-5 w-25 mx-auto">
          <div className="alert alert-success" role="alert" style={{display:this.state.alertSuccessDisplay}}>
            Fikriniz Kaydedildi!
          </div>
          <div className="alert alert-danger" role="alert" style={{display:this.state.alertErrorDisplay}}>
            Hata! Fikriniz Kaydedilemedi!
          </div>
          <form className='was-validated'>
            <div className='form-group p-2'>
              <label htmlFor="tamIsimID" className="form-label">Ad Soyad</label>
              <input type="text" className="form-control" id="tamIsimID" placeholder="Ad Soyad"
              value={this.state.tamIsim}
              onChange={e=>this.setState({tamIsim:e.target.value})} required/>
            </div>
            <div className='form-group p-2'>
              <label htmlFor="emailID" className="form-label">Email</label>
              <input type="email" className="form-control" id="emailID" placeholder="Email"
              value={this.state.email}
              onChange={e=>this.setState({email:e.target.value})} required/>
            </div>
            <div className='form-group p-2'>
              <label htmlFor="fikirTuruID" className="form-label">Fikir Türü</label>
              <select id="fikirTuruID" className='form-control'
              value={this.state.fikirTuru}
              onChange={e=>this.setState({fikirTuru:e.target.value})} required>
                <option>Öneri</option>
                <option>Hata</option>
                <option>Şikayet</option>
              </select>
            </div>
            <div className="form-group p-2">
              <label htmlFor="fikirID" className="form-label">Fikir</label>
              <textarea className="form-control" id="fikirID" rows="3"
              value={this.state.fikir}
              onChange={e=>this.setState({fikir:e.target.value})} required></textarea>
            </div>
            <button type='button' className='btn btn-success p-2'
            onClick={this.formuGonder}>Gönder</button>
          </form>
            <br /><br />
            <hr style={{height:"4px"}} />

            <button type='button' className='btn btn-outline-dark p-2'
            onClick={()=>this.setState({adminPanelMi:true})}>ADMIN PANEL</button>

            <hr style={{height:"4px"}} />
        </div>        
      </div>
    )
  }
}