import { useState, ChangeEvent} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, Auth } from 'firebase/auth';
import { auth } from '../firebase';

type FormValues = {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const initFormValues: FormValues = { email: '', password: '' };
    const [formValues, setFormValues] = useState<FormValues>(initFormValues);
    const [warning, setWarning] = useState<string>('');
    const navigate = useNavigate();

    const signIn = ():void => {
        console.log(formValues);
        signInWithEmailAndPassword(auth as Auth, formValues.email, formValues.password)
        .then((res) => {
            navigate('/');
            window.location.reload();
        })
        .catch((error) => {
            setWarning('メールアドレスまたはパスワードが違います');
            console.error(error);
        });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>):void => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <div className='login'>
            <div className='inner'>
                <h1>Kaijo Biology Club</h1>
                <p className='warning'>{warning}</p>
                <p>Email</p>
                <input type='text' name='email' placeholder='mail@addres.com' onChange={handleChange} />
                <p>Password</p>
                <input type='password' name='password' placeholder='' onChange={handleChange} />
                <br />
                <button className='login-button' onClick={signIn}>
                Login
                </button>
                <p>アカウントをお持ちではないですか?</p>
                <NavLink to={'/signup'}>アカウントを作成</NavLink>
            </div>
        </div>
    );
};

export default Login;
