import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "./db.config.js";

dotenv.config();

export const googleStrategy = new GoogleStrategy(
    {
        clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
        clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/oauth2/callback/google",
        scope: ["email", "profile"],
        state: true,
    },
    (accessToken, refreshToken, profile, cb) => {
        return googleVerify(profile).then((user) => cb(null, user)).catch((err) => cb(err));
    }
)

const googleVerify = async (profile) => {
    const email = profile.emails?.[0]?.value;
    if(!email){
        throw new Error('profile.email was not found: ${profile}');
    }

    const user = await prisma.users.findFirst({
        where: {email: email}
    });

    //console.log(user);

    if(user !== null) {
        return {
            id: user.id,
            email: user.email,
            name: user.username
        };
    }

    const created = await prisma.users.create({
        data:{
            email,
            username: profile.displayName,
            gender: 0,
            birth_date: new Date(1970, 1, 1),
            address: "추후 수정",
            phone_num: "추후 수정",
            password: "추후 수정",
            preferred_food: 0,
            my_mission: -1,
            phone_verify: 0,
            points: 0
        },
    });

    return {
        id: created.id,
        email: created.email,
        name: created.username
    };
};