import dns from "node:dns";
dns.setServers(["1.1.1.1", "1.0.0.1"]);
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('rent-ease-auth');

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client
    }),

    user: {
        additionalFields: {
            role: {
                defaultValue: "Tenant"
            }
        }
    },

    emailAndPassword: {
        enabled: true,
    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },

    session: {
        cookieCache: true,
        strategy: "jwt",
        maxAge: 3 * 24 * 60 * 60
    },

    plugins: [
        jwt()
    ]

});