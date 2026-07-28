import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:9192'
});

export const getHeader = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    };
};

export const getMultipartHeader = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    };
};

/* --- AUTHENTICATION API CALLS --- */
export async function registerUser(registration) {
    try {
        const response = await api.post("/auth/register-user", registration);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || error.response.data);
        } else {
            throw new Error(`User registration failed: ${error.message}`);
        }
    }
}

export async function loginUser(login) {
    try {
        const response = await api.post("/auth/login", login);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            return null;
        }
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || "Invalid credentials");
        } else {
            throw new Error(`Login failed: ${error.message}`);
        }
    }
}

export async function getUserProfile(email, token) {
    try {
        const response = await api.get(`/users/${email}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function deleteUser(email) {
    try {
        const response = await api.delete(`/users/delete/${email}`, getHeader());
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

/* --- ROOM API CALLS --- */
export async function addRoom(photo, roomType, roomPrice) {
    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('roomType', roomType);
    formData.append('roomPrice', roomPrice);

    const response = await api.post('/rooms/add/new-room', formData, getMultipartHeader());
    return response.status >= 200 && response.status < 300;
}

export async function getRoomTypes() {
    try {
        const response = await api.get('/rooms/types');
        return response.data;
    } catch (error) {
        throw new Error('Error fetching room types');
    }
}

export async function getAllRooms() {
    try {
        const result = await api.get('/rooms/all-rooms');
        return result.data;
    } catch (error) {
        throw new Error('Error fetching rooms');
    }
}

export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
    try {
        const result = await api.get(
            `/rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`
        );
        return result.data;
    } catch (error) {
        throw new Error('Error fetching available rooms');
    }
}

export async function deleteRoom(roomId) {
    try {
        const result = await api.delete(`/rooms/delete/room/${roomId}`, getHeader());
        return result.data;
    } catch (error) {
        throw new Error(`Error deleting room: ${error.message}`);
    }
}

export async function updateRoom(roomId, roomData) {
    const formData = new FormData();
    formData.append('roomType', roomData.roomType);
    formData.append('roomPrice', roomData.roomPrice);
    if (roomData.photo) {
        formData.append('photo', roomData.photo);
    }
    const response = await api.put(`/rooms/update/${roomId}`, formData, getMultipartHeader());
    return response;
}

export async function getRoomById(roomId) {
    try {
        const result = await api.get(`/rooms/room/${roomId}`);
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching room: ${error.message}`);
    }
}

/* --- BOOKING API CALLS --- */
export async function bookRoom(roomId, booking) {
    try {
        const response = await api.post(`/bookings/room/${roomId}/booking`, booking);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || error.response.data);
        } else {
            throw new Error(`Error booking room: ${error.message}`);
        }
    }
}

export async function getAllBookings() {
    try {
        const result = await api.get("/bookings/all-bookings", getHeader());
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching bookings: ${error.message}`);
    }
}

export async function getBookingsByUserId(email, token) {
    try {
        const response = await api.get(`/bookings/user/${email}/bookings`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching user bookings: ${error.message}`);
    }
}

export async function getBookingByConfirmationCode(confirmationCode) {
    try {
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`);
        return result.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || error.response.data);
        } else {
            throw new Error(`Error finding booking: ${error.message}`);
        }
    }
}

export async function cancelBooking(bookingId) {
    try {
        const result = await api.delete(`/bookings/booking/${bookingId}/delete`, getHeader());
        return result.data;
    } catch (error) {
        throw new Error(`Error cancelling booking: ${error.message}`);
    }
}

/* --- ANALYTICS API CALLS --- */
export async function getAnalyticsSummary() {
    try {
        const response = await api.get("/analytics/summary", getHeader());
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching analytics: ${error.message}`);
    }
}