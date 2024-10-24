import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';

export default function ContentList({ contentItems, onDelete, onUpdate, onViewDetails }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentContentId, setCurrentContentId] = React.useState(null);

  const handleClick = (event, contentId) => {
    setAnchorEl(event.currentTarget);
    setCurrentContentId(contentId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentContentId(null);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#6C63FF', color: '#FFF' }}>Title</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#6C63FF', color: '#FFF' }}>category</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#6C63FF', color: '#FFF' }}>date</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#6C63FF', color: '#FFF' }}>likes</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#6C63FF', color: '#FFF' }}>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contentItems.map((item) => (
            <TableRow key={item.contentId}
              hover
              sx={{ cursor: 'pointer' }}
              onClick={(event) => onViewDetails(item.contentId, event)} >
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.createdAt}</TableCell>
              <TableCell>{item.likesCount}</TableCell>
              <TableCell>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={(e) => handleClick(e, item.contentId)}
                >
                  Action
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl) && currentContentId === item.contentId}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => onViewDetails(item.contentId)}>View Details</MenuItem>
                  <MenuItem onClick={() => onUpdate(item.contentId)}>Update</MenuItem>
                  <MenuItem onClick={() => onDelete(item.contentId)}>Delete</MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
