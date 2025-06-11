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
            className="w-[400px] h-[234px] m-auto"
        >
            <div className="w-[400px] h-[64px] mt-10 mb-5">
                <label htmlFor="login-email">
                    Email / Phone Number
                </label>
                <input
                    id="login-email"
                    type="text"
                    required
                    placeholder="example@email.com / 093243434"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="email"
                    className="box-border w-[400px] h-[40px] border border-[rgba(0,0,0,0.3)] rounded-[8px]"
                />
            </div>
            <div className="w-[400px] h-[64px] mb-2">
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
                    className="box-border w-[400px] h-[40px] border border-[rgba(0,0,0,0.3)] rounded-[8px]"
                />
            </div>
            <p className='w-[119px] h-[17px] mb-9 Inter not-italic font-light text-sm text-purple-800 hover:underline hover:cursor-pointer'>
                Forget Password?</p>
            <div className="flex content-center">
                <button
                    type="submit"
                    disabled={!email || !password}
                    className="w-[80px] h-[30px] bg-black rounded-[8px] text-white Inter not-italic font-normal text-sm leading-4 hover:cursor-pointer hover:bg-purple-800 disabled:opacity-50"
                >Login</button>
                <p className="h-[17px] left-[150px] m-auto ml-18 Inter not-italic font-light text-sm text-purple-800 underline hover:no-underline hover:cursor-pointer">
                    <a href="/register">New to Shopp, Sign Up now!</a></p>
            </div>
        </form>
    );
};

export default LoginForm;