import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetVenueDetails } from '../../services/Venue'
import { CreateEvent } from '../../services/Event'

const VenueBookingForm = ({user}) => {
  const { category_id, venue_id } = useParams()
  const [venue, setVenue] = useState({})
  const [bookedDates, setBookedDates] = useState([])

  // venueid from the params,
  // userID from the user attributes,
  // venodrid from the venue details
  const [formValues, setFormValues] = useState({
    date: '',
    guestNumbers: '',
    package_name: '',
    notes: ''
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
    console.log(formValues)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { date, guestNumbers, notes } = formValues

    try {
      const res = await CreateEvent({ date, guestNumbers, notes, package: formValues.package_name, userId: user.id, vendorId: venue.vendor_ref, venueId: venue._id })
      console.log('created event',res);
      setFormValues({
        date: '',
        guestNumbers: '',
        package_name: '',
        notes: ''
      })
      // navigate('/dashboard')
    } catch (error) {
      console.error('Booking failed:', error)
    }
  }

  useEffect(() => {
    console.log('user', user);
    const getvenuedetails = async () => {
      const data = await GetVenueDetails(category_id, venue_id)
      setVenue(data.venue)
      setBookedDates(data.booked_dates)
      console.log('data', data.venue)
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
                <label htmlFor="date">Date</label>
                <input
                  disabled={"08-07-2024"}
                  onChange={handleChange}
                  name="date"
                  type="date"
                  placeholder="Date of Event"
                  value={formValues.date}
                  required
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

                <select name="package_name" id="package_name" onChange={handleChange}>
                  {venue.package?.map((pkg) => (
                    <option key={pkg._id} value={pkg.name}>
                      {pkg.name}  {pkg.price}BD
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
