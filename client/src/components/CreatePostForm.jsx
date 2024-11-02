import { useState } from 'react';
import axios from 'axios'
import MDEditor from '@uiw/react-md-editor';
import { marked } from 'marked';
import '../index.css'; 

const CreatePostForm = () => {
  const [title, setTitle] = useState('');
  const [markdownContent, setMarkdownContent] = useState('');
  const [tags, setTags] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    const html = marked(markdownContent);
    setHtmlContent(html);
    console.log('Post créé :', { title, html, tags });

    const authorId = '603f8d0e91c1b14d881f1c8c';

    try {
      await axios.post('http://localhost:5000/api/articles', {title: title,
        content: html, // Vous pouvez utiliser html au lieu de markdownContent si vous préférez
        tags: tags.split(',').map(tag => tag.trim()),
        author: authorId, 
        createDate: new Date()})
      console.log('enregistre avec succes');
      
    } catch (error) {
      console.error('Erreur lors de la creation du post:', error.response.data);
      
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Add Cover Image Button */}
        <div className="flex justify-between items-center">
          <button type="button" className="bg-gray-100 text-gray-700 py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-200">
            Add a cover image
          </button>
          <div className="flex space-x-2">
            <button type="button" className="text-gray-500 hover:underline">Edit</button>
            <button type="button" className="text-gray-500 hover:underline">Preview</button>
          </div>
        </div>

        {/* Title Input */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New post title here..."
          className="w-full text-4xl font-bold border-none focus:ring-0 focus:outline-none"
          required
        />

        {/* Tags Input */}
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Add up to 4 tags..."
          className="w-full border-none focus:ring-0 focus:outline-none text-gray-500"
        />

        {/* Markdown Editor */}
        <MDEditor
          value={markdownContent}
          onChange={setMarkdownContent}
          className=" markdown-editor mt-4"
          
          preview="edit" // Peut être "edit", "preview" ou "live" pour voir les deux
        />

        {/* Submit and Draft Buttons */}
        <div className="flex justify-between items-center mt-6">
          <div className="flex space-x-4">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Publish
            </button>
            <button type="button" className="text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200">
              Save draft
            </button>
          </div>
          <button type="button" className="text-gray-500 hover:underline">
            Revert new changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;






