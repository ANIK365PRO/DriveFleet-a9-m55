"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    Menu,
    X,
    UserPlus,
    CarFront,
    ChevronDown,
    Sun,
    Moon,
    LogIn
} from "lucide-react";

const NavbarSection = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState("light");
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
        const storedTheme = localStorage.getItem("drivefleet-theme");
        if (storedTheme) {
            setTheme(storedTheme);
            if (storedTheme === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        }
    }, []);

    const toggleTheme = () => {
        if (theme === "light") {
            setTheme("dark");
            localStorage.setItem("drivefleet-theme", "dark");
            document.documentElement.classList.add("dark");
        } else {
            setTheme("light");
            localStorage.setItem("drivefleet-theme", "light");
            document.documentElement.classList.remove("dark");
        }
    };

    const navItems = [
        {
            name: "Home",
            href: "/",
        },
        {
            name: "Explore Cars",
            href: "/explore-car",
        },
        {
            name: "Add Car",
            href: "/add-car",
        },
        {
            name: "My Cars",
            href: "/my-added-cars",
        },
        {
            name: "My Bookings",
            href: "/my-bookings",
        },
    ];


   

    const isActive = (href) => {
        if (href === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(href);
    };

     const navLinks = <>
        {navItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`relative py-2 text-[15px] font-semibold transition-colors duration-200 ${
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




    const closeMenu = () => {
        setIsOpen(false);
    };

    const logoSrc = !mounted
        ? "/logo-light.png"
        : theme === "dark"
            ? "/logo-dark.png"
            : "/logo-light.png";

    return (
        <>
            {/* ================= NAVBAR ================= */}
            <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md">
                <nav className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-10">
                    {/* ================= LOGO ================= */}
                    <Link href="/" className="flex shrink-0 items-center transition-opacity duration-200" onClick={closeMenu}>
                        <Image
                            src={logoSrc}
                            alt="DriveFleet Logo"
                            width={180}
                            height={70}

                            className="h-[70px] w-[130px] sm:w-[150px] lg:w-[165px] xl:w-[180px] object-cover transition-opacity duration-200"
                        />
                    </Link>

                    {/* ================= DESKTOP NAV ================= */}
                    <div className="hidden items-center lg:flex">
                        <ul className="flex items-center gap-8">

                            {/* route links */}

                           {navLinks}

                            {/* Update Car */}
                            <li>
                                <Link
                                    href="/update-car"
                                    className={`flex items-center gap-1 py-2 text-[15px] font-semibold transition-colors ${
                                        isActive("/update-car")
                                            ? "text-gold"
                                            : "text-foreground hover:text-gold"
                                    }`}
                                >
                                    Update Car
                                    <ChevronDown size={15} />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* ================= RIGHT CONTROLS ================= */}
                    <div className="flex items-center gap-3 sm:gap-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-surface border border-gold text-foreground transition-all duration-300 hover:bg-card hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold"
                        >
                            {mounted ? (
                                theme === "light" ? (
                                    <Sun size={18} className="transition-transform duration-300 hover:rotate-90 hover:scale-110" />
                                ) : (
                                    <Moon size={18} className="transition-transform duration-300 hover:-rotate-12 hover:scale-110" />
                                )
                            ) : (
                                <div className="h-5 w-5" />
                            )}
                        </button>

                        {/* ================= AUTH BUTTONS ================= */}
                        <div className="hidden items-center gap-3 md:flex">
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
                        </div>

                        {/* ================= MOBILE/TABLET MENU BUTTON ================= */}
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle navigation menu"
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

                {/* ================= MOBILE MENU ================= */}
                <div
                    className={`overflow-hidden border-t border-border bg-background transition-all duration-300 lg:hidden ${
                        isOpen
                            ? "max-h-[600px] opacity-100"
                            : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="mx-auto max-w-[1440px] px-4 pb-5 pt-3 sm:px-6">
                        {/* Mobile Navigation */}
                        <ul className="flex flex-col gap-1">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={closeMenu}
                                        className={`block rounded-lg px-4 py-3 text-[15px] font-semibold transition-colors ${
                                            isActive(item.href)
                                                ? "bg-surface text-gold border-l-4 border-gold"
                                                : "text-foreground hover:bg-surface hover:text-gold border-l-4 border-transparent"
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}

                            <li>
                                <Link
                                    href="/update-car"
                                    onClick={closeMenu}
                                    className={`block rounded-lg px-4 py-3 text-[15px] font-semibold transition-colors ${
                                        isActive("/update-car")
                                            ? "bg-surface text-gold border-l-4 border-gold"
                                            : "text-foreground hover:bg-surface hover:text-gold border-l-4 border-transparent"
                                    }`}
                                >
                                    Update Car
                                </Link>
                            </li>
                        </ul>

                        {/* Mobile Auth Buttons */}
                        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4 md:hidden">
                            <Link
                                href="/auth/login"
                                onClick={closeMenu}
                                className="df-btn-secondary flex h-9 items-center justify-center gap-2 text-sm font-bold"
                            >
                                <LogIn size={17} />
                                Login
                            </Link>

                            <Link
                                href="/auth/register"
                                onClick={closeMenu}
                                className="df-btn-primary flex h-9 items-center justify-center gap-2 text-sm font-bold"
                            >
                                <UserPlus size={17} />
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default NavbarSection;