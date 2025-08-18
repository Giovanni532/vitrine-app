"use client";

import * as React from "react";
import { motion } from "framer-motion";

export function Loader() {
    return (
        <div className="fixed inset-0 z-[9999] grid place-items-center bg-background">
            <motion.div
                initial={{ scale: 0.8, opacity: 0.6 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ repeat: Infinity, repeatType: "mirror", duration: 1.2 }}
                className="relative h-14 w-14"
                aria-label="Chargement"
            >
                <div className="absolute inset-0 rounded-full border-2 border-red-500/60" />
                <div className="absolute inset-2 rounded-full border-2 border-red-500/40" />
                <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
                    className="absolute inset-0"
                >
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-red-500" />
                </motion.div>
            </motion.div>
        </div>
    );
}

export default Loader;


