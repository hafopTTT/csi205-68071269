"use client";

import { checkLogin } from "@/utils/login";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type BallType = "none" | "basketball" | "football" | "valleyball" | "stde";
const BALL_IMAGES: Record<Exclude<BallType, "none">, string> = {
  basketball: "/animation/basketball.jpg",
  football: "/animation/football.jpg",
  valleyball: "/animation/valleyball.png",
  stde: "/animation/stde.png",
};

const FIELD_WIDTH = 700;
const FIELD_HEIGHT = 480;
const BALL_DIAMETER = 100;
const VELOCITY = 300;
const FRAME_MS = 40;

export default function AnimationPage() {
  const router = useRouter();
  useEffect(() => checkLogin(router, "/animation"), [router]);

  const [ballType, setBallType] = useState<BallType>("none");
  const [running, setRunning] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0, angle: 0 });
  const direction = useRef({ x: 1, y: 1 });

  const resetPosition = useCallback(() => {
    setPosition({ x: 0, y: 0, angle: 0 });
    direction.current = { x: 1, y: 1 };
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setPosition((previous) => {
        const step = (VELOCITY * (FRAME_MS / 1000)) / Math.sqrt(2);
        let x = previous.x + step * direction.current.x;
        let y = previous.y + step * direction.current.y;
        const maxX = FIELD_WIDTH - BALL_DIAMETER - 4;
        const maxY = FIELD_HEIGHT - BALL_DIAMETER - 4;
        if (x >= maxX) { x = maxX - (x - maxX); direction.current.x = -1; }
        if (x <= 0) { x = -x; direction.current.x = 1; }
        if (y >= maxY) { y = maxY - (y - maxY); direction.current.y = -1; }
        if (y <= 0) { y = -y; direction.current.y = 1; }
        return { x, y, angle: (previous.angle + 10) % 360 };
      });
    }, FRAME_MS);
    return () => window.clearInterval(timer);
  }, [running]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        setRunning((value) => !value);
      } else if (event.key === "0") setBallType("none");
      else if (event.key === "1") setBallType("basketball");
      else if (event.key === "2") setBallType("football");
      else if (event.key === "3") setBallType("valleyball");
      else if (event.key === "4") setBallType("stde");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <section className="anim-page">
      <h1 className="anim-title">68071269 สิรวิชญ์ สัปทน</h1>
      <div className="anim-field">
        <div
          className="anim-ball"
          style={{
            left: `${(position.x / FIELD_WIDTH) * 100}%`,
            top: `${(position.y / FIELD_HEIGHT) * 100}%`,
            transform: `rotate(${position.angle}deg)`,
            backgroundImage: ballType === "none" ? "none" : `url("${BALL_IMAGES[ballType]}")`,
          }}
        />
      </div>
      <div className="anim-controls">
        <button className={`anim-button ${running ? "anim-pause" : "anim-run"}`} onClick={() => setRunning((value) => !value)}>
          {running ? "⏸ PAUSE" : "▶ RUN"}
        </button>
        <div className="anim-ball-buttons">
          {(["none", "basketball", "football", "valleyball", "stde"] as BallType[]).map((type) => (
            <button key={type} className={`anim-button ${ballType === type ? "anim-selected" : "anim-outline"}`} onClick={() => setBallType(type)}>
              {{ none: "None", basketball: "Basketball", football: "Football", valleyball: "Volleyball", stde: "Human" }[type]}
            </button>
          ))}
        </div>
      </div>
      {/* <p className="anim-help">คีย์บอร์ด: Space = Run/Pause · 0 = None · 1 = Basketball · 2 = Football · 3 = Volleyball · 4 = Human</p> */}
      {/* <button className="anim-button anim-outline" onClick={resetPosition}>Reset Position</button> */}

      <style>{`
        .anim-page {
          width: min(100% - 32px, 640px);
          margin: 16px auto 32px;
          color: #172033;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .anim-title {
          margin: 0 0 12px;
          text-align: center;
          font-size: clamp(1.1rem, 2.5vw, 1.6rem);
          color: #0d6efd;
        }

        .anim-field {
          position: relative;
          width: 100%;
          max-height: 60vh;
          aspect-ratio: 700 / 480;
          overflow: hidden;
          border: 2px solid #111;
          border-radius: 10px;
          background-image: url("/animation/field.jpg");
          background-position: center;
          background-size: cover;
          box-sizing: border-box;
        }

        .anim-ball {
          position: absolute;
          width: 14.2857%;
          aspect-ratio: 1;
          border: 1px solid #111;
          border-radius: 50%;
          background-color: lightgray;
          background-size: cover;
          background-position: center;
          box-sizing: border-box;
        }

        .anim-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 12px;
          width: 100%;
          box-sizing: border-box;
        }

        .anim-ball-buttons {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          gap: 4px;
          margin-left: auto;
          max-width: 100%;
          box-sizing: border-box;
        }

        .anim-button {
          border: 1px solid transparent;
          border-radius: 7px;
          padding: 9px 12px;
          font: inherit;
          cursor: pointer;
        }

        .anim-run {
          color: white;
          background: #198754;
        }

        .anim-pause {
          color: white;
          background: #dc3545;
        }

        .anim-outline {
          color: #0d6efd;
          border-color: #0d6efd;
          background: white;
        }

        .anim-selected {
          color: white;
          background: #0d6efd;
        }

        .anim-help {
          margin: 12px 0;
          color: #555;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        @media (max-width: 520px) {
          .anim-controls {
            align-items: flex-start;
          }

          .anim-ball-buttons {
            margin-left: 0;
            justify-content: flex-start;
          }

          .anim-button {
            padding: 8px 10px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
}
