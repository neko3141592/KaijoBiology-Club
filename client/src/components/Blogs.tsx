import { useState } from 'react';
import './stylesheets/Blogs.scss';

type blogDataType = {
    id:string,
    title:string,
    tags:string[],
    text:string,
}

const Blogs:React.FC = () => {
    const [blogData , setBlogData] = useState<blogDataType[]|null>(null);
    return (
        <div className='blogs'>
            <div className='inner'>
                <h1>部誌一覧</h1>
                <input type='text' placeholder='Search'/>
            {
                (!blogData || !blogData.length)?
                (<></>):
                (
                    <>
                        
                    </>
                )
            }
            </div>
        </div>
    );
}

export default Blogs;