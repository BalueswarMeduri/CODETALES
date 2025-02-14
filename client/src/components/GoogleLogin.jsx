import React from 'react'
import { Button } from './ui/button'
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/helpers/firebase';
import { RouteIndex } from '@/helpers/RouteName';
import { toast } from 'react-toastify';
import { getEnv } from '@/helpers/getenv';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/user/user.slice';

const GoogleLogin = () => {
    const dispath = useDispatch()
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const googleResponse = await signInWithPopup(auth, provider);
            const user = googleResponse.user;
            const bodydata = {
                name: user.displayName,
                email: user.email,
                avatar: user.photoURL
            };

            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/google-login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(bodydata)
            });

            const data = await response.json();
            if (!response.ok) {
                toast.error("Login failed");
                return;
            }
             dispath(setUser(data.user))
            navigate(RouteIndex);
            toast.success("Login Successful!");
        } catch (error) {
            toast.error("Login failed or some internal error");
        }
    };

    return (
        <Button variant="outline" className="w-full" onClick={handleLogin}>
            <FcGoogle />
            Continue With Google
        </Button>
    );
};

export default GoogleLogin;
