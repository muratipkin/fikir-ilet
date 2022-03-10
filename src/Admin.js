import React, { Component } from 'react'
import axios from "axios"

export default class Admin extends Component {
  state={
    username:"",
    password:"",
    basariliGiris:false,
    fikirler:""
  }

  girisYap=()=>{
    const{username,password}=this.state;
    axios.post("http://localhost:5555/giris",{username,password}).then(res=>{
      if(res.data=="Giriş Başarılı"){
        this.setState({basariliGiris:true});
        this.fikileriAl();
      }
    }).catch(err=>{
      alert("Admin Bulunamadı!");
    });
  }

  fikileriAl=()=>{
    axios.get("http://localhost:5555/fikirler").then(res=>{
      this.setState({fikirler:res.data});
    })
  }

  render() {
    if(this.state.basariliGiris) return(
      <div className='text-center mt-3'>
        <h1>Fikirler</h1>
        <ul>
          { this.state.fikirler ? //if-else = "(şart)?(doğruysa_yap):(yanlışsa_yap)"
            this.state.fikirler.map(item=><li key={item._id}>{item.fikir}</li>)  :
            null}
        </ul>
      </div>
    )

    return (
      <div className='text-center mt-3'>
        <h1>Admin Panel Giriş Formu</h1>
        <div className="m-5 w-25 mx-auto">
          <form className='was-validated'>
            <div className='form-group p-2'>
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" className="form-control" id="username" placeholder="Username"
              value={this.state.username}
              onChange={e=>this.setState({username:e.target.value})} required/>
            </div>
            <div className='form-group p-2'>
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Password"
              value={this.state.password}
              onChange={e=>this.setState({password:e.target.value})} required/>
            </div>
            <div className='m-2'>
              <button type='button' className='btn btn-success btn-lg w-100'
              onClick={this.girisYap}>Giriş Yap</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}