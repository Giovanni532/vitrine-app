"use client";

import * as React from "react";
import { title } from "@/components/primitives";
import { motion } from "framer-motion";

const specs = [
    { label: "Moteur", value: "3 cylindres en ligne, 675 cc, refroidissement liquide" },
    { label: "Puissance", value: "70 kW à 11 000 tr/min" },
    { label: "Couple", value: "70 Nm à 8 250 tr/min" },
    { label: "Vitesse max", value: "> 220 km/h" },
    { label: "0–100 km/h", value: "< 3,6 s" },
    { label: "Poids", value: "186 kg (à sec)" },
    { label: "Suspension", value: "Fourche inversée KYB 41 mm (AV), mono-amortisseur KYB (AR)" },
    { label: "Freins", value: "J.Juan double disque 300 mm (AV), disque 240 mm (AR)" },
    { label: "Aides", value: "ABS double canal, TCS 2 niveaux, quickshifter" },
    { label: "Écran", value: "TFT incurvé 5 pouces, projection Google Maps" },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
};

export function Specs() {
    return (
        <section id="specs" className="py-20">
            <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className={title({ size: "md", color: "foreground", fullWidth: true })}>Caractéristiques techniques</h2>
                <p className="mt-2 text-default-600">CFMOTO 675 SR-R</p>
            </motion.div>
            <motion.div
                className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
            >
                {specs.map((s, i) => (
                    <motion.div
                        key={s.label}
                        variants={item}
                        className="rounded-xl border border-content3/30 bg-content1/40 p-4 flex items-center justify-between hover:bg-content1/60 transition-colors group"
                        whileHover={{
                            scale: 1.02,
                            transition: { duration: 0.2 }
                        }}
                    >
                        <div className="text-default-600 group-hover:text-primary transition-colors">{s.label}</div>
                        <div className="font-medium text-foreground">{s.value}</div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}

export default Specs;