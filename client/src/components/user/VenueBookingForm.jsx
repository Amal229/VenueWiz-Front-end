import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import DatePicker from 'rsuite/DatePicker'
import 'rsuite/DatePicker/styles/index.css'
import { GetVenueDetails } from '../../services/Venue'
import { CreateEvent } from '../../services/Event'

const VenueBookingForm = ({ user }) => {
  let navigate = useNavigate()
  const { category_id, venue_id } = useParams()
  const [venue, setVenue] = useState({})
  const [bookedDates, setBookedDates] = useState([])

  // venueid from the params,
  // userID from the user attributes,
  // venodrid from the venue details
  const [formValues, setFormValues] = useState({
    date: new Date(),
    guestNumbers: '',
    package_name: '',
    notes: ''
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleDateChange = (date) => {
    setFormValues({ ...formValues, date })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { date, guestNumbers, notes } = formValues

    try {
      const formattedDate = moment(date).format()
      const res = await CreateEvent({
        bookingDate: formattedDate,
        guestNumbers,
        notes,
        package: formValues.package_name,
        userId: user.id,
        vendorId: venue.vendor_ref,
        venueId: venue._id
      })
      console.log('created event', res)
      setFormValues({
        date: new Date(),
        guestNumbers: '',
        package_name: '',
        notes: ''
      })

      navigate(`/eventdetails/${res.data._id}`)
    } catch (error) {
      console.error('Booking failed:', error)
    }
  }

  const isDateDisabled = (date) => {
    const formattedDate = moment(date).format('YYYY-MM-DD')
    return bookedDates.some((bookedDate) => {
      const bookeddate = moment(bookedDate).format('YYYY-MM-DD')
      return bookeddate === formattedDate
    })
  }

  useEffect(() => {
    const getvenuedetails = async () => {
      const data = await GetVenueDetails(category_id, venue_id)
      setVenue(data.venue)
      setBookedDates(data.booked_dates)
    }
    getvenuedetails()
  }, [venue_id])

  return (
    <div className="col">
      <div className="card-overlay centered">
        {venue ? (
          <div>
            <h3>{venue.name}</h3>
            <form className="col" onSubmit={handleSubmit}>
              <div className="input-wrapper">
                <label htmlFor="eventName">Event Name</label>
                <input
                  onChange={handleChange}
                  name="eventName"
                  type="text"
                  placeholder="Enter name"
                  value={formValues.eventName}
                  required
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="date">Date</label>
                <DatePicker
                  onChange={handleDateChange}
                  value={formValues.date}
                  defaultValue={new Date()}
                  limitEndYear={2}
                  limitStartYear={1}
                  shouldDisableDate={isDateDisabled}
                />
              </div>

              <div className="input-wrapper">
                <label htmlFor="guestNumbers">Guest Numbers</label>
                <input
                  onChange={handleChange}
                  name="guestNumbers"
                  type="number"
                  min={1}
                  placeholder="10"
                  value={formValues.guestNumbers}
                  required
                />
              </div>

              <div className="input-wrapper">
                {/* drop down menu */}
                <label htmlFor="package_name">Package:</label>

                <select
                  name="package_name"
                  id="package_name"
                  onChange={handleChange}
                >
                  <option value="">Select Package</option>
                  {venue.package?.map((pkg) => (
                    <option key={pkg._id} value={pkg.name}>
                      {pkg.name} {pkg.price}BD
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-wrapper">
                <label htmlFor="notes">Notes</label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="notes"
                  value={formValues.notes}
                />
              </div>
              <button
                disabled={
                  !formValues.date ||
                  !formValues.guestNumbers ||
                  !formValues.package_name
                }
              >
                Book
              </button>
            </form>
          </div>
        ) : (
          <div>
            <p>loading</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default VenueBookingForm
