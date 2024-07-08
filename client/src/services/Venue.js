// venue services
import Client from './api'

export const GetVenueDetails = async (category_id, venue_id) => {
  try {
    const res = await Client.get(
      `/categories/${category_id}/venues/${venue_id}`
    )
    // returns {venue: ..., bookedDates: ....}
    console.log('result', res.data)

    return res.data
  } catch (error) {
    throw error
  }
}

export const GetCategories = async () => {
  try {
    const res = await Client.get(`/categories`)
    // returns categories
    console.log('category result', res.data)
    return res.data
  } catch (error) {
    throw error
  }
}
export const GetAllVenue = async (vendor_id) => {
  try {
    const res = await Client.get(`/categories/venues/${vendor_id}`)
    console.log('result', res.data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetVendorVenueDetails = async (venue_id) => {
  try {
    const res = await Client.get(`/venues/${venue_id}`)
    // returns {venue: ..., bookedDates: ....}
    console.log('result', res.data)

    return res.data
  } catch (error) {
    throw error
  }
}

export const GetCategories = async () => {
  try {
    const res = await Client.get(`/categories`)
    // returns categories
    console.log('category result', res.data)

    return res.data
  } catch (error) {
    throw error
  }
}
