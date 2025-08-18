"use client";

import * as React from "react";
import { Button } from "@heroui/button";
import { title, subtitle } from "@/components/primitives";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import clsx from "clsx";

const variants = [
    { key: "grey-red", label: "Gris & Rouge", src: "/cfmoto-grey-and-red.webp", accent: "red" },
    { key: "black-blue", label: "Noir & Bleu", src: "/cfmoto-black-and-blue.jpg", accent: "blue" },
];

const floatingAnimation = {
    y: [0, -8, 0],
    transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
    }
};

export function Hero() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 400], [0, 60]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);
    const [active, setActive] = React.useState(variants[0]);

    const isBlue = active.key === "black-blue";
    const dropShadowClass = isBlue
        ? "drop-shadow-[0_20px_60px_rgba(59,130,246,0.25)]"
        : "drop-shadow-[0_20px_60px_rgba(239,68,68,0.25)]";

    // Radial highlight that follows the mouse
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const x = useSpring(mouseX, { stiffness: 100, damping: 20 });
    const yMouse = useSpring(mouseY, { stiffness: 100, damping: 20 });

    const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const highlightColor = isBlue ? "rgba(59,130,246,0.18)" : "rgba(239,68,68,0.18)";
    const spotlight = useMotionTemplate`radial-gradient(500px circle at ${x}px ${yMouse}px, ${highlightColor} 0%, transparent 60%)`;

    return (
        <section id="accueil" onMouseMove={onMouseMove} className="relative flex flex-col items-center justify-center min-h-[90vh] pt-10 pb-20 gap-6 overflow-hidden">
            {/* Crossfade background gradients */}
            <AnimatePresence initial={false}>
                <motion.div
                    key={isBlue ? "bg-blue" : "bg-red"}
                    className="absolute inset-0 -z-20 bg-gradient-to-b via-transparent to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        backgroundImage: isBlue
                            ? "linear-gradient(to bottom, rgba(59,130,246,0.20), transparent)"
                            : "linear-gradient(to bottom, rgba(239,68,68,0.20), transparent)",
                    }}
                />
            </AnimatePresence>

            {/* Radial spotlight following mouse */}
            <motion.div
                aria-hidden
                className="pointer-events-none absolute -z-10 inset-0"
            >
                <motion.div
                    className="absolute inset-0"
                    style={{ background: spotlight }}
                />
            </motion.div>

            <motion.div
                style={{ y, opacity }}
                className="text-center max-w-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <motion.h1
                    className={title({ size: "lg", color: "foreground", fullWidth: true })}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    CFMOTO 675 SR-R
                    <br />
                    <span className={title({ color: "pink" })}>La passion de la route, la puissance du style</span>
                </motion.h1>
                <motion.p
                    className={subtitle()}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    Trois cylindres 675 cc, plus de 220 km/h de vitesse de pointe, accélération 0-100 en moins de 3,6 s. Une sportive affûtée, taillée pour l'adrénaline.
                </motion.p>
                <motion.div
                    className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <Button color="primary" size="lg" className="px-8" href="#modeles">
                        <a>Découvrir nos modèles</a>
                    </Button>
                    <Button variant="bordered" size="lg" className="px-8" href="#contact">
                        <a>Nous contacter</a>
                    </Button>
                </motion.div>
            </motion.div>

            <motion.div
                className="mt-10 w-full max-w-4xl relative h-[280px] sm:h-[360px] md:h-[420px] lg:h-[480px]"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                animate={floatingAnimation}
            >
                <AnimatePresence mode="wait">
                    <motion.img
                        key={active.key}
                        src={active.src}
                        alt={`CFMOTO 675 SR-R ${active.label}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                        className={clsx("absolute inset-0 m-auto w-full h-full object-contain", dropShadowClass)}
                    />
                </AnimatePresence>
            </motion.div>

            {/* Color thumbnails */}
            <div className="mt-6 flex items-center gap-4">
                {variants.map((v) => {
                    const selected = active.key === v.key;
                    const preview = v.accent === "blue"
                        ? "bg-gradient-to-br from-sky-500 to-blue-600"
                        : "bg-gradient-to-br from-red-500 to-rose-600";
                    return (
                        <motion.button
                            key={v.key}
                            onClick={() => setActive(v)}
                            className={clsx(
                                "cursor-pointer h-9 w-9 rounded-full border transition focus:outline-none focus:ring-2 focus:ring-offset-2 relative",
                                selected ? "border-primary ring-2 ring-primary/70" : "border-content3/40 hover:border-primary/60",
                                preview,
                            )}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={v.label}
                            aria-pressed={selected}
                        >
                            {selected && (
                                <motion.span
                                    className="absolute inset-0 rounded-full border-2 border-primary"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [1, 0, 1]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </section>
    );
}

export default Hero;