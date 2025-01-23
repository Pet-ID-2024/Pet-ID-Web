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
import { createContent, deleteContent, fetchContentImgs, sendContentNoti, updateContent } from '@/services/api';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

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

  const handleDelete = async() => {
    await deleteContent(content.contentId);
    alert("삭제되었습니다.");    
    setIsEditing(false);
    setIsWriting(false);
    setViewingItem(null);
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
      const fcm = {targetType: "TOPIC", target:"ALL", title: "contents", body:{id:response.data.contentId || -1, contentTitle : contentData.title }  }
      sendContentNoti(fcm);
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
      {(!isWriting && !isEditing) &&<h1 style={{marginBottom: '1em' }}>Content ID: {content.contentId}</h1>}
      <label>Category: </label>
        <select value={selectedCategory || "RECOMMENDED"} disabled={(!isEditing && !isWriting) && true} onChange={handleCategoryChange} >          
          <option value="ABOUTPET">어바웃펫</option>
          <option value="TIPS">반려TIP</option>
          <option value="VENUE">장소</option>
          <option value="SUPPORT">지원</option>          
          <option value="TERMS">약관</option>
          <option value="NOTICE">공지</option>          
          <option value="FAQ">FAQ</option>          
          <option value="PRIVACY_POLICY">개인정보 처리방침</option>
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
        <CustomEditor          
          ref = {editorRef}               
        />
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
        
        <CustomEditor
          data={content.body}             
          ref = {editorRef}       
          onReady={(editor) => {            
            editorRef.current = editor;
            editor.setData(content.body);
          }}
          
        />
        
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
        sx={{ mb: 2 , mt:1}}
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
