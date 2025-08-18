"use client";

import * as React from "react";
import { Link } from "@heroui/link";
import { Github, Instagram, Twitter } from "lucide-react";

export function Footer() {
    return (
        <footer className="py-10 border-t border-content3/20 text-small text-default-500">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>© {new Date().getFullYear()} MotoVision. Tous droits réservés.</div>
                <nav className="flex items-center gap-6">
                    <Link href="#accueil">Accueil</Link>
                    <Link href="#specs">Caractéristiques</Link>
                    <Link href="#galerie">Galerie</Link>
                    <Link href="#testimonials">Témoignages</Link>
                    <Link href="#contact">Contact</Link>
                </nav>
                <div className="flex items-center gap-4 text-default-500">
                    <a aria-label="GitHub" href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-foreground">
                        <Github size={18} />
                    </a>
                    <a aria-label="Instagram" href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-foreground">
                        <Instagram size={18} />
                    </a>
                    <a aria-label="X" href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-foreground">
                        <Twitter size={18} />
                    </a>
                </div>
            </div>
            <div className="mt-6 text-center">
                <Link href="#" className="text-tiny">Mentions légales</Link>
            </div>
        </footer>
    );
}

export default Footer;


