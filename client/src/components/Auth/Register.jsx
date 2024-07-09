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
    console.log(formValues)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formValues.userType === 'vendor') {
      let res = await RegisterUser({
        name: formValues.name,
        email: formValues.email,
        password: formValues.password,
        phoneNumber: formValues.phoneNumber,
        vendor: true
      })
      console.log(res)
    } else {
      let res = await RegisterUser({
        name: formValues.name,
        email: formValues.email,
        password: formValues.password,
        phoneNumber: formValues.phoneNumber
      })
      console.log(res)
    }

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
    <div className="Forms">
      <div className="Forms-container">
        <form className="Forms-add" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="John Smith"
              value={formValues.name}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="example@example.com"
              value={formValues.email}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={formValues.password}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="confirmPassword"
              value={formValues.confirmPassword}
              required
            />
            <div>
              <label htmlFor="phoneNumber">Phone Number</label>
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
