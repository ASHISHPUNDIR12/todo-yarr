'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <p>Signed in as {session.user?.name}</p>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white p-2 rounded"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <p>Not signed in</p>
      <button
        onClick={() => signIn('google')}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
}