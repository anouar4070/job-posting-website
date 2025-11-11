// auth-edge.ts → without Prisma (for middleware)
//Manages the JWT session and middleware
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { auth } = NextAuth({
  session: { strategy: "jwt" },
  providers: [GitHub],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token.id) session.user.id = token.id as string;
      return session;
    },
  },
});
