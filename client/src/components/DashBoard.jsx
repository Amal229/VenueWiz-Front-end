import BookedVenues from './Vendor/BookedVenues'
import BookedEvents from './user/BookedEvents'

const Dashboard = ({ user}) => {

  return (
    <div>
      {user && user.vendor? (
        <BookedVenues user={user} />
      ) : (
        <BookedEvents user={user} />
      )}
    </div>
  )
}

export default Dashboard
