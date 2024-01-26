import { useParams } from "react-router-dom";
import './stylesheets/Blogs.scss';
import { blogDataType} from "./Blogs";
import { useEffect, useState } from "react";
import  Axios, { AxiosResponse }  from 'axios';
import { base } from '../BaseURL';
import { marked } from 'marked';

const BlogPage:React.FC = () => {
    
    const { blogID } = useParams();
    const [blogData , setBlogData] = useState<blogDataType[]|null>(null);
    const getBlogData = async (target:string):Promise<void> => {
        if(target.length === 0) target = '*';
        try {
            const res:AxiosResponse<blogDataType[]> = await Axios.get(`${base}/api/blogs/get?target=${target}&option=all`);
            setBlogData(res.data);
        } catch (error) {
            console.error();
        }
    }
    useEffect(() => {
        if(blogID) {
            getBlogData(blogID);
        }
    } , [blogID]);
    return (
        <div className='blog-page'>
            <div className='inner'>
                <h1>{blogData?.[0]?.title}</h1>
                <div></div>
            </div>
        </div>
    );
}

export default BlogPage;