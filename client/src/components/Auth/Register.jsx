import { useState } from 'react'
import { RegisterUser } from '../../services/Auth'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  let navigate = useNavigate()

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    userType: ''
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let res = await RegisterUser({
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      phoneNumber: formValues.phoneNumber,
      userType: formValues.userType
    })
    console.log(res)
    setFormValues({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      userType: ''
    })
    navigate('/login')
  }

  return (
    <div className="signin col">
      <div className="card-overlay centered">
        <form className="col" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label className="name">Name</label>
            <input
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="John Smith"
              value={formValues.name}
              required
            />
          </div>
          <div className="input-wrapper">
            <label className="email">Email</label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="example@example.com"
              value={formValues.email}
              required
            />
          </div>

          <div className="input-wrapper">
            <label className="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={formValues.password}
              required
            />
          </div>
          <div className="input-wrapper">
            <label className="confirmPassword">Confirm Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="confirmPassword"
              value={formValues.confirmPassword}
              required
            />
            <div className="input-wrapper">
              <label className="phoneNumber">Phone Number</label>
              <input
                onChange={handleChange}
                name="phoneNumber"
                type="text"
                placeholder="33000000"
                value={formValues.phoneNumber}
                required
              />
            </div>
            <select
              name="userType"
              value={formValues.userType}
              onChange={handleChange}
            >
              <option value="">Select User Type</option>
              <option value="user">User</option>
              <option value="vendor">vendor</option>
            </select>
          </div>
          <button
            disabled={
              !formValues.email ||
              !formValues.phoneNumber ||
              (!formValues.password &&
                formValues.confirmPassword === formValues.password)
            }
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
