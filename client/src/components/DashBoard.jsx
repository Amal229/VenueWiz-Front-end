import BookedVenues from './Vendor/BookedVenues'
import BookedEvents from './user/BookedEvents'

const Dashboard = () => {
  const user = { id: '668703050fa670bdda6e8cfe', name: 'Fatema', vendor: false }

  return (
    <div>
      {user.vendor ? (
        <BookedVenues user={user} />
      ) : (
        <BookedEvents user={user} />
      )}
    </div>
  )
}

export default Dashboard
