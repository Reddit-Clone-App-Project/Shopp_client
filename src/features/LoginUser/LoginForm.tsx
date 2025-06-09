import { useState } from "react";
/*import { useSelector } from "react-redux";*/

export type LoginFormProps = { 
    onSubmit: (email: string, password: string) => void;
};

const LoginForm = ({ onSubmit }: LoginFormProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    /*const isLoading = useSelector*/

    return (
        <form 
            onSubmit={e => {
                e.preventDefault(); 
                onSubmit(email, password);
            }}
            className="absolute w-[400px] h-[234px] left-[50px] top-[48px]"
        >
            <div className="absolute w-[400px] h-[64px] left-0 top-0">
                <label htmlFor="login-email">
                    Email/Phone Number
                </label>
                <input
                    id="login-email"
                    type="text"
                    required
                    placeholder="example@email.com / 093243434"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="email"
                    className="box-border absolute w-[400px] h-[40px] left-0 top-[30px] border border-[rgba(0,0,0,0.3)] rounded-[8px]"
                />
            </div>
            <div className="absolute w-[400px] h-[64px] left-0 top-[92px]">
                <label htmlFor="login-password">
                    Password
                </label>
                <input
                    id="login-password"
                    type="password"
                    required
                    placeholder="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="box-border absolute w-[400px] h-[40px] left-0 top-[30px] border border-[rgba(0,0,0,0.3)] rounded-[8px]"
                />
            </div>
            <p className='absolute w-[119px] h-[17px] left-0 top-[177px] Inter not-italic font-normal text-sm text-purple-800 hover:underline hover:cursor-pointer'>Forget Password?</p>
            <button
                type="submit"
                /*disabled={isLoading || !email || !password}*/
                className="absolute w-[80px] h-[30px] left-0 top-[210px] bg-black rounded-[8px] text-white Inter not-italic font-normal text-sm leading-4 hover:cursor-pointer"
            >Login</button>
            <p className="absolute h-[17px] left-[150px] top-[215px] Inter not-italic font-normal text-sm text-purple-800 hover:underline hover:cursor-pointer">New to Shopp, Sign Up now!</p>
        </form>
    );
};

export default LoginForm;