import { ChangeEvent, useState } from 'react';
import './stylesheets/SignUp.scss';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

type FormValues = {
    username: string,
    email: string,
    password: string,
    password2: string,
}

const SignUp:React.FC = () => {
    const initFormValues: FormValues = { username:'' , email:'', password:'' , password2:'' };
    const [formValues, setFormValues] = useState<FormValues>(initFormValues);
    const [warnings, setWarnings] = useState<FormValues>(initFormValues);
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <div className='signup'>
            <div className='inner'>
                <h1>サインアップ</h1>
                <p className='warning'>{}</p>
                <p>UserName</p>
                <input type='text' name='username' placeholder='KaijoTaro' onChange={handleChange} />
                <p>Email</p>
                <input type='text' name='email' placeholder='mail@addres.com' onChange={handleChange} />
                <p>Password</p>
                <input type='password' name='password' placeholder='' onChange={handleChange} />
                <p>Confirm password</p>
                <input type='password' name='password2' placeholder='' onChange={handleChange} />
                <br />
                <button className='login-button' onClick={()=>{}}>
                Sign up
                </button>
            </div>
        </div>
    );
}

export default SignUp;