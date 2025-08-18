"use client";

import * as React from "react";
import { title } from "@/components/primitives";
import { motion, useAnimation } from "framer-motion";

const testimonials = [
    {
        name: "Zoey Lang",
        role: "Pilote amateure",
        text: "Précise et stable à haute vitesse, la 675 SR-R m'a bluffée sur piste.",
    },
    {
        name: "Martin Dupont",
        role: "Instructeur",
        text: "Le freinage J.Juan est mordant et endurant, parfait pour les sessions longues.",
    },
    {
        name: "Aïcha Ben Ali",
        role: "Passionnée road-trip",
        text: "Confort surprenant pour une sportive, l'électronique rassure sous la pluie.",
    },
    {
        name: "Lucas Rey",
        role: "Mécanicien",
        text: "Entretien simple, pièces accessibles, un vrai bonheur à l'atelier.",
    },
];

function MarqueeRow({ reverse = false, speed = 40 }: { reverse?: boolean; speed?: number }) {
    const controls = useAnimation();

    const start = React.useCallback(() => {
        controls.start({
            x: reverse ? ["-100%", "0%"] : ["0%", "-100%"],
            transition: { duration: speed, repeat: Infinity, ease: "linear" },
        });
    }, [controls, reverse, speed]);

    React.useEffect(() => {
        start();
    }, [start]);

    return (
        <div className="overflow-hidden">
            <motion.div className="flex gap-6 w-[200%]" animate={controls}>
                {[...testimonials, ...testimonials].map((t, i) => (
                    <figure key={`${t.name}-${i}`} className="min-w-[320px] max-w-md rounded-large border border-content3/30 bg-content1/50 p-6">
                        <p className="text-default-700">“{t.text}”</p>
                        <figcaption className="mt-4 text-small text-default-500">
                            <span className="font-medium text-foreground">{t.name}</span> — {t.role}
                        </figcaption>
                    </figure>
                ))}
            </motion.div>
        </div>
    );
}

export function Testimonials() {
    return (
        <section id="testimonials" className="py-20">
            <div className="text-center">
                <h2 className={title({ size: "md", color: "foreground", fullWidth: true })}>Ils parlent de la 675 SR-R</h2>
                <p className="mt-2 text-default-600">Avis de pilotes, mécanos et passionnés.</p>
            </div>
            <div className="mt-10 space-y-6">
                <MarqueeRow speed={42} />
                <MarqueeRow reverse speed={48} />
            </div>
        </section>
    );
}

export default Testimonials;


