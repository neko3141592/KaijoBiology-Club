import { useState } from 'react';
import AceEditor from "react-ace";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

const BlogCreate:React.FC = () => {
    const [editorValue , setEditorValue] = useState('');
    return (
        <div className='blog-create'>
            <AceEditor
                className={'editor'}
                placeholder={'Markdown記法が使用できます'}
                mode={'markdown'}
                theme={'chrome'}
                name={'text'}
                fontSize={18}
                width={'95%'}
                height='50vh'
                value={editorValue}
                onChange={(value) => {setEditorValue(value);}}
                setOptions={{ 
                    useWorker: false,
                    tabSize: 4,
                }}
            />
        </div>
    );
}

export default BlogCreate;