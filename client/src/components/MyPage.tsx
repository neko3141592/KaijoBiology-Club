import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import  Axios, { AxiosResponse }  from 'axios';
import { base } from '../BaseURL';
import { UserDataType } from "@/types/types";


const MyPage:React.FC = () => {
    const [user , setUser] = useState<string|null>(null);
    const [userData , setUserData] = useState<UserDataType|null>(null);
    const { userID } = useParams();
    const getUserID = async (id:string):Promise<void> => {
        console.log(id);
        if(id.length === 0) return;
        try {
            const res:AxiosResponse<UserDataType> = await Axios.get(`${base}/api/user/get?username=${id}&email=`);
            setUserData(res.data);
            console.log(res.data);
        } catch (error) {
            console.error();
        }
    }
    useEffect(() => {
        if(userID) {
            getUserID(userID);
        }
    } , [userID]);
    return (
        <div className='mypage'>
            <div className='inner'>
                <h1>{userID}</h1>
                {
                    (!userData || Object.keys(userData).length === 0)?(
                        <h2>User not found</h2>
                    ):(
                        <>
                            <h2>Email: {userData?.email}</h2>
                        </>
                    )
                }
                
            </div>
        </div>
    );
}

export default MyPage;