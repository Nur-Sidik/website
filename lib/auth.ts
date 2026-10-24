import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error(" JWT_SECRET Kosong ");
}

const SECRET_KEY = new TextEncoder().encode(secret);

export async function createSession(adminId: number, username: string, name: string) {
  const token = await new SignJWT({ id: adminId, username, name })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("5m")
    .sign(SECRET_KEY);

  const cookieStore = await cookies();
  cookieStore.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 5, // 5 menit
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload;
  } catch (error) {
    return null;
  }
}