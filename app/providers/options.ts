import { auth } from '@/firebase/server';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';


export const options: NextAuthOptions =({
  providers: [
    CredentialsProvider({
      credentials: {},
      authorize: async (credentials:any, req) => {
        const {idToken} = credentials
        if (idToken) {
          try {
            const decoded = await auth.verifyIdToken(idToken);
            const user = {
              id: decoded.uid,
              emailVerified: decoded.email_verified,
              email:decoded.email,
              ...decoded
            }
            return {...user}
          } catch (err) {
            console.error(err);
          }
        }
        return null;
      },
    })
  ],
  session: {
    strategy:'jwt'
  },
  callbacks: {
    async jwt({ token, user }:any) {
      return {...token,...user}
    },
    async session({ session, token }) {
      session.user.emailVerified = token.emailVerified;
      session.user.uid = token.uid;
      session.user.email;
      return session;
    }
  }
})