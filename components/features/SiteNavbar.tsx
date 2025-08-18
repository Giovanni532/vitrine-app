"use client";

import * as React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Switch } from "@heroui/switch";
import { useTheme } from "next-themes";

export function SiteNavbar() {
    const { theme, setTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [showBar, setShowBar] = React.useState(false);
    const isDark = theme === "dark";

    const links = [
        { href: "#accueil", label: "Accueil" },
        { href: "#specs", label: "Caractéristiques" },
        { href: "#galerie", label: "Galerie" },
        { href: "#testimonials", label: "Témoignages" },
        { href: "#contact", label: "Contact" },
    ];

    React.useEffect(() => {
        const onScroll = () => {
            if (typeof window === "undefined") return;
            setShowBar(window.scrollY > 64);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${showBar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
            <Navbar isBordered onMenuOpenChange={setIsMenuOpen} className="bg-background/70 backdrop-blur-md">
                <NavbarContent>
                    <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />
                    <NavbarBrand>
                        <Link href="/" className="font-semibold tracking-tight text-foreground">
                            MotoVision
                        </Link>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="hidden sm:flex gap-6" justify="center">
                    {links.map((l) => (
                        <NavbarItem key={l.href}>
                            <Link href={l.href} color="foreground">{l.label}</Link>
                        </NavbarItem>
                    ))}
                </NavbarContent>

                <NavbarContent justify="end">
                    <NavbarItem className="flex items-center">
                        <Switch
                            size="sm"
                            isSelected={isDark}
                            onValueChange={(v) => setTheme(v ? "dark" : "light")}
                            aria-label="Basculer le thème"
                        />
                    </NavbarItem>
                    <NavbarItem>
                        <Button as={Link} href="#galerie" color="primary" variant="flat">
                            Voir la galerie
                        </Button>
                    </NavbarItem>
                </NavbarContent>

                <NavbarMenu>
                    {links.map((item) => (
                        <NavbarMenuItem key={item.href}>
                            <Link className="w-full" href={item.href} size="lg">
                                {item.label}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>
        </div>
    );
}

export default SiteNavbar;


