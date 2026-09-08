"use client";

import { LogIn, UserPlus } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { PiHandSwipeLeftFill, PiHandSwipeRightFill } from "react-icons/pi";

// Interactive Draggable & Clickable Segmented Toggle
const AuthModeToggle = ({ mode, onModeChange, setMode }) => {
  const changeMode = onModeChange || setMode;
  const containerRef = useRef(null);
  const pillRef = useRef(null);
  const signInBtnRef = useRef(null);
  const registerBtnRef = useRef(null);

  const [visualMode, setVisualMode] = useState(mode);

  const isPointerDownRef = useRef(false);
  const isDraggingRef = useRef(false);
  const hasCapturedRef = useRef(false);
  const startXRef = useRef(0);
  const startModeRef = useRef(mode);
  const maxTravelRef = useRef(0);
  const currentOffsetRef = useRef(0);
  const isSnappingRef = useRef(false);
  const justDraggedRef = useRef(false);

  const getDimensions = () => {
    if (signInBtnRef.current && registerBtnRef.current) {
      const travel = registerBtnRef.current.offsetLeft - signInBtnRef.current.offsetLeft;
      if (travel > 0) {
        maxTravelRef.current = travel;
        return travel;
      }
    }
    if (containerRef.current) {
      const travel = (containerRef.current.clientWidth - 8) / 2;
      if (travel > 0) {
        maxTravelRef.current = travel;
        return travel;
      }
    }
    return 0;
  };

  const [prevMode, setPrevMode] = useState(mode);
  if (prevMode !== mode) {
    setPrevMode(mode);
    setVisualMode(mode);
  }

  // Synchronize pill position
  useEffect(() => {
    if (isDraggingRef.current || isSnappingRef.current) return;

    const syncPill = () => {
      const maxTravel = getDimensions();
      if (!pillRef.current) return;
      pillRef.current.style.transition = "transform 300ms cubic-bezier(0.2, 0.8, 0.2, 1)";
      const targetOffset = mode === "register" ? maxTravel : 0;
      pillRef.current.style.transform = `translateX(${targetOffset}px)`;
      currentOffsetRef.current = targetOffset;
    };

    syncPill();

    window.addEventListener("resize", syncPill);
    return () => window.removeEventListener("resize", syncPill);
  }, [mode]);

  const switchModeTo = (target) => {
    if (isDraggingRef.current || isSnappingRef.current || justDraggedRef.current) return;
    if (mode === target && visualMode === target) return;

    setVisualMode(target);
    const maxTravel = getDimensions();
    const targetOffset = target === "register" ? maxTravel : 0;

    if (pillRef.current) {
      pillRef.current.style.transition = "transform 250ms cubic-bezier(0.2, 0.8, 0.2, 1)";
      pillRef.current.style.transform = `translateX(${targetOffset}px)`;
      currentOffsetRef.current = targetOffset;
    }

    if (mode !== target && changeMode) {
      changeMode(target);
    }
  };

  const handlePointerDown = (e) => {
    // Only handle primary button (mouse left-click) or touch
    if (e.button !== undefined && e.button !== 0) return;
    if (isSnappingRef.current) return;

    const maxTravel = getDimensions();
    if (maxTravel <= 0) return;

    isPointerDownRef.current = true;
    isDraggingRef.current = false;
    hasCapturedRef.current = false;
    startXRef.current = e.clientX;
    startModeRef.current = mode;
    currentOffsetRef.current = mode === "register" ? maxTravel : 0;
  };

  const handlePointerMove = (e) => {
    if (!isPointerDownRef.current) return;

    const deltaX = e.clientX - startXRef.current;

    if (!isDraggingRef.current) {
      if (Math.abs(deltaX) > 5) {
        isDraggingRef.current = true;
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
          hasCapturedRef.current = true;
        } catch {
          // ignore
        }
        if (containerRef.current) {
          containerRef.current.style.cursor = "grabbing";
        }
        if (pillRef.current) {
          pillRef.current.style.transition = "none";
        }
      } else {
        return;
      }
    }

    const maxTravel = maxTravelRef.current || getDimensions();
    if (maxTravel <= 0) return;

    let newOffset;
    if (startModeRef.current === "login") {
      // Dragging right toward register
      newOffset = Math.max(0, Math.min(maxTravel, deltaX));
    } else {
      // Dragging left toward login
      newOffset = Math.max(0, Math.min(maxTravel, maxTravel + deltaX));
    }

    currentOffsetRef.current = newOffset;

    // Real-time continuous pill movement without re-rendering forms
    if (pillRef.current) {
      pillRef.current.style.transform = `translateX(${newOffset}px)`;
    }

    // Dynamic text highlight update when past midpoint
    const progress = newOffset / maxTravel;
    if (progress > 0.5 && visualMode !== "register") {
      setVisualMode("register");
    } else if (progress <= 0.5 && visualMode !== "login") {
      setVisualMode("login");
    }
  };

  const handlePointerUp = (e) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;

    if (hasCapturedRef.current) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      hasCapturedRef.current = false;
    }

    if (containerRef.current) {
      containerRef.current.style.cursor = "";
    }

    const maxTravel = maxTravelRef.current || getDimensions();

    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      justDraggedRef.current = true;
      setTimeout(() => {
        justDraggedRef.current = false;
      }, 200);

      const deltaX = e.clientX - startXRef.current;
      const threshold = Math.min(45, maxTravel * 0.35);

      let targetMode;
      let targetOffset;

      if (startModeRef.current === "login") {
        if (deltaX >= threshold) {
          targetMode = "register";
          targetOffset = maxTravel;
        } else {
          targetMode = "login";
          targetOffset = 0;
        }
      } else {
        if (deltaX <= -threshold) {
          targetMode = "login";
          targetOffset = 0;
        } else {
          targetMode = "register";
          targetOffset = maxTravel;
        }
      }

      isSnappingRef.current = true;
      setVisualMode(targetMode);

      // Animate/snap pill to final destination
      if (pillRef.current) {
        pillRef.current.style.transition = "transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1)";
        pillRef.current.style.transform = `translateX(${targetOffset}px)`;
        currentOffsetRef.current = targetOffset;
      }

      // After pill completes its snap, update actual mode (triggering form switch)
      setTimeout(() => {
        isSnappingRef.current = false;
        if (targetMode !== mode && changeMode) {
          changeMode(targetMode);
        }
      }, 180);
    } else {
      // User tapped or clicked without dragging
      let targetMode = null;
      if (registerBtnRef.current && registerBtnRef.current.contains(e.target)) {
        targetMode = "register";
      } else if (signInBtnRef.current && signInBtnRef.current.contains(e.target)) {
        targetMode = "login";
      } else if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        targetMode = e.clientX >= rect.left + rect.width / 2 ? "register" : "login";
      }

      if (targetMode) {
        switchModeTo(targetMode);
      }
    }
  };

  const handlePointerCancel = (e) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;

    if (hasCapturedRef.current) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      hasCapturedRef.current = false;
    }

    if (containerRef.current) {
      containerRef.current.style.cursor = "";
    }

    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      const maxTravel = maxTravelRef.current || getDimensions();
      const targetOffset = mode === "register" ? maxTravel : 0;
      setVisualMode(mode);

      if (pillRef.current) {
        pillRef.current.style.transition = "transform 200ms ease-out";
        pillRef.current.style.transform = `translateX(${targetOffset}px)`;
        currentOffsetRef.current = targetOffset;
      }
    }
  };

  return (
    <div className="w-full max-w-xs sm:max-w-sm mb-8 sm:mb-10">
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        style={{ touchAction: "none" }}
        className="relative flex p-1 rounded-2xl bg-slate-100 border border-slate-200/80 shadow-inner select-none cursor-grab active:cursor-grabbing"
      >
        {/* Active Highlight Pill */}
        <div
          ref={pillRef}
          style={{
            transform: mode === "register" ? "translateX(100%)" : "translateX(0px)",
          }}
          className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-xl bg-linear-to-r from-[#0a3d62] to-[#3498db] shadow-md pointer-events-none"
        />

        <button
          ref={signInBtnRef}
          type="button"
          onClick={() => switchModeTo("login")}
          className={`relative z-10 flex-1 py-2.5 sm:py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 rounded-xl transition-colors duration-200 cursor-pointer ${visualMode === "login"
            ? "text-white"
            : "text-slate-600 hover:text-[#0a3d62]"
            }`}
        >
          <LogIn className="size-4" />
          <span>Sign In</span>
        </button>

        <button
          ref={registerBtnRef}
          type="button"
          onClick={() => switchModeTo("register")}
          className={`relative z-10 flex-1 py-2.5 sm:py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 rounded-xl transition-colors duration-200 cursor-pointer ${visualMode === "register"
            ? "text-white"
            : "text-slate-600 hover:text-[#0a3d62]"
            }`}
        >
          <UserPlus className="size-4" />
          <span>Create Account</span>
        </button>
      </div>
      <p className="text-[11px] text-center text-slate-400 mt-2 ">
        {mode === "login" ? (
          <>
            Swipe Right <PiHandSwipeRightFill className="inline-block mx-1 text-[#3498db]" /> to Create Account
          </>
        ) : (
          <>
            Swipe Left <PiHandSwipeLeftFill className="inline-block mx-1 text-[#3498db]" /> to Sign In
          </>
        )}
      </p>
    </div>
  );
};

export default AuthModeToggle;
