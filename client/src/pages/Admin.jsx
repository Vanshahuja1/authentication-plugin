import React, { useEffect, useState } from 'react'
import { deleteUser, get } from '../services/ApiEndpoint'
import { toast } from 'react-hot-toast'

export default function Admin() {
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get all users
        const userRes = await get('/api/admin/getuser')
        if (userRes.status === 200) {
          setUsers(userRes.data.users)
        }

        // Get logged-in user
        const loggedInUser = await get('/api/auth/check')
        if (loggedInUser.status === 200) {
          setCurrentUser(loggedInUser.data)
        }

      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const handleDelete = async (id) => {
    try {
      const res = await deleteUser(`/api/admin/delet/${id}`)
      if (res.status === 200) {
        toast.success(res.data.message)
        // Remove from UI
        setUsers(users.filter((user) => user._id !== id))
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message)
      }
    }
  }

  // Group users
  const instructors = users.filter(user => user.role === 'instructor')
  const regularUsers = users.filter(user => user.role === 'user')
  const admins = users.filter(user => user.role === 'admin')

  const renderTable = (label, group) => (
    <>
      <h3>{label}</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {group.map((user, index) => (
            <tr key={index}>
              <td>
                {user.name}
                {currentUser && user._id === currentUser._id && ' (You)'}
              </td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {/* Prevent deleting self */}
                {currentUser && user._id === currentUser._id ? (
                  <span>--</span>
                ) : (
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )

  return (
    <div className='admin-container'>
      <h2>Manage Users</h2>
      {renderTable("👤 Users", regularUsers)}
      {renderTable("🧑‍🏫 Instructors", instructors)}
      {renderTable("🛡️ Admins", admins)}
    </div>
  )
}
