'use client';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Button,
  Input,
  TextField,
  FormControl,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import moment from 'moment';
import { fetchContentImgs, updateContent } from '@/services/api';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

export default function ContentDetail({ content }) {
  if (!content) return null;
  
  const CustomEditor = dynamic( () => import( '@/components/contents/CustomCKEditor' ), { ssr: false } );
  const [contentImg, setContentImg] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // For toggling edit mode
  const [title, setTitle] = useState('');
  const editorRef = useRef();  

  useEffect(() => {
    const getContentImg = async (filePath) => {
      const response = await fetchContentImgs(filePath);
      setContentImg(response.data);
    };

    getContentImg(content.imageUrl);
  }, [content]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDelete = () => {
    deleteContent(content.contentId);
  };

  const handleUpdate = () => {
    const contentData ={
      contentId : content.contentId,
      title : title,
      body : editorRef.current?.getData()
    }
    updateContent(contentData);
    setIsEditing(false); // Exit edit mode
  };

  const handleEditor = (editor) => {
    setEditor(editor)
  }

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto' }}>
      {/* Content Image */}
      {content.imageUrl && (
        <CardMedia
          component="img"
          height="300"
          image={contentImg}
          alt={content.title}
          sx={{ objectFit: 'cover' }}
        />
      )}
      {/* Content Body */}
      <CardContent>
      {isEditing ?
        <FormControl fullWidth margin="normal">
          <TextField
            required
            label="Title"
            defaultValue="Hello World"
            onChange={handleTitleChange}
            value={content.title}
          />
        </FormControl>
        :
        <Typography variant="h4" component="div" gutterBottom>
          {content.title}
        </Typography>    
      }
        {isEditing ? (
          // Render CKEditor when in edit mode          
          <CustomEditor
            data={content.body}             
            ref = {editorRef}       
          />
        ) : (
          // Render content normally when not editing
          <div dangerouslySetInnerHTML={{ __html: content.body }} />
        )}

        <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
          Category: {content.category}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', mb: 2 }}
        >
          Posted on: {moment.unix(content.createdAt).format('MMMM Do, YYYY')}
        </Typography>

        {/* Edit Button */}
        <Button
          variant="contained"
          color={isEditing ? 'secondary' : 'primary'}
          onClick={isEditing ? handleUpdate : handleEditToggle}
          sx={{ mb: 2 }}
        >
          {isEditing ? 'Save' : 'Edit'}
        </Button>
        
        <Button
          variant="contained"
          color="error"
          onClick={isEditing ? handleEditToggle : handleDelete}
          sx={{ mb: 2 ,  
            ...(isEditing ? { ml: 2 } : { float: 'right' }) // Conditional style
          }}
        >
          {isEditing ? 'cancel' : 'delete'}
        </Button>
        

        {/* Like Button */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color={content.isLiked ? 'primary' : 'default'}>
            {content.isLiked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {content.likesCount} {content.likesCount === 1 ? 'Like' : 'Likes'}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
