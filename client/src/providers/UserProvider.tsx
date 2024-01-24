import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useEffect, useState , createContext} from "react";
import Axios from 'axios';
import Router from "../Router";
import { base } from "../BaseURL";

export type userDataType = {
    username:string,
    email:string,
};

export const UserData = createContext<userDataType|null>(null);

const UserProvider: React.FC = () => {
    const [user] = useAuthState(auth);
    const [getData , setGetData] = useState<userDataType|null>(null);
    useEffect(() => {
        if (!user) {
            setGetData(null);
            return;
        }
        Axios.get(`${base}/api/user/get?username=&email=${user.email}`)
        .then((res) => {
            if(!res) return;
            setGetData(res.data);
        })
        .catch((error) => {
            console.log(error);
            logout();
        });
    }, [user]);
    return (
        <UserData.Provider value={getData}>
            <Router/>
        </UserData.Provider>
    );
}

export const logout = () => {
    auth.signOut();
}

export default UserProvider;