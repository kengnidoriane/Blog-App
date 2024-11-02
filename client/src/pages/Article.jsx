import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../redux/postSlice';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ReactTinymce from 'react-tinymce';
import 'tinymce/themes/silver/theme';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/media';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/table';
import 'tinymce/plugins/template';
import 'tinymce/plugins/code';
import 'tinymce/plugins/contextmenu';
import 'tinymce/plugins/imagetools';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/help';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/emoticons/default';
import 'tinymce/plugins/colorpicker';
import 'tinymce/plugins/textpattern';

function CreatePostForm() {
  const [markdown, setMarkdown] = useState('# Welcome to my blog post!');
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();

  const handleSave = (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('title', 'My Blog Post');
    formData.append('content', markdown);
    formData.append('cover_photo', coverPhoto ? coverPhoto : null);
    formData.append('tags', tags.join(','));

    dispatch(createPost(formData));
  };

  return (
    <form onSubmit={handleSave} className="create-post-form">
      <h2>Create New Post</h2>
      
      {/* Zone d'édition */}
      <div className="editor-container">
        <label htmlFor="editor" className="editor-label">Edit</label>
        <ReactTinymce
          apiKey='your-api-key'
          initialValue={markdown}
          tinymceConfig={{
            selector: 'textarea',
            width: 800,
            height: 300,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste wordcount colorpicker textpattern'
            ],
            toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
            content_style: 'body { font-family:Hiragino Sans, sans-serif; font-size:16px; }',
            setup: function(editor) {
              editor.on('Change', function() {
                setMarkdown(editor.getContent());
              });
            }
          }}
          onChange={(value) => setMarkdown(value)}
        />
      </div>

      {/* Zone de prévisualisation */}
      <div className="preview-container">
        <label htmlFor="preview" className="preview-label">Preview</label>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ node, ...props }) => <p {...props} />,
            img: ({ node, ...props }) => <img {...props} alt={node.children[0]} />,
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>

      <div className="metadata-inputs">
        <input type="text" placeholder="Title" />
        
        {/* Tags input */}
        <div className="tags-input">
          <input 
            type="text" 
            placeholder="Enter tags (comma-separated)"
            value={tags.join(',')}
            onChange={(e) => setTags(e.target.value.split(','))}
          />
          <ul>
            {tags.map((tag, index) => (
              <li key={index}>{tag.trim()}</li>
            ))}
          </ul>
        </div>

        {/* Cover Photo */}
        <input type="file" accept=".jpg, .jpeg, .png" onChange={(e) => setCoverPhoto(e.target.files[0])} />
      </div>

      <button type="submit" className="btn btn-primary">Publish Post</button>
    </form>
  );
}

export default CreatePostForm;
