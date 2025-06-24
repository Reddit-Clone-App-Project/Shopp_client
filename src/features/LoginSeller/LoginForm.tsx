import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// import { handleLogin, handleGetProfile } from '../Auth/AuthSlice';
import { handleLogin } from '../Auth/AuthSlice';
import type { AppDispatch, RootState } from '../../redux/store';

const LoginForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/admin-dashboard';

  const { register, handleSubmit, formState: { errors } } = useForm();

  const { status, error, isLoggedIn } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(from, { replace: true });
    }
  }, [isLoggedIn, navigate, from]);

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const accessToken = await dispatch(handleLogin(data)).unwrap();
      if (accessToken) {
        toast.success('Login successful!');
       // dispatch(handleGetProfile());
        navigate(from, { replace: true });
      }
    } catch (err) {
      toast.error(typeof err === 'string' ? err : 'Login failed.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-6"
      >
        <h1 className="text-center text-3xl font-semibold">
          <span className="text-purple-600 font-bold">shopp</span> <span>admin</span>
        </h1>

        <div>
          <label htmlFor="email" className="block mb-1 text-center text-md">Email</label>
          <input
            id="email"
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="w-full bg-white px-4 py-2 rounded-full text-black"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 text-center text-md">Password</label>
          <input
            id="password"
            type="password"
            {...register('password', { required: 'Password is required' })}
            className="w-full bg-white px-4 py-2 rounded-full text-black"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-1.5 rounded-full"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;