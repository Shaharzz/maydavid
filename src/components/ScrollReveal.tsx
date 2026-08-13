import React, { useEffect, useMemo, useRef, type ReactNode, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;
    const wordElements = el.querySelectorAll<HTMLElement>('.word');

    gsap.set(el, {
      rotate: baseRotation,
      transformOrigin: '0% 50%',
    });

    gsap.set(wordElements, {
      opacity: baseOpacity,
      filter: enableBlur ? `blur(${blurStrength}px)` : 'blur(0px)',
      willChange: 'opacity, filter, transform',
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        scroller,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true,
      },
    });

    tl.to(el, { rotate: 0, ease: 'none', duration: 1 });
    tl.to(
      wordElements,
      {
        opacity: 1,
        filter: 'blur(0px)',
        stagger: 0.05,
        ease: 'none',
        duration: 1,
      },
      0,
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, blurStrength]);

  return (
    <h2 ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <p className={`scroll-reveal-text ${textClassName}`}>{splitText}</p>
    </h2>
  );
};

export default ScrollReveal;
