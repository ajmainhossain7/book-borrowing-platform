"use client";

import { useEffect, useRef, useState } from "react";

//  ScrollReveal — wraps any content and triggers animate.css classes
//  only when the element enters the viewport.
//   Props:
//   - animation: any animate.css class e.g. "animate__fadeInUp" (default)
//   - delay: CSS delay string e.g. "0.2s"
//   - threshold: 0–1, how much of element must be visible (default 0.15)
//   - className: extra classes for the wrapper div
 
export default function ScrollReveal({
  children,
  animation = "animate__fadeInUp",
  delay = "0s",
  threshold = 0.15,
  className = "",
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // fire once only
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`${className} ${
        visible ? `animate__animated ${animation}` : "opacity-0"
      }`}
      style={{
        animationDelay: delay,
        animationFillMode: "both",
      }}
    >
      {children}
    </div>
  );
}