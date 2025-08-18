"use client";

import * as React from "react";
import { title } from "@/components/primitives";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const images = [
    "/galerie/cf-moto-1.webp",
    "/galerie/cf-moto-2.webp",
    "/galerie/cf-moto-3.webp",
    "/galerie/cf-moto-4.webp",
    "/galerie/cf-moto-5.webp",
];

// Tailles pour la grille bento (12 colonnes)
const cellSizes = [
    "col-span-6 row-span-3", // Hero
    "col-span-3 row-span-2", // Medium
    "col-span-3 row-span-2", // Medium
    "col-span-4 row-span-2", // Wide
    "col-span-2 row-span-2", // Small tall
];

export function Gallery() {
    const [hoveredImage, setHoveredImage] = React.useState<string | null>(null);
    const [zoomed, setZoomed] = React.useState(false);

    React.useEffect(() => {
        setZoomed(false);
    }, [hoveredImage]);

    return (
        <section id="galerie" className="py-20">
            <div className="text-center">
                <h2 className={title({ size: "md", color: "foreground", fullWidth: true })}>Galerie</h2>
                <p className="mt-2 text-default-600">Des lignes, des courbes, de l'émotion.</p>
            </div>

            <div className="mt-10 mx-auto max-w-6xl px-4">
                <div
                    className={clsx(
                        "grid gap-4",
                        "grid-cols-12",
                        "[grid-auto-rows:8rem] sm:[grid-auto-rows:10rem] lg:[grid-auto-rows:12rem]"
                    )}
                >
                    {images.map((src, i) => (
                        <motion.div
                            key={src}
                            className={clsx(
                                "relative overflow-hidden rounded-2xl border border-content3/30 bg-content1/40 cursor-pointer group",
                                "shadow-sm hover:shadow-lg transition-shadow",
                                cellSizes[i % cellSizes.length]
                            )}
                            onMouseEnter={() => setHoveredImage(src)}
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.2 }}
                        >
                            <img
                                src={src}
                                alt={`CFMOTO 675 SR-R - Galerie ${i + 1}`}
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/20 opacity-60 group-hover:opacity-30 transition-opacity" />
                            <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                <span className="text-white text-xs bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                                    Vue {i + 1}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {hoveredImage && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => setHoveredImage(null)}
                    >
                        <div
                            className="relative p-4"
                            onClick={(e) => e.stopPropagation()}
                            onMouseLeave={() => setHoveredImage(null)}
                        >
                            <motion.img
                                src={hoveredImage}
                                alt="CFMOTO 675 SR-R - Agrandie"
                                className={clsx(
                                    "object-contain rounded-2xl shadow-2xl select-none",
                                    zoomed ? "cursor-zoom-out" : "cursor-zoom-in",
                                    "max-w-[95vw] max-h-[85vh]"
                                )}
                                initial={{ scale: 0.96, opacity: 0 }}
                                animate={{ scale: zoomed ? 1.12 : 1, opacity: 1 }}
                                exit={{ scale: 0.96, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                onClick={() => setZoomed((z) => !z)}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

export default Gallery;