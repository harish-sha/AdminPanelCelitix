
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCube } from "swiper/modules";


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-cube";

const VerticalDiceCarousel = () => {
    return (
        <div className="w-full max-w-6xl mx-auto py-12">
            <Swiper
                modules={[Navigation, Autoplay, EffectCube]}
                effect="cube"
                grabCursor={true}
                navigation
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                speed={1000}
                className="vertical-dice h-[400px] w-full md:h-[500px] lg:h-[600px]"
            >
                {[
                    "https://images.unsplash.com/photo-1755804110868-7857b0be8113?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D=1",
                    "https://images.unsplash.com/photo-1757137911521-458496283554?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyOXx8fGVufDB8fHx8fA%3D%3D=2",
                    "https://picsum.photos/1200/600?random=3",
                    "https://picsum.photos/1200/600?random=4",
                ].map((img, i) => (
                    <SwiperSlide key={i}>
                        <div className="relative w-full h-full rounded-2xl overflow-hidden dice-face">
                            <img
                                src={img}
                                alt={`Slide ${i + 1}`}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-6 left-6 text-white text-3xl font-extrabold drop-shadow-xl">
                                Slide {i + 1}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom CSS to force vertical-only cube rotation + glowing dice */}
            <style jsx global>{`
        .vertical-dice {
          perspective: 1600px;
        }

        /* Glow around the cube */
        .vertical-dice .swiper-cube {
          filter: drop-shadow(0px 15px 25px rgba(0, 0, 0, 0.4))
            drop-shadow(0px 0px 40px rgba(99, 102, 241, 0.4)); /* Indigo glow */
        }

        /* Dice faces */
        .vertical-dice .dice-face {
          position: relative;
          box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.35),
            0 10px 25px rgba(0, 0, 0, 0.4);
          background: radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.15),
            rgba(0, 0, 0, 0.4)
          );
        }

        /* Force cube to rotate vertically only */
        .vertical-dice .swiper-cube .swiper-slide-prev {
          transform: rotateX(-90deg) translateZ(var(--swiper-width));
        }
        .vertical-dice .swiper-cube .swiper-slide-next {
          transform: rotateX(90deg) translateZ(var(--swiper-width));
        }
        .vertical-dice .swiper-cube .swiper-slide-active {
          transform: translateZ(var(--swiper-width));
        }
      `}</style>
        </div>
    );
};

export default VerticalDiceCarousel;
