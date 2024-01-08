'use client';
import { signOut } from 'next-auth/react';

function Logout() {
    return <button onClick={() => signOut()}>LOGOUT</button>;
}

export default Logout;
