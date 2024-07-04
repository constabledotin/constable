import NextAuth from "next-auth";
import connectToDB from "@/database";
import User from "@/database/models/userSchema";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

 const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        console.log("this is cred : ", credentials);
        const { email, password } = credentials;
        try {
          await connectToDB();
          const user = await User.findOne({ email });
          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            console.log("heyaaa");
            return null;
          }
          console.log("opps");
          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
  },
};


export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);