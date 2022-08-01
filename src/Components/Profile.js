
import React,{ useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const [profile,setProfile] = useState({name:"",email:""})
    const [data,setData] = useState(null)
    const navigate = useNavigate();
    const user = async()=>{
        const response = await fetch(`http://localhost:5000/api/auth/getuser`,{
            method: 'POST',
            headers: {
                'auth-token':localStorage.getItem('token')
            }
        });
        const users = await response.json();
        setData(users)
        setProfile({name:users.name,email:users.email})
    }

    useEffect(()=>{
        if (localStorage.getItem('token')) {
            user();
        }
        else {
            navigate('/login')
        }
    },[])

    const onchange = (e)=>{
        setProfile({...profile,[e.target.name]:e.target.value})
    }

    const handleclick = async () =>{
        try{

            console.log(profile.name)
            const response = await fetch(`http://localhost:5000/api/auth/edit`,{
                method: 'PUT',
                headers: {
                    'auth-token':localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: profile.name, email: profile.email })
            });
            const datsa = await response.json();
            console.log(datsa)
        }catch(error){
            console.log(error.message)
        }
       
    }

  return (
    <div>
      {data && <div style={{display:"flex"}}>
      <p>User Name  :</p> 
      <input style={{height:"25px",marginLeft : "5px"}} type='text' name='name' value={profile.name} onChange={onchange}/>
      <button onClick={handleclick}>Update</button>
      </div>}
      {data && <div style={{display:"flex"}}>
      <p>Email  :</p> 
      <input style={{height:"25px",marginLeft : "5px"}} type='email' name='email' value={profile.email} onChange={onchange}/>
      <button onClick={handleclick}>Update</button>
      </div>}
      
    </div>
  )
}

export default Profile
