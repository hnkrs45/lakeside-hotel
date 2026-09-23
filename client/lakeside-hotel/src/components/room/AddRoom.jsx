import React from 'react'
import {addRoom} from '../utils/ApiFunctions'
import { Link } from 'react-router-dom'

const AddRoom = () => {
    const [newRoom, setNewRoom] = React.useState({
        photo: null,
        roomType: '',
        roomPrice: ''
    })

    const [imagePreview, setImagePreview] = React.useState('')
    const[successMessage, setSuccessMessage] = React.useState('')
    const[errorMessage, setErrorMessage] = React.useState('')

    const handleRoomInputChange = (e) => {
        const name = e.target.name
        let value = e.target.value
        if (name === 'roomPrice') {
            if(!isNaN(value)){
                value=parseInt(value)
            }
            else{
                value=''
            }
        }

        setNewRoom({...newRoom, [name]: value})
    }

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        if (!selectedImage) {
            return
        }

        setNewRoom({...newRoom, photo: selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice)
            if(success){
                setSuccessMessage('Room created successfully. It is now available for booking searches.')
                setNewRoom({photo: null, roomType: '', roomPrice: ''})
                setImagePreview('')
                setErrorMessage('')
            }
            else{
                setErrorMessage('Error adding new room')
            }
        }
        catch(error){
            setErrorMessage(error.message)
        }
        setTimeout(() => {
            setSuccessMessage('')
            setErrorMessage('')
        }, 3000)
    }

    return (
        <>
            <section className='container mt-5 mb-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-8 col-lg-6'>
                        <h2 className='mt-5 mb-2'>Create a Room</h2>
                        <p className='text-muted mb-4'>Create the room type, price, and photo together. Room types become available in the booking search after the room is saved.</p>
                        {successMessage && (
                            <div className='alert alert-success fade show'>{successMessage} </div>
                        )}
                        {errorMessage && (
                            <div className='alert alert-danger fade show'>{errorMessage} </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label htmlFor='roomType' className='form-label'>
                                    Room Type or Name
                                </label>
                                <input
                                    className='form-control'
                                    required
                                    id='roomType'
                                    type='text'
                                    name='roomType'
                                    value={newRoom.roomType}
                                    onChange={handleRoomInputChange}
                                    placeholder='e.g. Lakeside Deluxe'
                                />
                            </div>

                            <div className='mb-3'>
                                <label htmlFor='roomPrice' className='form-label'>
                                    Room Price
                                </label>
                                <input
                                className='form-control'
                                required
                                id='roomPrice'
                                type='number'
                                name='roomPrice'
                                value={newRoom.roomPrice}
                                onChange={handleRoomInputChange}
                                />
                            </div>

                            <div className='mb-3'>
                                <label htmlFor='photo' className='form-label'>
                                    Room Photo
                                </label>
                                <input
                                id='photo'
                                name='photo'
                                type='file'
                                className='form-control'
                                onChange={handleImageChange}

                                />
                                {imagePreview && (
                                    <img src={imagePreview} alt='Preview Room Photo'
                                    style={{maxWidth: '400px', maxHeight: '400px'}}
                                    className='mb-3' />
                                )}
                            </div>
                            
                            <div className='d-grid d-md-flex mt-2'>
                                <Link to={'/existing-rooms'} className='btn btn-outline-info me-md-2 mb-2 mb-md-0'>
                                    Back
                                </Link>
                                <button type='submit' className='btn btn-outline-primary'>
                                    Create Room
                                </button>
                            </div>
                        </form>

                        {/* {successMessage && (
                            <div className='alert alert-success mt-4' role='alert'>
                                {successMessage}
                            </div>
                        )}

                        {errorMessage && (
                            <div className='alert alert-danger mt-4' role='alert'>
                                {errorMessage}
                            </div>
                        )}

                        {addedRoom && (
                            <section className='card mt-4'>
                                <div className='card-body'>
                                    <h3 className='card-title h5'>Newly added room</h3>
                                    {addedRoom.imageUrl && (
                                        <img
                                            src={addedRoom.imageUrl}
                                            alt={addedRoom.roomType}
                                            className='img-fluid rounded mb-3'
                                            style={{ maxHeight: '250px' }}
                                        />
                                    )}
                                    <p className='mb-1'><strong>Type:</strong> {addedRoom.roomType}</p>
                                    <p className='mb-0'><strong>Price:</strong> ${addedRoom.roomPrice}</p>
                                </div>
                            </section>
                        )}

                        <section className='mt-5'>
                            <h3 className='h4'>Existing rooms</h3>
                            {roomsError && <p className='text-danger'>{roomsError}</p>}
                            {!roomsError && rooms.length === 0 && <p>No rooms found.</p>}
                            <div className='row g-3'>
                                {rooms.map((room) => (
                                    <div className='col-md-6' key={room.id}>
                                        <article className='card h-100'>
                                            <div className='card-body'>
                                                <h4 className='card-title h5'>{room.roomType}</h4>
                                                <p className='card-text mb-0'>Price: ${room.roomPrice}</p>
                                            </div>
                                        </article>
                                    </div>
                                ))}
                            </div>
                        </section> */}
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddRoom;
