import { useRef, useEffect, useState, useCallback, type CSSProperties, type KeyboardEvent, type MouseEvent } from 'react';
import { gsap } from 'gsap';

import './AccordionGallery.css';

export interface AccordionGalleryItem {
  image?: string;
  video?: string;
  label?: string;
  link?: string;
  alt?: string;
}

export interface AccordionGalleryProps {
  items?: AccordionGalleryItem[];
  defaultIndex?: number;
  accentColor?: string;
  overlayColor?: string;
  textColor?: string;
  height?: number;
  gap?: number;
  radius?: number;
  expandRatio?: number;
  orientation?: 'horizontal' | 'vertical';
  duration?: number;
  ease?: string;
  parallax?: number;
  tilt?: number;
  stagger?: number;
  trigger?: 'hover' | 'click';
  showLabels?: boolean;
  grayscale?: boolean;
  className?: string;
}

const DEFAULT_ITEMS: AccordionGalleryItem[] = [
  { label: 'Canyon', link: '#' },
  { label: 'Ridgeline', link: '#' },
  { label: 'Falls', link: '#' },
  { label: 'Harbour', link: '#' },
  { label: 'Skyline', link: '#' },
];

const AccordionGallery = ({
  items = DEFAULT_ITEMS,
  defaultIndex = 2,
  accentColor = '#ffffff',
  overlayColor = '#060010',
  textColor = '#ffffff',
  height = 460,
  gap = 10,
  radius = 16,
  expandRatio = 0.52,
  orientation = 'horizontal',
  duration = 0.6,
  ease = 'power3.out',
  parallax = 0.5,
  tilt = 8,
  stagger = 0.06,
  trigger = 'hover',
  showLabels = true,
  grayscale = true,
  className = ''
}: AccordionGalleryProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const mediaRefs = useRef<(HTMLElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const barRefs = useRef<(HTMLElement | null)[]>([]);
  const textRefs = useRef<(HTMLElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const firstRunRef = useRef(true);
  const mediaSizeRef = useRef(320);

  const vertical = orientation === 'vertical';
  const count = items.length;
  const [active, setActive] = useState(Math.min(Math.max(defaultIndex, 0), count - 1));
  const [selectedVideo, setSelectedVideo] = useState<AccordionGalleryItem | null>(null);
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(pointer: coarse)').matches : false;
  const effectiveTrigger = isTouchDevice ? 'click' : trigger;

  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const applyLayout = useCallback(
    (animate: boolean) => {
      const panels = panelRefs.current;
      if (!panels.length) return;

      const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;
      const mediaSize = mediaSizeRef.current;

      tlRef.current?.kill();
      const dur = animate && !prefersReduced ? duration : 0;
      const tl = gsap.timeline();

      panels.forEach((panel, i) => {
        if (!panel) return;
        const isActive = i === active;
        const media = mediaRefs.current[i];
        const bar = barRefs.current[i];
        const text = textRefs.current[i];

        const rot = isActive ? 0 : i < active ? tilt : -tilt;
        const rotProp = vertical ? { rotateX: -rot } : { rotateY: rot };

        tl.to(panel, { flexGrow: isActive ? grow : 1, ...rotProp, duration: dur, ease }, 0);

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, active - i));
          const shift = drift * parallax * mediaSize * 0.06;
          const gray = grayscale ? (isActive ? 0 : 1) : 0;
          tl.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: vertical ? 0 : isActive ? 0 : shift,
              y: vertical ? (isActive ? 0 : shift) : 0,
              '--ag-gray': gray,
              '--ag-dim': isActive ? 0 : 0.35,
              duration: dur,
              ease,
            },
            0,
          );
        }

        if (showLabels && bar && text) {
          if (isActive) {
            tl.to([bar, text], { opacity: 1, x: 0, duration: dur, ease, stagger: prefersReduced ? 0 : stagger }, 0);
          } else {
            tl.to([bar, text], { opacity: 0, x: -14, duration: dur * 0.6, ease }, 0);
          }
        }
      });

      tlRef.current = tl;
    },
    [active, count, expandRatio, duration, ease, vertical, tilt, parallax, grayscale, showLabels, stagger, prefersReduced],
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const total = vertical ? rect.height : rect.width;
      const usable = Math.max(total - gap * (count - 1), 120);
      const size = Math.max(140, usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.22);
      mediaSizeRef.current = size;
      el.style.setProperty('--ag-media-size', `${size}px`);
      applyLayout(!firstRunRef.current);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [applyLayout, gap, count, expandRatio, vertical]);

  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout]);

  useEffect(
    () => () => {
      tlRef.current?.kill();
    },
    [],
  );

  useEffect(() => {
    if (isTouchDevice) return;

    videoRefs.current.forEach((video, i) => {
      if (!video) return;

      if (i === active) {
        const playPromise = video.play();
        if (playPromise) {
          void playPromise.catch(() => {
            // autoplay can be blocked until the user interacts; keep the video muted and let manual play continue.
          });
        }
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [active, isTouchDevice]);

  useEffect(() => {
    if (!selectedVideo) return;

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedVideo(null);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedVideo]);

  const handleEnter = (i: number) => {
    if (effectiveTrigger === 'hover') setActive(i);
  };

  const closeVideo = () => setSelectedVideo(null);

  const handleClick = (item: AccordionGalleryItem, i: number, e: MouseEvent) => {
    if (item.video) {
      e.preventDefault();
      setActive(i);
      setSelectedVideo(item);
      return;
    }

    if (i !== active) {
      e.preventDefault();
      setActive(i);
    }
  };

  const handleKeyDown = (i: number, e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i + 1) % count);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i - 1 + count) % count);
    }
  };

  const rootStyle = {
    '--ag-accent': accentColor,
    '--ag-overlay': overlayColor,
    '--ag-text': textColor,
    '--ag-gap': `${gap}px`,
    '--ag-radius': `${radius}px`,
    height: vertical ? `${Math.round(height * 1.6)}px` : `${height}px`,
  } as CSSProperties;

  return (
    <>
      <div
        ref={rootRef}
        className={`accordion-gallery${vertical ? ' accordion-gallery--vertical' : ''}${className ? ` ${className}` : ''}`}
        style={rootStyle}
        role="list"
        aria-label="Image accordion gallery"
      >
        {items.map((item, i) => {
          const isActive = i === active;

          if (item.video) {
            return (
              <button
                key={i}
                type="button"
                ref={(el: HTMLElement | null) => {
                  panelRefs.current[i] = el;
                }}
                className={`ag-panel${isActive ? ' ag-panel--active' : ''}`}
                style={{ borderRadius: `${radius}px` }}
                onClick={(e) => handleClick(item, i, e)}
                onMouseEnter={() => handleEnter(i)}
                onFocus={() => setActive(i)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                role="listitem"
                tabIndex={0}
                aria-current={isActive ? 'true' : undefined}
                aria-label={item.label}
              >
                <span className="ag-panel__frame">
                  <span
                    className="ag-panel__media"
                    ref={(el: HTMLElement | null) => {
                      mediaRefs.current[i] = el;
                    }}
                  >
                    <video
                      ref={(el: HTMLVideoElement | null) => {
                        videoRefs.current[i] = el;
                      }}
                      src={item.video}
                      poster={item.image}
                      muted
                      playsInline
                      autoPlay={false}
                      loop
                      preload={i === active ? 'auto' : 'metadata'}
                      className="ag-panel__media-video"
                    />
                  </span>
                  <span className="ag-panel__overlay" aria-hidden="true" />
                </span>
                {showLabels && (
                  <span className="ag-panel__label" aria-hidden="true">
                    <span
                      className="ag-panel__bar"
                      ref={(el: HTMLElement | null) => {
                        barRefs.current[i] = el;
                      }}
                    />
                    <span
                      className="ag-panel__text"
                      ref={(el: HTMLElement | null) => {
                        textRefs.current[i] = el;
                      }}
                    >
                      {item.label}
                    </span>
                  </span>
                )}
              </button>
            );
          }

          return (
            <a
              key={i}
              ref={(el: HTMLElement | null) => {
                panelRefs.current[i] = el;
              }}
              className={`ag-panel${isActive ? ' ag-panel--active' : ''}`}
              style={{ borderRadius: `${radius}px` }}
              href={item.link || undefined}
              onClick={(e) => handleClick(item, i, e)}
              onMouseEnter={() => handleEnter(i)}
              onFocus={() => setActive(i)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              role="listitem"
              tabIndex={0}
              aria-current={isActive ? 'true' : undefined}
              aria-label={item.label}
            >
              <span className="ag-panel__frame">
                <span
                  className="ag-panel__media"
                  ref={(el: HTMLElement | null) => {
                    mediaRefs.current[i] = el;
                  }}
                >
                  {item.image ? (
                    <img src={item.image} alt={item.alt || item.label || ''} draggable={false} />
                  ) : null}
                </span>
                <span className="ag-panel__overlay" aria-hidden="true" />
              </span>
              {showLabels && (
                <span className="ag-panel__label" aria-hidden="true">
                  <span
                    className="ag-panel__bar"
                    ref={(el: HTMLElement | null) => {
                      barRefs.current[i] = el;
                    }}
                  />
                  <span
                    className="ag-panel__text"
                    ref={(el: HTMLElement | null) => {
                      textRefs.current[i] = el;
                    }}
                  >
                    {item.label}
                  </span>
                </span>
              )}
            </a>
          );
        })}
      </div>

      {selectedVideo && (
        <div
          className="ag-player-backdrop"
          onPointerDown={(e) => {
            const target = e.target as HTMLElement | null;
            if (!target?.closest('.ag-player')) closeVideo();
          }}
          onClick={(e) => {
            const target = e.target as HTMLElement | null;
            if (!target?.closest('.ag-player')) closeVideo();
          }}
          role="dialog"
          aria-modal="true"
          aria-label={selectedVideo.label || 'Video player'}
        >
          <div className="ag-player" onClick={(e) => e.stopPropagation()} onPointerDown={(e) => e.stopPropagation()}>
            <button type="button" className="ag-player__close" onClick={closeVideo} aria-label="Close video">
              ×
            </button>
            <video key={selectedVideo.video} src={selectedVideo.video} controls autoPlay playsInline className="ag-player__video" />
          </div>
        </div>
      )}
    </>
  );
};

export default AccordionGallery;
