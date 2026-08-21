"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { Avatar } from "@heroui/react";

import {
    Menu,
    X,
    UserPlus,
    CarFront,
    ChevronDown,
    Sun,
    Moon,
    LogIn,
    CalendarCheck,
    LogOut,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

const NavbarSection = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [theme, setTheme] = useState("light");
    const [mounted, setMounted] = useState(false);

    const pathname = usePathname();
    const router = useRouter();
    const profileRef = useRef(null);

    // =========================================================
    // AUTH SESSION
    // =========================================================
    const { data: session, isPending } = authClient.useSession();

    const user = session?.user;

    // =========================================================
    // USER INFORMATION
    // =========================================================
    const userName = user?.name || "User";
    const userEmail = user?.email || "";
    const userImage = user?.image || "";

    const userInitials = userName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0]?.toUpperCase())
        .join("");

    // =========================================================
    // THEME
    // =========================================================
    useEffect(() => {
        setMounted(true);

        const storedTheme = localStorage.getItem("drivefleet-theme");

        if (storedTheme === "dark") {
            setTheme("dark");
            document.documentElement.classList.add("dark");
        } else {
            setTheme("light");
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleTheme = () => {
        const nextTheme = theme === "light" ? "dark" : "light";

        setTheme(nextTheme);
        localStorage.setItem("drivefleet-theme", nextTheme);

        if (nextTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    // =========================================================
    // CLOSE DESKTOP PROFILE DROPDOWN WHEN CLICKING OUTSIDE
    // =========================================================
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // =========================================================
    // PUBLIC NAVIGATION
    // =========================================================
    const navItems = [
        {
            name: "Home",
            href: "/",
        },
        {
            name: "Explore Cars",
            href: "/explore-car",
        },
    ];

    // =========================================================
    // ACTIVE ROUTE
    // =========================================================
    const isActive = (href) => {
        if (href === "/") {
            return pathname === "/";
        }

        return pathname.startsWith(href);
    };

    // =========================================================
    // CLOSE MENUS
    // =========================================================
    const closeMenu = () => {
        setIsOpen(false);
        setIsProfileOpen(false);
    };

    // =========================================================
    // LOGOUT
    // =========================================================
    const handleLogout = async () => {
        try {
            await authClient.signOut();

            setIsProfileOpen(false);
            setIsOpen(false);

            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    // =========================================================
    // LOGO
    // =========================================================
    const logoSrc = !mounted
        ? "/logo-light.png"
        : theme === "dark"
            ? "/logo-dark.png"
            : "/logo-light.png";

    // =========================================================
    // DESKTOP / MOBILE PUBLIC NAV LINKS
    // =========================================================
    const navLinks = (
        <>
            {navItems.map((item) => (
                <li key={item.href}>
                    <Link
                        href={item.href}
                        onClick={closeMenu}
                        className={`relative inline-flex py-2 text-[15px] font-semibold transition-colors duration-200 ${
                            isActive(item.href)
                                ? "text-gold"
                                : "text-foreground hover:text-gold"
                        }`}
                    >
                        {item.name}

                        {/* Active underline */}
                        <span
                            className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-gold transition-all duration-300 ${
                                isActive(item.href)
                                    ? "w-full"
                                    : "w-0"
                            }`}
                        />
                    </Link>
                </li>
            ))}
        </>
    );

    return (
        <header className="relative sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md">

            {/* =====================================================
                NAVBAR
            ====================================================== */}
            <nav className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-10">

                {/* =================================================
                    LOGO
                ================================================== */}
                <Link
                    href="/"
                    onClick={closeMenu}
                    className="flex shrink-0 items-center transition-opacity duration-200 hover:opacity-90"
                >
                    <Image
                        src={logoSrc}
                        alt="DriveFleet Logo"
                        width={180}
                        height={70}
                        priority
                        className="h-[70px] w-[130px] object-cover sm:w-[150px] lg:w-[165px] xl:w-[180px]"
                    />
                </Link>

                {/* =================================================
                    DESKTOP PUBLIC NAV
                ================================================== */}
                <div className="hidden items-center lg:flex">
                    <ul className="flex items-center gap-8">
                        {navLinks}
                    </ul>
                </div>

                {/* =================================================
                    RIGHT CONTROLS
                ================================================== */}
                <div className="flex items-center gap-3 sm:gap-4">

                    {/* =============================================
                        THEME TOGGLE
                    ============================================== */}
                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        title={
                            theme === "light"
                                ? "Switch to Dark Mode"
                                : "Switch to Light Mode"
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-gold bg-surface text-foreground transition-all duration-300 hover:bg-card hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold"
                    >
                        {mounted ? (
                            theme === "light" ? (
                                <Sun
                                    size={18}
                                    className="transition-transform duration-300 hover:rotate-90 hover:scale-110"
                                />
                            ) : (
                                <Moon
                                    size={18}
                                    className="transition-transform duration-300 hover:-rotate-12 hover:scale-110"
                                />
                            )
                        ) : (
                            <div className="h-5 w-5" />
                        )}
                    </button>

                    {/* =================================================
                        DESKTOP AUTH / PROFILE
                    ================================================== */}
                    <div className="hidden items-center gap-3 lg:flex">

                        {/* -----------------------------------------
                            SESSION LOADING
                        ------------------------------------------ */}
                        {isPending ? (
                            <div className="h-9 w-24 animate-pulse rounded-lg bg-surface" />
                        ) : user ? (
                            /* =====================================
                                LOGGED IN PROFILE
                            ====================================== */
                            <div
                                ref={profileRef}
                                className="relative"
                            >
                                {/* Profile trigger */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsProfileOpen(
                                            (previous) => !previous
                                        )
                                    }
                                    aria-expanded={isProfileOpen}
                                    aria-haspopup="menu"
                                    aria-label="Open profile menu"
                                    className="flex items-center gap-2 rounded-full border border-border bg-surface px-2 py-1.5 transition-all duration-200 hover:border-gold hover:bg-card focus:outline-none focus:ring-2 focus:ring-gold"
                                >
                                    <Avatar className="h-8 w-8">
                                        <Avatar.Image
                                            src={userImage}
                                            alt={userName}
                                        />

                                        <Avatar.Fallback>
                                            {userInitials}
                                        </Avatar.Fallback>
                                    </Avatar>

                                    <ChevronDown
                                        size={16}
                                        className={`text-foreground transition-transform duration-200 ${
                                            isProfileOpen
                                                ? "rotate-180"
                                                : ""
                                        }`}
                                    />
                                </button>

                                {/* =================================
                                    PROFILE DROPDOWN
                                ================================== */}
                                {isProfileOpen && (
                                    <div
                                        
                                        className="absolute right-0 top-[calc(100%+10px)] w-[280px] overflow-hidden rounded-2xl border border-border bg-card shadow-xl"
                                        role="menu"
                                    >
                                        {/* User information */}
                                        <div className="border-b border-border bg-surface px-4 py-4">
                                            <div className="flex items-center gap-3">

                                                <Avatar className="h-11 w-11 shrink-0">
                                                    <Avatar.Image
                                                        src={userImage}
                                                        alt={userName}
                                                    />

                                                    <Avatar.Fallback>
                                                        {userInitials}
                                                    </Avatar.Fallback>
                                                </Avatar>

                                                <div className="min-w-0">
                                                    <p className="truncate font-bold text-foreground">
                                                        {userName}
                                                    </p>

                                                    <p className="truncate text-xs text-foreground/60">
                                                        {userEmail}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Account actions */}
                                        <div className="p-2">

                                            {/* Add Car */}
                                            <Link
                                                href="/add-car"
                                                onClick={closeMenu}
                                                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface hover:text-gold"
                                                role="menuitem"
                                            >
                                                <CarFront
                                                    size={18}
                                                    className="text-gold"
                                                />

                                                Add Car
                                            </Link>

                                            {/* My Added Cars */}
                                            <Link
                                                href="/my-added-cars"
                                                onClick={closeMenu}
                                                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface hover:text-gold"
                                                role="menuitem"
                                            >
                                                <CarFront
                                                    size={18}
                                                    className="text-gold"
                                                />

                                                My Added Cars
                                            </Link>

                                            {/* My Bookings */}
                                            <Link
                                                href="/my-bookings"
                                                onClick={closeMenu}
                                                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface hover:text-gold"
                                                role="menuitem"
                                            >
                                                <CalendarCheck
                                                    size={18}
                                                    className="text-gold"
                                                />

                                                My Bookings
                                            </Link>

                                            {/* Divider */}
                                            <div className="my-2 border-t border-border" />

                                            {/* Logout */}
                                            <button
                                                type="button"
                                                onClick={handleLogout}
                                                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-danger transition-colors hover:bg-danger/10"
                                                role="menuitem"
                                            >
                                                <LogOut size={18} />

                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* =====================================
                                LOGGED OUT
                            ====================================== */
                            <>
                                <Link
                                    href="/auth/login"
                                    className="df-btn-secondary flex h-9 items-center gap-2 px-4 text-sm font-bold"
                                >
                                    <LogIn size={16} />
                                    Login
                                </Link>

                                <Link
                                    href="/auth/register"
                                    className="df-btn-primary flex h-9 items-center gap-2 px-4 text-sm font-bold"
                                >
                                    <UserPlus size={16} />
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* =================================================
                        MOBILE MENU BUTTON
                    ================================================== */}
                    <button
                        type="button"
                        onClick={() =>
                            setIsOpen((previous) => !previous)
                        }
                        aria-label={
                            isOpen
                                ? "Close navigation menu"
                                : "Open navigation menu"
                        }
                        aria-expanded={isOpen}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition-all hover:border-gold hover:text-gold lg:hidden focus:outline-none focus:ring-2 focus:ring-gold"
                    >
                        {isOpen ? (
                            <X size={22} />
                        ) : (
                            <Menu size={22} />
                        )}
                    </button>
                </div>
            </nav>

            {/* =========================================================
                MOBILE MENU
            ========================================================== */}
           <div
                className={`absolute right-3 top-[72px] z-50 w-[calc(100vw-24px)] max-w-[320px] overflow-hidden rounded-2xl border border-border bg-background shadow-xl transition-all duration-300 lg:hidden ${
                    isOpen
                        ? "max-h-[600px] opacity-100"
                        : "pointer-events-none max-h-0 opacity-0"
                }`}
            >
                <div className="mx-auto max-w-[1440px] px-4 pb-5 pt-3 sm:px-6">

                    {/* =================================================
                        MOBILE PUBLIC NAV
                    ================================================== */}
                    <ul className="flex flex-col gap-1">
                        {navLinks}
                    </ul>

                    {/* =================================================
                        MOBILE ACCOUNT AREA
                    ================================================== */}
                    <div className="mt-4 border-t border-border pt-4">

                        {isPending ? (
                            <div className="h-20 animate-pulse rounded-xl bg-surface" />
                        ) : user ? (
                            <div className="space-y-3">

                                {/* =====================================
                                    USER PROFILE CARD
                                ====================================== */}
                                <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3">

                                    <Avatar className="h-11 w-11 shrink-0">
                                        <Avatar.Image
                                            src={userImage}
                                            alt={userName}
                                        />

                                        <Avatar.Fallback>
                                            {userInitials}
                                        </Avatar.Fallback>
                                    </Avatar>

                                    <div className="min-w-0">
                                        <p className="truncate font-bold text-foreground">
                                            {userName}
                                        </p>

                                        <p className="truncate text-xs text-foreground/60">
                                            {userEmail}
                                        </p>
                                    </div>
                                </div>

                                {/* =====================================
                                    ACCOUNT LINKS
                                ====================================== */}
                                <div className="space-y-1">

                                    {/* Add Car */}
                                    <Link
                                        href="/add-car"
                                        onClick={closeMenu}
                                        className="flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface hover:text-gold"
                                    >
                                        <CarFront
                                            size={18}
                                            className="text-gold"
                                        />

                                        Add Car
                                    </Link>

                                    {/* My Added Cars */}
                                    <Link
                                        href="/my-added-cars"
                                        onClick={closeMenu}
                                        className="flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface hover:text-gold"
                                    >
                                        <CarFront
                                            size={18}
                                            className="text-gold"
                                        />

                                        My Added Cars
                                    </Link>

                                    {/* My Bookings */}
                                    <Link
                                        href="/my-bookings"
                                        onClick={closeMenu}
                                        className="flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface hover:text-gold"
                                    >
                                        <CalendarCheck
                                            size={18}
                                            className="text-gold"
                                        />

                                        My Bookings
                                    </Link>
                                </div>

                                {/* =====================================
                                    MOBILE LOGOUT
                                ====================================== */}
                                <div className="border-t border-border pt-3">
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="flex h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-semibold text-danger transition-colors hover:bg-danger/10"
                                    >
                                        <LogOut size={18} />

                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            /* =========================================
                                LOGGED OUT MOBILE AUTH
                            ========================================== */
                            <div className="grid grid-cols-2 gap-3">

                                <Link
                                    href="/auth/login"
                                    onClick={closeMenu}
                                    className="df-btn-secondary flex h-10 items-center justify-center gap-2 text-sm font-bold"
                                >
                                    <LogIn size={17} />
                                    Login
                                </Link>

                                <Link
                                    href="/auth/register"
                                    onClick={closeMenu}
                                    className="df-btn-primary flex h-10 items-center justify-center gap-2 text-sm font-bold"
                                >
                                    <UserPlus size={17} />
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default NavbarSection;