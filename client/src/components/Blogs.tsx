import { useEffect, useState } from 'react';
import './stylesheets/Blogs.scss';
import  Axios, { AxiosResponse }  from 'axios';
import { base } from '../BaseURL';

type blogDataType = {
    id:string,
    title:string,
    tags:string[],
    text:string,
}

const Blogs:React.FC = () => {
    const [blogsData , setBlogsData] = useState<blogDataType[]|null>(null);
    const getBlogData = async (target:string) => {
        try {
            const res:AxiosResponse<blogDataType[]> = await Axios.get(`${base}/api/blogs/get?target=${target}`);
            setBlogsData(res.data);
        } catch (error) {
            console.error();
        }
    }
    useEffect(() => {
        getBlogData('*');
    } , []);
    return (
        <div className='blogs'>
            <div className='inner'>
                <h1>部誌一覧</h1>
                <input type='text' placeholder='Search'/>
                <br/>
            {
                (!blogsData || !blogsData.length)?
                (<></>):
                (
                    blogsData.map((docs) => {
                        return (
                            <div className='blogData' key={docs.title}>
                                <div className='image'>
                                </div>
                                <div className='data'>
                                    <h1>{docs.title}</h1>
                                    <div className='tags'>
                                    {
                                        docs.tags.map((tags) => {
                                            return (
                                                <p>#{tags}</p>
                                            );
                                        })
                                    }
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )
            }
            </div>
        </div>
    );
}

export default Blogs;