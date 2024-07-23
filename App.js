import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [photoDescription, setPhotoDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [editMode, setEditMode] = useState(null); // Track which photo is being edited

  useEffect(() => {
    const storedPhotos = JSON.parse(localStorage.getItem('photos')) || [];
    setPhotos(storedPhotos);
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadSubmit = () => {
    if (!selectedFile || !photoDescription) return;

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    reader.onload = () => {
      const newPhoto = {
        id: Date.now(),
        name: selectedFile.name,
        description: photoDescription,
        imageUrl: reader.result,
      };

      const updatedPhotos = [...photos, newPhoto];
      setPhotos(updatedPhotos);
      savePhotosToLocalStorage(updatedPhotos);

      // Clear input fields after upload
      setPhotoDescription('');
      setSelectedFile(null);
    };

    reader.onerror = () => {
      console.error('Failed to read the file');
    };
  };

  const handleDescriptionChange = (id, description) => {
    const updatedPhotos = photos.map(photo =>
      photo.id === id ? { ...photo, description: description } : photo
    );
    setPhotos(updatedPhotos);
    savePhotosToLocalStorage(updatedPhotos);
  };

  const handleDeletePhoto = (id) => {
    const updatedPhotos = photos.filter(photo => photo.id !== id);
    setPhotos(updatedPhotos);
    savePhotosToLocalStorage(updatedPhotos);
  };

  const handleEditPhoto = (id) => {
    setEditMode(id);
  };

  const handleSaveEdit = (id, newPhoto) => {
    const updatedPhotos = photos.map(photo =>
      photo.id === id ? newPhoto : photo
    );
    setPhotos(updatedPhotos);
    setEditMode(null);
    savePhotosToLocalStorage(updatedPhotos);
  };

  const savePhotosToLocalStorage = (photosToSave) => {
    // Store only necessary data (IDs, descriptions, etc.) to avoid quota issues
    const simplifiedPhotos = photosToSave.map(photo => ({
      id: photo.id,
      description: photo.description,
      imageUrl: photo.imageUrl,
    }));
    localStorage.setItem('photos', JSON.stringify(simplifiedPhotos));
  };

  return (
    <div className="App">
      <h1>Photo Album</h1>
      <div className="upload-form">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <textarea
          value={photoDescription}
          onChange={(e) => setPhotoDescription(e.target.value)}
          placeholder="Enter description..."
        />
        <button onClick={handleUploadSubmit}>Upload</button>
      </div>
      <div className="photo-grid">
        {photos.map(photo => (
          <div className="photo-card" key={photo.id}>
            <img src={photo.imageUrl} alt={photo.name} />
            {editMode === photo.id ? (
              <textarea
                value={photo.description}
                onChange={(e) => handleDescriptionChange(photo.id, e.target.value)}
                placeholder="Edit description..."
              />
            ) : (
              <p>{photo.description}</p>
            )}
            <div className="button-group">
              <button onClick={() => handleDeletePhoto(photo.id)}>Delete</button>
              {editMode === photo.id ? (
                <button onClick={() => handleSaveEdit(photo.id, photo)}>Save</button>
              ) : (
                <button onClick={() => handleEditPhoto(photo.id)}>Edit</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
