'use client';
import { signIn } from 'next-auth/react';

function Login() {
    return <button onClick={() => signIn()}>LOGIN</button>;
}

export default Login;
