'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Select, MenuItem, InputLabel, FormControl, Button, Typography, Paper, Grid, Pagination } from '@mui/material';
import { fetchBookingList, sendBookingNoti} from '@/services/api';
import styles from '@/styles/BookingRequestList.module.css'; // Use a similar CSS module for styles



const BookingRequestList = () => {
  const [bookings, setBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState('COMPLETED');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchBookingList(statusFilter);
        setBookings(response.data);
      } catch (err) {
        setError('Failed to fetch booking requests.');
        console.error('Error fetching booking requests:', err);
      }
    };

    fetchData();
  }, [statusFilter]);

  const handleStatusFilterChange = (e) => setStatusFilter(e.target.value);
  const handlePageChange = (event, value) => setCurrentPage(value);
  const handleButtonClick = (booking,status) => {
    // Handle button click logic here, e.g., update booking status based on buttonType
    const requestBody = {
      id :booking.id, 
      uid: booking.uid, 
      hospitalId: booking.hospitalId, 
      date:Date.now(), 
      status};
    console.log(requestBody);
    sendBookingNoti(requestBody)
    //console.log(`USER UID: ${uid}, status: ${status}`);
  };

  const indexOfLastBooking = currentPage * itemsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - itemsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

  return (
    <div className={styles.bookingRequestList}>
      <Typography variant="h4" gutterBottom>Booking Request List</Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Status Filter</InputLabel>
        <Select value={statusFilter} onChange={handleStatusFilterChange}>
          <MenuItem value="ALL">All</MenuItem>
          <MenuItem value="COMPLETED">Completed</MenuItem>
          <MenuItem value="CANCELLED">Cancelled</MenuItem>
          <MenuItem value="PENDING">Pending</MenuItem>
        </Select>
      </FormControl>

      {error && <Typography color="error">Error: {error}</Typography>}

      <Grid container spacing={2}>
        {currentBookings.map((booking) => (
          <Grid item xs={12} key={booking.id}>
            <Paper className={styles.bookingItem} elevation={3}>
              <div className={styles.bookingText}>
                <Typography variant="body1">Booking ID: {booking.id}</Typography>
                <Typography variant="body2">UID: {booking.uid || 'N/A'}</Typography>
                <Typography variant="body2">Hospital ID: {booking.hospitalId}</Typography>
                <Typography variant="body2">Date: {new Date(booking.date * 1000).toLocaleDateString()}</Typography>
                <Typography variant="body2">Status: {booking.status}</Typography>
              </div>
              <Button variant="outlined" color="primary" onClick={() => handleButtonClick(booking,'CONFIRMED')}>C</Button>
              <Button variant="outlined" color="secondary" onClick={() => handleButtonClick(booking, 'CANCELLED')}>F</Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={Math.ceil(bookings.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        className={styles.pagination}
      />
    </div>
  );
};

export default BookingRequestList;
