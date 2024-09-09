'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Select, MenuItem, InputLabel, FormControl, Button, Typography, Paper, Grid, Pagination } from '@mui/material';
import { fetchBookingList, sendBookingNoti} from '@/services/api';
import styles from '@/styles/BookingRequestList.module.css'; // Use a similar CSS module for styles



const BookingRequestList = () => {
  const [bookings, setBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState('PENDING');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const [resultMessage, setResultMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchBookingList(statusFilter);
        setBookings(response.data);
        setResultMessage('Successfully fetched Order data');
      } catch (err) {
        setResultMessage('Failed to fetch booking requests.');
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
      memberId: booking.memberId, 
      hospitalId: booking.hospitalId, 
      date:Date.now(), 
      status};
    sendBookingNoti(requestBody)
    alert("Notification has been sent.");
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
          <MenuItem value="PENDING">Pending</MenuItem>
          <MenuItem value="ALL">All</MenuItem>
          <MenuItem value="COMPLETED">CONFIRMED</MenuItem>
          <MenuItem value="CANCELLED">CANCELLED</MenuItem>
        </Select>
      </FormControl>

      {resultMessage && <Typography color={resultMessage.startsWith('F') ? 'red' : 'green' }> {resultMessage.startsWith('F') ? "error : " :""}{resultMessage}</Typography>}

      <Grid container spacing={2}>
        {currentBookings.map((booking) => (
          <Grid item xs={12} key={booking.id}>
            <Paper className={styles.bookingItem} elevation={3}>
              <div className={styles.bookingText}>
                <Typography variant="body1">예약 ID: {booking.id}</Typography>
                <Typography variant="body2">회원 이름: {booking.email || 'N/A'}</Typography>
                <Typography variant="body2">병원 이름: {booking.hospitalName || 'N/A'}</Typography>
                <Typography variant="body2">예약일시: {new Date(booking.date * 1000).toLocaleDateString()}</Typography>
                <Typography variant="body2">상태: {booking.status}</Typography>
              </div>
              <Button variant="outlined" color="primary" onClick={() => handleButtonClick(booking,'CONFIRMED')}>CONFIRMED</Button>
              <Button variant="outlined" color="secondary" onClick={() => handleButtonClick(booking, 'CANCELLED')}>CANCELLED</Button>
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
