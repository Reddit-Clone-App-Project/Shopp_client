import { useState } from "react";
import classNames from 'classnames';

export type RegisterFormProps = {
    onSubmit: (email: string, phone:string, password: string, role: string) => void;
};

const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const role = 'buyer';

    const hasMinLength = password.length > 7;
    const hasMaxLength = password.length < 31;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
    const isEqual = confirm === password;

    return (
        <form 
            onSubmit={e => {
                e.preventDefault(); 
                onSubmit(email, phone, password, role);
            }}
            className="w-[400px] h-[234px] m-auto"
        >

            <div className="w-[400px] h-[64px] mt-10 mb-5">
                <label htmlFor="register-email">
                    Email
                </label>
                <input
                    id="register-email"
                    type="text"
                    required
                    placeholder="example@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="email"
                    className="box-border w-[400px] h-[40px] border border-[rgba(0,0,0,0.3)] rounded-[8px]"
                />
            </div>

            <div className="w-[400px] h-[64px] mb-5">
                <label htmlFor="register-phone">
                    Phone Number
                </label>
                <input
                    id="register-phone"
                    type="text"
                    minLength={8}
                    maxLength={30}

                    required
                    placeholder="+1 093243434"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    autoComplete="tel"
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
                    autoComplete="new-password"
                    className="box-border w-[400px] h-[40px] border border-[rgba(0,0,0,0.3)] rounded-[8px]"
                />
            </div>

            <ul className="mb-4 ml-3 font-light text-[12px]">
                <li className={hasMinLength && hasMaxLength ? "text-green-600 mb-1" : "text-gray-500 mb-1"}>
                    {hasMinLength && hasMaxLength ? "✓" : "X"} Contain 8 to 30 characters</li>
                <li className={hasLowercase && hasUppercase ? "text-green-600 mb-1" : "text-gray-500 mb-1"}>
                    {hasLowercase && hasUppercase ? "✓" : "X"} Contain both lower and uppercase letters</li>
                <li className={hasNumber ? "text-green-600 mb-1" : "text-gray-500 mb-1"}>
                    {hasNumber ? "✓" : "X"} Contain 1 number</li>
                <li className={hasSpecialChar ? "text-green-600 mb-1" : "text-gray-500 mb-1"}>
                    {hasSpecialChar ? "✓" : "X"} Contain 1 special character</li>
            </ul>

            <div className="w-[400px] h-[64px] mb-2">
                <label htmlFor="login-confirm">
                    Confirm Password
                </label>
                <input
                    id="login-confirm"
                    type="password"
                    required
                    placeholder="confirm password"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    autoComplete="new-password"
                    className={classNames(
                        'box-border w-[400px] h-[40px] border rounded-[8px]', 
                        {
                            'border-green-600' : isEqual && confirm.length > 0, 
                            'border-red-500' : !isEqual,
                            'border-[rgba(0,0,0,0.3)]' : confirm.length === 0 && password.length === 0 
                        }
                    )}
                />
            </div>

            <div className="mb-6 ml-3 font-light text-[12px]">
                <p className={classNames({
                        'invisible' : confirm.length === 0 && password.length === 0,
                        'text-green-600' : isEqual, 
                        'text-red-500 ' : !isEqual,
                    })}
                >
                    {isEqual ? "✓ Password match" : "X Passwords do not match"}
                </p>
            </div>

            <div className="flex content-center">
                <button
                    type="submit"
                    disabled={!email || !phone || !password || !confirm || !hasLowercase || !hasMaxLength || !hasMinLength || !hasSpecialChar || !hasUppercase || !hasNumber || !isEqual}
                    className="w-[80px] h-[30px] rounded-[8px] bg-black text-white Inter not-italic font-normal text-sm leading-4 hover:cursor-pointer hover:bg-purple-800 disabled:opacity-50"  
                >Register</button>
                <p className="h-[17px] left-[150px] m-auto ml-18 Inter not-italic font-light text-sm text-purple-800 underline hover:no-underline hover:cursor-pointer">
                    <a href="/login">Already registered, Login now!</a></p>
            </div>

        </form>
    );
};

export default RegisterForm;