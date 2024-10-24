'use client';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import moment from 'moment';
import { fetchContentImgs } from '@/services/api';
import { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function ContentDetail({ content }) {
  if (!content) return null;

  const [contentImg, setContentImg] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // For toggling edit mode
  const [editableContent, setEditableContent] = useState(content.body); // Content for CKEditor

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

  const handleSave = () => {
    // Here, you can handle saving the updated content, such as sending it to the server
    console.log('Updated Content:', editableContent);
    setIsEditing(false); // Exit edit mode
  };

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
        <Typography variant="h4" component="div" gutterBottom>
          {content.title}
        </Typography>

        {isEditing ? (
          // Render CKEditor when in edit mode
          <CKEditor
            editor={ClassicEditor}
            data={editableContent}
            onChange={(event, editor) => {
              const data = editor.getData();
              setEditableContent(data);
            }}
          />
        ) : (
          // Render content normally when not editing
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            <div dangerouslySetInnerHTML={{ __html: editableContent }} />
          </Typography>
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
          onClick={isEditing ? handleSave : handleEditToggle}
          sx={{ mb: 2 }}
        >
          {isEditing ? 'Save' : 'Edit'}
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
