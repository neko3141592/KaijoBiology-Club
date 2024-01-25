import {NavLink} from 'react-router-dom';
import { useState , useEffect, useContext } from 'react';
import './stylesheets/Header.scss';
import { UserData, Logout, UserDataType } from '../providers/UserProvider';

const Header:React.FC = () => {
    const userData = useContext<UserDataType|null>(UserData);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const toggleVisibility = () => {
        window.scrollY > 10
            ? setIsVisible(true)
            : setIsVisible(false)
    }
    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility)
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])
    return (
        <div>
            <div className={`list ${isVisible?'display':''}`}>
                <div className='list-left'>
                    <NavLink to={'/'}>K<span>aijo</span> B<span>iology</span> C<span>lub</span></NavLink>
                </div>
                <div className='list-right'>
                    <NavLink to={'/about'}>About</NavLink>
                    <NavLink to={'/blogs'}>Blogs</NavLink>
                    <NavLink to={'/achievement'}>Achievement</NavLink>
                {
                    (!userData || Object.keys(userData).length === 0)?
                    (
                        <>
                            <NavLink to={'/login'}>Login</NavLink>
                        </>
                    ):(
                        <>
                            <NavLink to={`/user/${userData.username}`} className='user'>{userData.username}</NavLink>
                            <NavLink to={'/'} onClick={Logout}>Logout</NavLink>
                        </>
                    )
                }
                </div>
            </div>
        </div>
    );
}

export default Header;