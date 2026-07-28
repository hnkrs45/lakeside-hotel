import React from 'react';
import AddRoom from './components/room/AddRoom';
import ExistingRooms from './components/room/ExistingRooms';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import EditRoom from './components/room/EditRoom';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import RoomListing from './components/room/RoomListing';
import Admin from './components/admin/Admin';
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import Profile from './components/auth/Profile';
import RoomSearch from './components/room/RoomSearch';
import FindBooking from './components/bookings/FindBooking';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <main>
                <Router>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/browse-all-rooms" element={<RoomListing />} />
                        <Route path="/search-rooms" element={<RoomSearch />} />
                        <Route path="/find-booking" element={<FindBooking />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Registration />} />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute requiredRole="ROLE_ADMIN">
                                    <Admin />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/existing-rooms"
                            element={
                                <ProtectedRoute requiredRole="ROLE_ADMIN">
                                    <ExistingRooms />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/add-room"
                            element={
                                <ProtectedRoute requiredRole="ROLE_ADMIN">
                                    <AddRoom />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/edit-room/:roomId"
                            element={
                                <ProtectedRoute requiredRole="ROLE_ADMIN">
                                    <EditRoom />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                    <Footer />
                </Router>
            </main>
        </AuthProvider>
    );
}

export default App;
