
import { useState } from 'react';
import { marked } from 'marked'
import { Bold,Code,Eye,EyeOff, Italic,ListOrdered, List, Image, Link, Heading,Quote,EllipsisVertical,Table, Underline,Strikethrough, CircleHelp } from 'lucide-react';
import { Button } from './/ButtonForm'; 
import './css/CreatePostForm.css'

const toolbarActions = [
  {
    icon: <Bold size={20} />,
    name: 'Bold',
    action: (insertText) => insertText('**', '**')
  },
  {
    icon: <Italic size={20} />,
    name: 'Italic',
    action: (insertText) => insertText('_', '_')
  },
  {
    icon: <ListOrdered size={20} />,
    name: 'unordered List',
    action: (insertText) => insertText('\n1. ')
  },
  {
    icon: <List size={20} />,
    name: 'ordered List',
    action: (insertText) => insertText('\n- ')
  },
  {
    icon: <Image size={20} />,
    name: 'Image',
    action: (insertText) => insertText('![alt](', ')'),
  },
  {
    icon: <Link size={20} />,
    name: 'Link',
    action: (insertText) => insertText('[texte](', ')')
  },
  {
    icon: <Heading size={20}/>,
    name: 'Heading',
    action: (insertText) => insertText('#', '')
  },
  {
    icon: <Quote size={20}/>,
    name: 'Quote',
    action: (insertText) => insertText('> ', '')
  },
  {
    icon: <Code size={20}/>,
    name: 'Code',
    action: (insertText) => insertText('`', '`')
  },
  {
    icon: <Underline size={20}/>,
    name: 'Underline',
    action: (insertText) => insertText('__', '__')
  },
  {
    icon: <Strikethrough size={20}/>,
    name: 'Barré',
    action: (insertText) => insertText('~~', '~~')
  },
  {
    icon: <CircleHelp size={20}/>,
    name: 'Help',
    action: (insertText) => insertText('?', '')
  },
  {
    icon: <Table size={20} />, 
    name: 'Table',
    action: (insertText) => insertText('| En-tête 1 | En-tête 2 | En-tête 3 |\n| ----------- | ----------- | ----------- |\n| Ligne 1 | Colonne 1 | Colonne 2 |\n| Ligne 2 | Colonne 1 | Colonne 2 |\n| Ligne 3 | Colonne 1 | Colonne 2 |\n')
  },
];


function CreatePostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showMore, setshowMore] = useState(false);
  const [showPreview, setShowPreview] = useState(false);


  const createMarkdownPreview = () => {
    return {__html: marked(content)}
  }

  const insertText = (before, after = '') => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = textarea.value.substring(start, end);
      const newText = before + selectedText + after;
      
      const newContent = 
        textarea.value.substring(0, start) +
        newText +
        textarea.value.substring(end);
      
      setContent(newContent);

      // Attendre le prochain cycle pour définir la sélection
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(
          start + before.length,
          start + before.length + selectedText.length
        );
      }, 0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const html = marked(content)
    console.log({title, html });
  };

  return (
    <div className=" bg-gray-50 p-2">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className='flex justify-end mb-1'>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className='flex items-center rounded-md px-6 py-2 text-white gap-2 bg-green-800 hover:bg-green-700 transition-all duration-1000 ease-in-out'
            
          >
            {showPreview ? (
              <>
                Hide Preview
                <EyeOff size={16} />
              </>
            ) : (
              <>
                Preview
                <Eye size={16} />
              </>
            )}
          </button>
        </div>
        <div className='grid grid-cols-1'>
            <div className={` ${showPreview ? 'hidden' : 'block'}`}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <input className="w-full  text-4xl font-medium text-gray-700 mt-10 mb-10 outline-none" 
                        placeholder='Title of the new Post here ...'
                        onChange={(e) => setTitle(e.target.value)} />
                   
                  <div className="relative flex justify-between gap-2 p-2 bg-gray-50">
                    <div>
                      {toolbarActions.slice(0, 7).map((action, index) => (
                        <Button
                          key={index}
                          onClick={() => action.action(insertText)}
                          title={action.name}
                          variant="outline"
                          className="p-2 hover:bg-green-200"
                        >
                          {action.icon}
                        </Button>
                      ))}
                    </div>
                    <button onClick = {() =>setshowMore(!showMore)}>
                      <EllipsisVertical size={20}/>
                    </button>
                    {
                      showMore && (
                        <div className= 'absolute top-full right-0 mt-1 bg-gray border rounded-md shadow-lg z-10'>
                          {
                            toolbarActions.slice(7).map((action, index) => (
                              <Button
                                key={index}
                                onClick={() => action.action(insertText)}
                                title={action.name}
                                variant="outline"
                                className="p-3 hover:bg-green-200"
                              >
                              {action.icon}
                              </Button>
                            ))
                          }
                        </div>
                      )
                    }
                  </div>

                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onClick={() => setshowMore(false)}
                    placeholder="Contenu de l'article (format Markdown)"
                    className="w-full h-[calc(100vh-400px)] p-4 border border-gray-300 rounded-b-md font-mono focus:outline-none resize-none"
                  />
                </div>

                <div className="flex justify-start">
                  <button 
                    type="submit"
                    className="bg-green-800 hover:bg-green-700 text-white px-6 py-2 rounded-md "
                  >
                    Publier
                  </button>
                </div>
              </form> 
            </div>
            <div className={` ${showPreview ? 'block' : 'hidden'} mt-2`}>
              {showPreview && (
                <div className="apercu p-4 rounded-lg bg-white">
                  <h3 className="text-lg font-semibold mb-4">Aperçu :</h3>
                  <div className="prose max-w-none overflow-auto h-[calc(100vh-300px)]"
                      dangerouslySetInnerHTML={createMarkdownPreview()}
                  />    
                </div>
              )}
            </div>
        </div> 
      </div>
    </div>
  );
}

export default CreatePostForm;
