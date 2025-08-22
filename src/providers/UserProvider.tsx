// providers/UserProvider.tsx
"use client";

import { createContext, useContext, useState } from "react";

export type User = { id: string; email?: string } | null;

const Ctx = createContext<{
  user: User;
  setUser: (u: User) => void;
} | null>(null);

export function UserProvider({
  initialUser,
  children,
}: {
  initialUser: User;
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User>(initialUser);
  return <Ctx.Provider value={{ user, setUser }}>{children}</Ctx.Provider>;
}

export function useUser() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useUser must be used within <UserProvider>");
  return { user: ctx.user, setUser: ctx.setUser, isLoggedIn: !!ctx.user };
}
