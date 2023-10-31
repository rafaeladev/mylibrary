'use client';
import { signIn } from 'next-auth/react';

function Login() {
    return <button onClick={() => signIn()}>Login</button>;
}

export default Login;
