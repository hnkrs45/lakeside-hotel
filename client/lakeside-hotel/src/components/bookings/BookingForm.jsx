import React, { useEffect, useState } from 'react'
import { bookRoom, getRoomById } from '../utils/ApiFunctions'
import { useParams, Link } from 'react-router-dom'
import moment from 'moment'

const BookingForm = () => {
    const [isValidated, setIsValidated] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [roomPrice, setRoomPrice] = useState(0)
    const [booking, setBooking] = useState({
        guestFullName: "",
        guestEmail: "",
        checkInDate: "",
        checkOutDate: "",
        numOfAdults: "1",
        numOfChildren: "0"
    })

    const [roomInfo, setRoomInfo] = useState({
        photo: "",
        roomType: "",
        roomPrice: ""
    })
    const [confirmationCode, setConfirmationCode] = useState('')

    const { roomId } = useParams()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setBooking({ ...booking, [name]: value })
        setErrorMessage("")
    }

    const getRoomPriceById = async (roomId) => {
        try {
            const response = await getRoomById(roomId)
            setRoomPrice(response.roomPrice)
            setRoomInfo(response)
        } catch (error) {
            setErrorMessage(error.message || "Error fetching room details")
        }
    }

    useEffect(() => {
        getRoomPriceById(roomId)
    }, [roomId])

    const calculatePayment = () => {
        if (!booking.checkInDate || !booking.checkOutDate) return 0
        const checkIn = moment(booking.checkInDate)
        const checkOut = moment(booking.checkOutDate)
        const diffInDays = checkOut.diff(checkIn, 'days')
        const price = roomPrice ? Number(roomPrice) : 0
        return diffInDays > 0 ? diffInDays * price : 0
    }

    const isGuestCountValid = () => {
        const adultCount = parseInt(booking.numOfAdults, 10) || 0
        const childrenCount = parseInt(booking.numOfChildren, 10) || 0
        const totalCount = adultCount + childrenCount
        return adultCount >= 1 && totalCount >= 1
    }

    const isCheckOutDateValid = () => {
        if (!booking.checkInDate || !booking.checkOutDate) {
            return false
        }
        if (!moment(booking.checkOutDate).isAfter(moment(booking.checkInDate))) {
            setErrorMessage('Check-out date must come after check-in date')
            return false
        }
        setErrorMessage('')
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.currentTarget

        if (!booking.checkInDate || !booking.checkOutDate) {
            setErrorMessage('Please select both check-in and check-out dates')
            return
        }
        if (!isCheckOutDateValid()) {
            return
        }
        if (!isGuestCountValid()) {
            setErrorMessage('Please select at least 1 adult guest')
            return
        }
        if (form.checkValidity() === false) {
            e.stopPropagation()
        } else {
            setIsSubmitted(true)
        }
        setIsValidated(true)
    }

    const handleBooking = async () => {
        try {
            const bookingPayload = {
                guestFullName: booking.guestFullName,
                guestEmail: booking.guestEmail,
                checkInDate: booking.checkInDate,
                checkOutDate: booking.checkOutDate,
                numOfAdults: parseInt(booking.numOfAdults, 10) || 1,
                numOfChildren: parseInt(booking.numOfChildren, 10) || 0
            }
            const response = await bookRoom(roomId, bookingPayload)
            const code = typeof response === 'string' && response.includes('Confirmation Code: ')
                ? response.split('Confirmation Code: ')[1]?.trim()
                : String(response)
            setConfirmationCode(code)
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    const totalPayment = calculatePayment()

    return (
        <div className="container mt-4 mb-5">
            {confirmationCode ? (
                <div className="card border-0 shadow-sm rounded-4 p-4 text-center">
                    <h2 className="hotel-color fw-bold mb-3">Booking Confirmed!</h2>
                    <p className="text-muted fs-5 mb-2">
                        Your confirmation code is: <strong className="text-success">{confirmationCode}</strong>
                    </p>
                    <p className="text-muted small mb-4">
                        Save this confirmation code to check or cancel your reservation anytime.
                    </p>
                    <div className="d-flex justify-content-center gap-3">
                        <Link to="/find-booking" className="btn btn-hotel rounded-pill px-4">
                            View Reservation
                        </Link>
                        <Link to="/browse-all-rooms" className="btn btn-outline-secondary rounded-pill px-4">
                            Find Another Room
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="card border-0 shadow-sm rounded-4 p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h2 className="hotel-color fw-bold mb-1">Book Your Room</h2>
                            <p className="text-muted mb-0">{roomInfo.roomType || 'Selected room'} · ${roomPrice} per night</p>
                        </div>
                        <Link to="/browse-all-rooms" className="btn btn-outline-secondary rounded-pill">
                            Back to Rooms
                        </Link>
                    </div>

                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                    <form noValidate className={isValidated ? 'was-validated' : ''} onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Guest Full Name</label>
                                <input
                                    required
                                    name="guestFullName"
                                    value={booking.guestFullName}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                    className="form-control"
                                />
                                <div className="invalid-feedback">Please enter your full name.</div>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Guest Email</label>
                                <input
                                    required
                                    type="email"
                                    name="guestEmail"
                                    value={booking.guestEmail}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                    className="form-control"
                                />
                                <div className="invalid-feedback">Please enter a valid email address.</div>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Check-in Date</label>
                                <input
                                    required
                                    type="date"
                                    name="checkInDate"
                                    value={booking.checkInDate}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                                <div className="invalid-feedback">Please select a check-in date.</div>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Check-out Date</label>
                                <input
                                    required
                                    type="date"
                                    name="checkOutDate"
                                    value={booking.checkOutDate}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                                <div className="invalid-feedback">Please select a check-out date.</div>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Adults</label>
                                <input
                                    required
                                    min="1"
                                    type="number"
                                    name="numOfAdults"
                                    value={booking.numOfAdults}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                                <div className="invalid-feedback">At least 1 adult is required.</div>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Children</label>
                                <input
                                    min="0"
                                    type="number"
                                    name="numOfChildren"
                                    value={booking.numOfChildren}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                        </div>

                        {totalPayment > 0 && (
                            <div className="alert alert-info mt-4 mb-0 d-flex justify-content-between align-items-center">
                                <span>Estimated Total:</span>
                                <strong className="fs-5">${totalPayment}</strong>
                            </div>
                        )}

                        {isSubmitted ? (
                            <div className="mt-4 d-flex gap-2">
                                <button type="button" onClick={handleBooking} className="btn btn-hotel flex-grow-1 py-2">
                                    Confirm Booking
                                </button>
                                <button type="button" onClick={() => setIsSubmitted(false)} className="btn btn-outline-secondary py-2">
                                    Edit Details
                                </button>
                            </div>
                        ) : (
                            <button type="submit" className="btn btn-hotel mt-4 w-100 py-2">
                                Continue to Confirmation
                            </button>
                        )}
                    </form>
                </div>
            )}
        </div>
    )
}

export default BookingForm
