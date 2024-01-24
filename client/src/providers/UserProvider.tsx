import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useEffect, useState , createContext} from "react";
import Axios, { AxiosError, AxiosResponse } from 'axios';
import Router from "../Router";
import { base } from "../BaseURL";

export type UserAuthType = {
    admin:boolean,
    edit:boolean,
    request:boolean,
}

export type UserDataType = {
    username:string,
    email:string,
    auth: UserAuthType,
    profile: string,
};

export const UserData = createContext<UserDataType|null>(null);

const UserProvider: React.FC = () => {
    const [user] = useAuthState(auth);
    const [getData , setGetData] = useState<UserDataType|null>(null);
    useEffect(() => {
        if (!user) {
            setGetData(null);
            return;
        }
        Axios.get(`${base}/api/user/get?username=&email=${user.email}`)
        .then((res:AxiosResponse<UserDataType>) => {
            if(!res) return;
            setGetData(res.data);
        })
        .catch((error:AxiosError<{error: string}>) => {
            console.log(error);
            Logout();
        });
    }, [user]);
    return (
        <UserData.Provider value={getData}>
            <Router/>
        </UserData.Provider>
    );
}

export const Logout = () => {
    auth.signOut();
}

export default UserProvider;