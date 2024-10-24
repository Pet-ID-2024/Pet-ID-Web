import { useState } from 'react';
import ContentForm from './ContentForm';
import ContentList from './ContentList';
import ContentDetail from './ContentDetail';

export default function CMS() {
  const [contentItems, setContentItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [viewingItem, setViewingItem] = useState(null);

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

  const handleViewDetails = (id) => {
    const itemToView = contentItems.find((item) => item.id === id);
    setViewingItem(itemToView);
  };

  return (
    <div>
      {viewingItem ? (
        <ContentDetail content={viewingItem} />
      ) : (
        <ContentForm onSubmit={handleSubmit} initialData={editingItem} />
      )}
      <ContentList 
        contentItems={contentItems} 
        onDelete={handleDelete} 
        onUpdate={handleUpdate}
      />
    </div>
  );
}
