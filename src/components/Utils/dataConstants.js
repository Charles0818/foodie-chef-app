import { colors } from '../styles';
export const availableDocuments = [
  {
    title: "Drive license",
    instruction: 'Drive license is needed if driver has registered a car. For bicycle it is not necessary',
  },
  {
    title: 'International Passport',
    instruction: 'Only provide an international passport identity possessing your details'
  },
  {
    title: 'National identity card'
  },
  {
    title: "Voter's card"
  },
  {
    title: 'other identity card',
    instruction: 'Upload an identity card which belongs to you and possesses your information'
  }
]

export const declineRequestReasons = [
  "Distance is too far",
  "Store is not in my starting point",
  "The order is too small",
  "I don't want to place order",
  "I don't want to go to this store",
  "I have too many orders"
]

export const bookingStatus = [
  {
    name: 'Delivered',
    color: colors.green,
  },
  {
    name: 'Progress',
    color: colors.google_yellow,
  },
  {
    name: 'Cancelled',
    color: colors.danger,
  },
  {
    name: 'Pending',
    color: colors.facebook,
  },
]
