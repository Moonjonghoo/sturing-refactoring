'use server';

import { signIn, signOut } from '@/auth';
import { redirect } from 'next/navigation';

export async function GithubLogin() {
  await signIn('github');
}

export async function logout() {
  await signOut();
  redirect('/');
}
