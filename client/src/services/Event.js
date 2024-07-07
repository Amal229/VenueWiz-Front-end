// event services
import Client from './api'

export const GetVendorEvents = async (vendor_id) => {
  try {
    const res = await Client.get(`/event/vendor/${vendor_id}`)
    console.log('result', res.data)

    return res.data
  } catch (error) {
    throw error
  }
}

export const GetUserEvents = async (user_id) => {
  try {
    const res = await Client.get(`/event/user/${user_id}`)
    console.log('result', res.data)

    return res.data
  } catch (error) {
    throw error
  }
}

export const GetEventDetails = async (event_id) => {
  try {
    const res = await Client.get(`/event/${event_id}`)
    console.log('event details', res.data)

    return res.data
  } catch (error) {
    throw error
  }
}
