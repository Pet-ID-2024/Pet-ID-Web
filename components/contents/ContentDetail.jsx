'use client';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Button,  
  TextField,
  FormControl,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import moment from 'moment';
import { createContent, fetchContentImgs, updateContent } from '@/services/api';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Context, ContextWatchdog } from 'ckeditor5';
import { CKEditorContext } from '@ckeditor/ckeditor5-react';

const CustomEditor = dynamic( () => import( '@/components/contents/CustomCKEditor' ), { ssr: false } );

export default function ContentDetail({ content, fetchContents , isWriting, setIsWriting, setViewingItem}) {  
  
  
  const [contentImg, setContentImg] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // For toggling edit mode
  const [selectedCategory , setSelectedCategory] = useState("TIPS");  
  const [title , setTitle] = useState("TIPS");  
  const titleRef = useRef();    
  const editorRef = useRef();  
  const categoryRef = useRef();  

  useEffect(() => {
    setIsEditing(false)
    /*
    const getContentImg = async (filePath) => {
      const response = await fetchContentImgs(filePath);
      setContentImg(response.data);
    };
    
    getContentImg(content.imageUrl);
    */
  }, [content]);

  useEffect(()=>{
    isWriting && setTitle("");
    console.log(editorRef.current);
    const editor = editorRef.current;
    editor && editor.setData("");
  },[isWriting])

  useEffect(()=>{
    setSelectedCategory(content?.category || "TIPS");
  },[content?.category ])

  const handleEditToggle = () => {
    !isEditing && setIsWriting(false);
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    deleteContent(content.contentId);
  };

  const handleSave = async () => {
    const contentData ={
      title : title,
      body : editorRef.current?.getData(),
      category : selectedCategory
    }
    const response = await createContent(contentData);
    if (response.status == "200" || response.status == "201"){
      await fetchContents();
      alert("저장되었습니다.");    
      setIsEditing(false);
      setIsWriting(false);
      setViewingItem(null);
    }else {
      alert("저장 과정에서 오류가 발생했습니다.")    
    }  
  };


  const handleUpdate = async () => {
    const contentData ={
      title : title,
      body : editorRef.current?.getData(),
      category : selectedCategory
    }
  const response = await updateContent(content.contentId, contentData);
    if (response.status == "200"){
      await fetchContents();
      alert("수정되었습니다.");    
      setIsEditing(false);
      setIsWriting(false);
      setViewingItem(null);
    }else {
      alert("저장 과정에서 오류가 발생했습니다.")    
    }    
  };
  const handleTitleChange=(event) => {
    setTitle(event.target.value);
  }

  const handleCategoryChange = useCallback((event) => {
    setSelectedCategory(event.target.value);
  }, []);

  return (
    <Card sx={{margin: 'auto' }}>
      <div className='mt-4 ml-4'>
      <label>Category: </label>
        <select value={selectedCategory || "RECOMMENDED"} disabled={(!isEditing && !isWriting) && true} onChange={handleCategoryChange} >          
          <option value="RECOMMENDED">RECOMMENDED</option>
          <option value="ABOUTPET">ABOUTPET</option>
          <option value="TIPS">TIPS</option>
          <option value="VENUE">VENUE</option>
          <option value="SUPPORT">SUPPORT</option>          
        </select>        
        </div>
      {/* Content Body */}
      <CardContent>
        {
        isWriting
        ?
        <>
        <FormControl fullWidth margin="normal">
          <TextField
            required
            label="Title"      
            value={title}                              
            onChange={handleTitleChange}
          />
        </FormControl>
        <CKEditorContext context={ Context } contextWatchdog={ ContextWatchdog }>
        <CustomEditor          
          ref = {editorRef}               
        />
        </CKEditorContext>
        </>        
        : isEditing ?
        <>
        <FormControl fullWidth margin="normal">
          <TextField
            required
            label="Title"                        
            defaultValue={content.title || ""}
            onChange={handleTitleChange}
          />
        </FormControl>
        <CKEditorContext context={ Context } contextWatchdog={ ContextWatchdog }>
        <CustomEditor
          data={content.body}             
          ref = {editorRef}       
          
          onReady={(editor) => {
            console.log("ASdfasd");
            editorRef.current = editor;
            editor.setData(content.body);
          }}
          
        />
        </CKEditorContext>
        </>
        :
        <>
        <Typography variant="h4" component="div" gutterBottom>
          {content.title}
        </Typography>    
        {/* Render content normally when not editing */}
        <div dangerouslySetInnerHTML={{ __html: content.body }} />
        </>
      }
      {content &&
      <>
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
        </>
      }
        {isWriting ?
        <Button
        variant="contained"
        color='success'
        onClick={handleSave}
        sx={{ mb: 2 }}
      >
        Save
      </Button>
        :
        <>
        {/* Edit Button */}
        <Button
          variant="contained"
          color={isEditing ? 'success' : 'primary'}
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
        </>
        }

        {/* Like Button */}
        {content &&
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color={content.isLiked ? 'primary' : 'default'}>
            {content.isLiked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {content.likesCount} {content.likesCount === 1 ? 'Like' : 'Likes'}
          </Typography>
        </div>
      }
        {/* Content Image */}
      {/*content.imageUrl && (
        <CardMedia
          component="img"
          height="300"
          image={contentImg}
          alt={content.title}
          sx={{ objectFit: 'cover' }}
        />
      )*/}
      </CardContent>
    </Card>
  );
}
