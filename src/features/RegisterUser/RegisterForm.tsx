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
            className="w-full"
        >

            <div className="mb-5">
                <label htmlFor="register-email" className="block mb-1 text-sm font-medium text-gray-700">
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
                    className="box-border w-full h-10 px-3 border border-[rgba(0,0,0,0.3)] rounded-[8px]"
                />
            </div>

            <div className="mb-5">
                <label htmlFor="register-phone" className="block mb-1 text-sm font-medium text-gray-700">
                    Phone Number
                </label>
                <input
                    id="register-phone"
                    type="text"
                    minLength={8}
                    maxLength={30}
                    required
                    placeholder="+1093243434"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    autoComplete="tel"
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
                    autoComplete="new-password"
                    className="box-border w-full h-10 px-3 border border-[rgba(0,0,0,0.3)] rounded-[8px]"
                />
            </div>

            <ul className="mb-4 ml-3 space-y-1 font-light text-xs">
                <li className={classNames("flex items-center", { "text-green-600": hasMinLength && hasMaxLength, "text-gray-500": !(hasMinLength && hasMaxLength) })}>
                    <span className="mr-2">{hasMinLength && hasMaxLength ? "✓" : "X"}</span> Contain 8 to 30 characters</li>
                <li className={classNames("flex items-center", { "text-green-600": hasLowercase && hasUppercase, "text-gray-500": !(hasLowercase && hasUppercase) })}>
                    <span className="mr-2">{hasLowercase && hasUppercase ? "✓" : "X"}</span> Contain both lower and uppercase letters</li>
                <li className={classNames("flex items-center", { "text-green-600": hasNumber, "text-gray-500": !hasNumber })}>
                    <span className="mr-2">{hasNumber ? "✓" : "X"}</span> Contain 1 number</li>
                <li className={classNames("flex items-center", { "text-green-600": hasSpecialChar, "text-gray-500": !hasSpecialChar })}>
                    <span className="mr-2">{hasSpecialChar ? "✓" : "X"}</span> Contain 1 special character</li>
            </ul>

            <div className="mb-2">
                <label htmlFor="login-confirm" className="block mb-1 text-sm font-medium text-gray-700">
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
                        'box-border w-full h-10 px-3 border rounded-[8px]', 
                        {
                            'border-green-600' : isEqual && confirm.length > 0, 
                            'border-red-500' : !isEqual,
                            'border-[rgba(0,0,0,0.3)]' : confirm.length === 0 && password.length === 0 
                        }
                    )}
                />
            </div>

            <div className="mb-6 font-light text-xs h-4">
                <p className={classNames({
                        'invisible' : confirm.length === 0 && password.length === 0,
                        'text-green-600' : isEqual, 
                        'text-red-500 ' : !isEqual,
                    })}
                >
                    {isEqual ? "✓ Password match" : "X Passwords do not match"}
                </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <button
                    type="submit"
                    disabled={!email || !phone || !password || !confirm || !hasLowercase || !hasMaxLength || !hasMinLength || !hasSpecialChar || !hasUppercase || !hasNumber || !isEqual}
                    className="w-full sm:w-auto px-6 py-2 rounded-[8px] bg-black text-white font-normal text-sm leading-4 hover:cursor-pointer hover:bg-purple-800 disabled:opacity-50 disabled:hover:bg-black disabled:hover:cursor-not-allowed mb-4 sm:mb-0"  
                >Register</button>
                <p className="text-center sm:text-left text-sm text-purple-800 underline hover:no-underline hover:cursor-pointer">
                    <a href="/login">Already registered, Login now!</a></p>
            </div>

        </form>
    );
};

export default RegisterForm;