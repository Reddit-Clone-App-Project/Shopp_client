import { useState } from "react";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form className="absolute w-[400px] h-[234px] left-[50px] top-[48px]">
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
        </form>
    );
};

export default LoginForm;



