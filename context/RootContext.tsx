"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';

// User type (customize as needed)
interface User {
  id: string;
  email: string;
  role?: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  signOut: () => void;
}

interface LocationContextType {
  city: string | null;
  setCity: (city: string | null) => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  signOut: () => {},
});

export const LocationContext = createContext<LocationContextType>({
  city: null,
  setCity: () => {},
});

export function RootProvider({ children }: { children: ReactNode }) {
  // User state
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        setUser({ id: authUser.id, email: authUser.email || '', role: undefined });
      } else {
        setUser(null);
      }
      setLoading(false);
    };
    fetchUser();
    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      fetchUser();
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = '/login';
  };

  // Location state
  const [city, setCity] = useState<string | null>(null);
  useEffect(() => {
    // Try to load city from localStorage
    const stored = localStorage.getItem('selectedCity');
    if (stored) setCity(stored);
  }, []);
  useEffect(() => {
    if (city) localStorage.setItem('selectedCity', city);
    else localStorage.removeItem('selectedCity');
  }, [city]);

  return (
    <UserContext.Provider value={{ user, loading, signOut }}>
      <LocationContext.Provider value={{ city, setCity }}>
        {children}
      </LocationContext.Provider>
    </UserContext.Provider>
  );
}

// Optional hooks
export const useUser = () => useContext(UserContext);
export const useLocation = () => useContext(LocationContext); 