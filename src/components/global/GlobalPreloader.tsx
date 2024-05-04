import clsx from "clsx";
import gsap from "gsap";
import { useRef, useState, useEffect, Dispatch, SetStateAction } from "react";

import { BaseBtn } from "../base/BaseBtn";
import { BaseFlipper } from "../base/BaseFlipper";
import { BaseIcon } from "../base/BaseIcon";
import styles from "../styles/global/GlobalPreloader.module.css";
import { createCamera } from "../../three/preloader/camera";
import { createClouds, transitionClouds, removeClouds } from "../../three/preloader/clouds";
import { createEvents, removeEvents } from "../../three/preloader/events";
import { createLights } from "../../three/preloader/lights";
import { createPlane, revealPlane, transitionPlane, removePlane } from "../../three/preloader/plane";
import { createPreloader, hidePreloader } from "../../three/preloader/preloader";
import { createRenderer, removeRenderer } from "../../three/preloader/renderer";
import { createScene } from "../../three/preloader/scene";
import { createTick, removeTick } from "../../three/preloader/tick";

export function GlobalPreloader({ onAnimComplete }: { onAnimComplete: Dispatch<SetStateAction<boolean>> }) {
    const root = useRef<HTMLDivElement>(null);
    const canvas = useRef<HTMLCanvasElement>(null);
    const spinner = useRef<HTMLDivElement>(null);
    const track = useRef(null);
    const intro = useRef(null);

    const [playFlipper, setPlayFlipper] = useState(false);

    const removeExperience = () => {
        removeClouds();
        removePlane();
        removeEvents();
        removeTick();
        removeRenderer();
    };

    useEffect(() => {
        let tl: gsap.core.Timeline;
        const spinnerAnim = () => {
            tl = gsap.timeline({
                delay: 2,
                onComplete: () => {
                    hidePreloader();
                    revealPlane();
                    gsap.to(intro.current, { delay: 2, duration: 0.5, autoAlpha: 1 });
                    tl.kill();
                    setPlayFlipper(true);
                },
            });

            tl.to(track.current, { duration: 0.5, yPercent: -33.333 });
            tl.to(track.current, { delay: 2, duration: 0.5, yPercent: -66.666 });
            tl.to(track.current, { delay: 0.5, yPercent: -66.666 });
        };
        const createExperience = async () => {
            // run three.js
            createScene();
            createCamera();
            createRenderer(canvas.current || document.createElement("canvas"));
            createEvents();
            createTick();

            createPreloader(spinner.current || document.createElement("div"));
            createLights();
            createClouds();
            await createPlane();

            spinnerAnim();
        };

        createExperience();

        return () => {
            removeExperience();
        };
    }, []);

    const mapTransition = () => {
        gsap.to(intro.current, { duration: 0.5, autoAlpha: 0 });
        transitionPlane();
        transitionClouds(root.current || document.createElement("div"));
        setTimeout(() => {
            onAnimComplete(true);
            removeExperience();
            // sessionStorage.setItem("beenBefore", "true");
        }, 4000);
    };

    return (
        <section ref={root} className={clsx("fixed top-0 z-[110] size-full bg-linearGradient", styles.globalPreloader)}>
            <div ref={spinner} className="absolute top-0 z-20 grid size-full place-items-center bg-[#3399ff]">
                <div className="relative z-20 flex flex-wrap justify-center">
                    <div className="relative">
                        <img className="w-140" src="/images/preloader/globe.png" />
                        <img
                            className={clsx("xy-center absolute size-240 max-w-none", styles.globalPreloader__loader)}
                            src="/images/preloader/plane.png"
                        />
                    </div>
                    <div className="absolute top-200 h-24 w-400 overflow-hidden text-center">
                        <div ref={track} className="font-lores uppercase tracking-tighter text-white">
                            <p>This is your captain speaking...</p>
                            <p>We&lsquo;ve just departed from Degen City...</p>
                            <p>We&lsquo;re about to reach an all time high...</p>
                        </div>
                    </div>
                </div>
            </div>

            <div
                ref={intro}
                className="absolute top-0 z-20 grid size-full content-between pb-120 pt-32 opacity-0 l:pb-56 s:pb-40 h-l:pb-56"
            >
                <img className="mx-auto" src="/images/logo.svg" alt="Lingo logo" width="118" height="32" />

                <div className="mx-auto flex w-full max-w-[1140px] flex-wrap justify-between px-24 xxl:max-w-[900px] l:max-w-[500px]">
                    <div className="mb-56 flex w-full flex-wrap justify-between l:mb-32 s:grid s:grid-cols-2 s:gap-16">
                        <div>
                            <div className="flex gap-4 xxl:gap-2 s:grid s:grid-cols-4">
                                <BaseFlipper className="s:w-auto" play={playFlipper} offset={0.1}>
                                    W
                                </BaseFlipper>
                                <BaseFlipper className="s:w-auto" play={playFlipper} offset={0.2}>
                                    E
                                </BaseFlipper>
                                <BaseFlipper className="s:w-auto" play={playFlipper} offset={0.3}>
                                    L
                                </BaseFlipper>
                                <BaseFlipper className="s:w-auto" play={playFlipper} offset={0.1}>
                                    C
                                </BaseFlipper>
                                <BaseFlipper className="s:w-auto" play={playFlipper} offset={0.2}>
                                    O
                                </BaseFlipper>
                                <BaseFlipper className="s:w-auto" play={playFlipper} offset={0.3}>
                                    M
                                </BaseFlipper>
                                <BaseFlipper className="s:w-auto" play={playFlipper} offset={0.3}>
                                    E
                                </BaseFlipper>
                            </div>
                        </div>
                        <div>
                            <div className="flex gap-4 xxl:gap-2 s:grid s:grid-cols-5">
                                <BaseFlipper className="s:w-auto" play={playFlipper} offset={0.8}>
                                    T
                                </BaseFlipper>
                                <BaseFlipper className="s:w-auto" play={playFlipper} offset={0.9}>
                                    O
                                </BaseFlipper>
                            </div>
                        </div>
                        <div className="l:mt-24 l:w-full s:col-span-2 s:mt-0">
                            <div className="flex gap-4 xxl:gap-2">
                                <BaseFlipper className="l:!w-1/4" play={playFlipper} offset={1.7}>
                                    M
                                </BaseFlipper>
                                <BaseFlipper className="l:!w-1/4" play={playFlipper} offset={1.8}>
                                    A
                                </BaseFlipper>
                                <BaseFlipper className="l:!w-1/4" play={playFlipper} offset={1.9}>
                                    R
                                </BaseFlipper>
                                <BaseFlipper className="l:!w-1/4" play={playFlipper} offset={2.0}>
                                    S
                                </BaseFlipper>
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <BaseBtn className="mx-auto s:w-full" onClick={mapTransition} size="large" variant="glow">
                            Fly To Olympics 2092
                            <BaseIcon name="arrow-right-fill" className="ml-8" width="32px" height="32px" />
                        </BaseBtn>

                        <p className="mt-16 hidden text-center text-14 l:block xxs:text-12">
                            *for the best experience, please view on a larger display
                        </p>
                    </div>
                </div>
            </div>

            <canvas ref={canvas} className="absolute inset-0 z-10" />
        </section>
    );
}
