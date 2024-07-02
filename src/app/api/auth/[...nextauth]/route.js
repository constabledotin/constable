import NextAuth from "next-auth/next";
import connectToDB from "@/database";
import User from "@/database/models/userSchema";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectToDB();
          console.log("email", email);
          const user = await User.findOne({ email });
          console.log("i am called");
          console.log("user is ", user);

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          console.log("is password matched : ", passwordsMatch);

          if (!passwordsMatch) {
            return null;
          }
          console.log("useris ",user);
          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
 
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
