import { Editor } from '@ckeditor/ckeditor5-core';
import { FileLoader } from '@ckeditor/ckeditor5-upload';

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 5 MB in binary size

// Define the custom upload adapter
class CustomUploadAdapter {
  loader: FileLoader;

  constructor(loader: FileLoader) {
    this.loader = loader;
  }

  upload(): Promise<{ default: string }> {    
    return this.loader.file
      .then((file) => {
        if (!(file instanceof Blob)) {
            return Promise.reject('The provided file is not a valid Blob.');
        }        
        if (file && file.size > MAX_FILE_SIZE) {
          return Promise.reject(`File size should be below ${MAX_FILE_SIZE / (1024 * 1024)} MB.`);
        }

        return new Promise<{ default: string }>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve({ default: reader.result as string });
          };
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file); // Converts the file to Base64
        });
      });
  }

  abort(): void {
    // Handle abort if needed
  }
}

// Plugin function to add the custom upload adapter
function CustomUploadAdapterPlugin(editor: Editor) {    
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: FileLoader) => {
    return new CustomUploadAdapter(loader);
  };
}

export default CustomUploadAdapterPlugin;
