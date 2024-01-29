import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import  Axios  from 'axios';
import { base } from '../BaseURL';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

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
    const [serverError , setServerError] = useState<string|null>(null);
    const Navigate = useNavigate();


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async ():Promise<void> =>  {
        const errors = await validate();
        if(Object.keys(errors).length !== 0) {
            setWarnings(errors);
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, formValues.email, formValues.password);
            await Axios.post(`${base}/api/user/create?username=${formValues.username}&email=${formValues.email}`);
            Navigate('/');
            window.location.reload();
        } catch (error:any) {
            console.error(error);
            setServerError('不明なエラーが発生しました');
        }
        
    }

    const validate = async ():Promise<any> => {
        const errors:any = {};
        const username_regex = new RegExp(/^[ -~]+$/);
        const email_regex = new RegExp(/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/);
        const password_regex = new RegExp(/^[ -~]+$/);
        if (!formValues.username) {
            errors.username = '入力してください';
        } else if (!username_regex.test(formValues.username)) {
            errors.username = '半角英数との記号み使用可能です';
        } else {
            try {
                const res = await Axios.get(`${base}/api/user/get?username=${formValues.username}&email=`);
                if(Object.keys(res.data).length !== 0) {
                    errors.username = 'そのユーザー名は既に使用されています';
                }
            } catch {
                console.error('error');
            }
        }
        if (!formValues.email) {
            errors.email = '入力してください';
        } else if (!email_regex.test(formValues.email)) {
            errors.email = '有効なメールアドレスを入力してください';
        } else {
            try {
                const res = await Axios.get(`${base}/api/user/get?username=&email=${formValues.email}`);
                if(Object.keys(res.data).length !== 0) {
                    errors.email = 'そのメールアドレスは既に使用されています';
                }
            } catch {
                console.error('error');
            }
        }
        if (!formValues.password) {
            errors.password = '入力してください';
        } else if (!password_regex.test(formValues.password)) {
            errors.password = '半角英数と記号のみ使用可能です';
        } else if (formValues.password.length < 6) {
            errors.password = 'パスワード6文字以上である必要があります';
        }
        if(formValues.password !== formValues.password2) {
            errors.password2 = 'パスワードが一致しません';
        }
        return errors;
    }

    return (
        <div className='signup'>
            <div className='inner'>
                <h1>サインアップ</h1>
                <p>UserName</p>
                <input type='text' name='username' placeholder='Kaijo_Mushio' onChange={handleChange} />
                <p className='warning'>{warnings.username}</p>
                <p>Email</p>
                <input type='text' name='email' placeholder='mail@addres.com' onChange={handleChange} />
                <p className='warning'>{warnings.email}</p>
                <p>Password</p>
                <input type='password' name='password' placeholder='' onChange={handleChange} />
                <p className='warning'>{warnings.password}</p>
                <p>Confirm password</p>
                <input type='password' name='password2' placeholder='' onChange={handleChange} />
                <p className='warning'>{warnings.password2}</p>
                <p className="warning">{serverError}</p>
                <br />
                <button className='login-button' onClick={handleSubmit}>
                Sign up
                </button>
            </div>
        </div>
    );
}

export default SignUp;