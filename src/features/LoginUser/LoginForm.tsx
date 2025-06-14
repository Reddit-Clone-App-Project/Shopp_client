import { useState } from "react";
/*import { useSelector } from "react-redux";*/

export type LoginFormProps = { 
    onSubmit: (email: string, password: string) => void;
};

const LoginForm = ({ onSubmit }: LoginFormProps) => {
    const [eOrP, setEOrP] = useState('');
    const [password, setPassword] = useState('');
    /*const isLoading = useSelector*/

    return (
        <form 
            onSubmit={e => {
                e.preventDefault(); 
                onSubmit(eOrP, password);
            }}
            className="w-full" 
        >
            <div className="mb-5">
                <label htmlFor="login-email" className="block mb-1 text-sm font-medium text-gray-700">
                    Email / Phone Number
                </label>
                <input
                    id="login-email"
                    type="text"
                    required
                    placeholder="example@email.com / 093243434"
                    value={eOrP}
                    onChange={e => setEOrP(e.target.value)}
                    autoComplete="email"
                    className="box-border w-full h-10 px-3 border border-[rgba(0,0,0,0.3)] rounded-[8px]"
                />
            </div>
            <div className="mb-2">
                <label htmlFor="login-password" className="block mb-1 text-sm font-medium text-gray-700">
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
                    className="box-border w-full h-10 px-3 border border-[rgba(0,0,0,0.3)] rounded-[8px]"
                />
            </div>
            <p className='mb-6 text-sm font-light text-purple-800 hover:underline hover:cursor-pointer'>
                Forget Password?</p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <button
                    type="submit"
                    disabled={!eOrP || !password}
                    className="w-full sm:w-auto px-6 py-2 bg-black rounded-[8px] text-white font-normal text-sm leading-4 hover:cursor-pointer hover:bg-purple-800 disabled:opacity-50 mb-4 sm:mb-0"
                >Login</button>
                <p className="text-center sm:text-left text-sm text-purple-800 underline hover:no-underline hover:cursor-pointer">
                    <a href="/register">New to Shopp, Sign Up now!</a></p>
            </div>
        </form>
    );
};

export default LoginForm;