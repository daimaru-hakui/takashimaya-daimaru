import NextAuth, { DefaultSession } from "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      uid: string;
      email: string;
      emailVerified?: boolean;
    } & DefaultSession;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uid: string;
    emailVerified: boolean;
  }
}
