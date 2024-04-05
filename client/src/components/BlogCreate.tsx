import { useState } from 'react';
import AceEditor from "react-ace";
import { marked} from 'marked';
import parse from 'html-react-parser';
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

const BlogCreate:React.FC = () => {
    const [editorValue , setEditorValue] = useState('');
    return (
        <div className='blog-create'>
            <div className='inner'>
                <h1>部誌を作成</h1>
                <h2>サムネイル画像をアップロード</h2>
                <input type='file'accept="image/png, image/jpeg"/>
                <h2>本文</h2>
                <AceEditor
                    className={'editor'}
                    placeholder={'Markdown記法が使用できます'}
                    mode={'markdown'}
                    theme={'chrome'}
                    name={'text'}
                    fontSize={18}
                    width={'100%'}
                    height='50vh'
                    value={editorValue}
                    onChange={(value) => {setEditorValue(value);}}
                    setOptions={{ 
                        useWorker: false,
                        tabSize: 4,
                    }}
                />
                <h2>プレビュー</h2>
                <div className='preview'>
                    {parse(marked(editorValue) as string)}
                </div>
            </div>
            
        </div>
    );
}

export default BlogCreate;