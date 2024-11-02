import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import CodeMirror from '@uiw/react-codemirror';

const CustomMarkdownEditor = () => {
  const [markdownContent, setMarkdownContent] = useState('');
  
  const handleCommand = (command) => {
    switch(command) {
      case 'preview':
        // Logique pour la prévisualisation
        break;
      case 'save':
        // Logique pour sauvegarder
        break;
      default:
        console.log(`Commande non gérée: ${command}`);
    }
  };

  return (
    <div className="editor-container">
      <CustomToolbar />
      
      <textarea
        value={markdownContent}
        onChange={(e) => setMarkdownContent(e.target.value)}
        placeholder="Saisissez votre Markdown ici..."
      />

      <CodeMirror
        value={markdownContent}
        onChange={(editor, change) => setMarkdownContent(change.editor.getValue())}
        options={{
          mode: 'markdown',
          lineNumbers: true,
          theme: 'default',
          styleActiveLine: true,
          autoCloseTags: true,
        }}
      />
    </div>
  );
};


export default CustomMarkdownEditor;
