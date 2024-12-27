// src/pages/CreatePostPage.js
import CreatePostForm from '../components/CreatePostForm';
// import { useNavigate } from 'react-router-dom';

const CreatePostPage = () => {
  

  // const navigate = useNavigate();

  // const handleBack = () => {
  //   navigate(-1);
  // };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Créer un nouveau post</h1>
      <CreatePostForm />
      
    </div>
  );
};

export default CreatePostPage;



// import React, { useState } from 'react';
// import ReactMarkdown from 'react-markdown';
// import TextareaAutosize from 'react-textarea-autosize';

// // Composant pour l'éditeur Markdown avec aperçu en temps réel
// const PostEditor = ({ content, setContent }) => {
//   return (
//     <div style={{ flex: 1 }}>
//       <h2>Éditeur Markdown</h2>
//       <TextareaAutosize
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         placeholder="Écrivez votre article ici en Markdown..."
//         minRows={10}
//         style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
//       />
//       <h2>Aperçu</h2>
//       <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
//         <ReactMarkdown>{content}</ReactMarkdown>
//       </div>
//     </div>
//   );
// };

// // Composant pour gérer l'ajout de balises (tags)
// const TagInput = ({ tags, setTags }) => {
//   const [input, setInput] = useState('');

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && input) {
//       setTags([...tags, input]);
//       setInput('');
//     }
//   };

//   const removeTag = (indexToRemove) => {
//     setTags(tags.filter((_, index) => index !== indexToRemove));
//   };

//   return (
//     <div>
//       <h2>Ajouter des balises</h2>
//       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', border: '1px solid #ccc', padding: '10px' }}>
//         {tags.map((tag, index) => (
//           <div key={index} style={{ background: '#007bff', color: '#fff', padding: '5px 10px', borderRadius: '5px' }}>
//             {tag} <button onClick={() => removeTag(index)} style={{ marginLeft: '5px' }}>x</button>
//           </div>
//         ))}
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={handleKeyDown}
//           placeholder="Appuyez sur 'Entrée' pour ajouter une balise"
//           style={{ border: 'none', outline: 'none', flex: 1 }}
//         />
//       </div>
//     </div>
//   );
// };

// // Composant pour ajouter une image de couverture
// const CoverImage = ({ setCoverImage }) => {
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (upload) => setCoverImage(upload.target.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div>
//       <h2>Image de couverture</h2>
//       <input type="file" accept="image/*" onChange={handleImageChange} />
//     </div>
//   );
// };

// // Composant principal pour la page de création de post
// const PostCreationPage = () => {
//   const [content, setContent] = useState(''); // Contenu Markdown
//   const [tags, setTags] = useState([]); // Liste des balises
//   const [coverImage, setCoverImage] = useState(null); // Image de couverture

//   const handleSubmit = () => {
//     // Fonction de soumission (à adapter selon votre backend)
//     console.log("Contenu :", content);
//     console.log("Balises :", tags);
//     console.log("Image de couverture :", coverImage);
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
//       <h1>Créer un nouvel article</h1>

//       {/* Éditeur Markdown */}
//       <PostEditor content={content} setContent={setContent} />

//       {/* Ajout des balises */}
//       <TagInput tags={tags} setTags={setTags} />

//       {/* Image de couverture */}
//       <CoverImage setCoverImage={setCoverImage} />

//       {/* Aperçu de l'image de couverture */}
//       {coverImage && (
//         <div style={{ marginTop: '20px' }}>
//           <h2>Aperçu de l`'`image de couverture</h2>
//           <img src={coverImage} alt="Cover" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
//         </div>
//       )}

//       {/* Bouton de soumission */}
//       <button
//         onClick={handleSubmit}
//         style={{
//           marginTop: '20px',
//           padding: '10px 20px',
//           backgroundColor: '#28a745',
//           color: '#fff',
//           border: 'none',
//           borderRadius: '5px',
//           cursor: 'pointer'
//         }}
//       >
//         Publier
//       </button>
//     </div>
//   );
// };

// export default PostCreationPage;
