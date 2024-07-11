"use client"
import Link from "next/link";
import { signOut } from 'next-auth/react';

export default function DashboardLayout({ children }) {
    return (
        <>
            {children}

        </>
    )
}