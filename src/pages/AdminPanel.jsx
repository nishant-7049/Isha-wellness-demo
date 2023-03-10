import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AdminPanel = () => {
  const [adminEmail, setAdminEmail] = useState()

  const navigate = useNavigate()

  const getAdminData = () => {
    axios({
      method: 'get',
      url: 'http://localhost:3001/api/adminData',
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
      responseType: 'json',
    }).then((res) => {
      const data = res.data

      if(data.status === 'ok') {
        setAdminEmail(data.userEmail)
      }
      else {
        alert(data.error)
      }
    })
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios
        .post('http://localhost:3001/api/decode', { token })
        .then((res) => {
          const user = res.data.user
          if (!user) {
            localStorage.removeItem('token')
            navigate('/login')
          } else {
            getAdminData()
          }
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      navigate('/login')
    }
  }, [navigate])

  return <div>The user admin email is :{adminEmail || 'No admin found !!'}</div>
}

export default AdminPanel
