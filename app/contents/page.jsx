'use client'

import { useEffect, useState } from 'react';
import ContentForm from '@/components/contents/ContentForm';
import ContentList from '@/components/contents/ContentList';
import ContentDetail from '@/components/contents/ContentDetail';
import {fetchContentList} from '@/services/api';
import { Button, Grid } from '@mui/material';

export default function CMS() {
  const [contentItems, setContentItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);  
  const [viewingItem, setViewingItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [loading, setLoading] = useState(false);
  const [isWriting, setIsWriting] = useState(false);

  const fetchContents = async () => {
    const response = await fetchContentList(selectedCategory);
    setContentItems(response.data || []);
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        fetchContents();
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [selectedCategory]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubmit = (formData) => {
    const newItem = {
      id: editingItem ? editingItem.id : Date.now(),
      title: formData.get('title'),
      content: formData.get('content'),
      image: formData.get('image')
    };

    if (editingItem) {
      setContentItems((prevItems) =>
        prevItems.map((item) => (item.id === editingItem.id ? newItem : item))
      );
      setEditingItem(null);
    } else {
      setContentItems([...contentItems, newItem]);
    }
  };

  const handleDelete = (id) => {
    setContentItems(contentItems.filter((item) => item.id !== id));
  };

  const handleUpdate = (id) => {
    const itemToEdit = contentItems.find((item) => item.id === id);
    setEditingItem(itemToEdit);
  };

  const handleViewDetails = (contentId, event) => {
    if (event.target.nodeName === 'BUTTON'){
      return;
    }
    const itemToView = contentItems.find((item) => item.contentId === contentId);
    setIsWriting(false);
    setViewingItem(itemToView);
  };

  const handleCreate = (id) => {
    setIsWriting(!isWriting);
    setViewingItem(null);
  };

  return (
    <div className="w-screen">
      <div className= "w-1/2 p-2">
        <label>Select Category: </label>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="ALL">ALL</option>
          <option value="RECOMMENDED">RECOMMENDED</option>
          <option value="ABOUTPET">ABOUTPET</option>
          <option value="TIPS">TIPS</option>
          <option value="VENUE">VENUE</option>
          <option value="SUPPORT">SUPPORT</option>          
        </select>
        <Button className='float-right ' variant='outlined' color="success" onClick={handleCreate}>Create</Button>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          
          {/* Right half: Content List */}
          {!loading && (
            <ContentList
              contentItems={contentItems}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onViewDetails={handleViewDetails}
            />
          )}
        </Grid>
        
        <Grid item xs={12} md={6}>
          {/* Left half: Content Detail */}
          {(viewingItem || isWriting )&& (
            <ContentDetail 
            setViewingItem={setViewingItem} 
            content={viewingItem} 
            setIsWriting={setIsWriting} 
            isWriting={isWriting} 
            fetchContents = {fetchContents}/>

          )}
        </Grid>
      </Grid>
    </div>
  );
}


