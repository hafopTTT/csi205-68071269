"use client";

import { checkLogin } from "@/utils/login";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter()
  useEffect(() => checkLogin(router, "/"), [router])
  
  return (
    <section className="home-page">
      <div className="home-card">
        <div className="home-profile">
          <Image
            className="home-photo"
            src="/profile/Profile.jpg"
            alt="68071269 สิรวิชญ์ สัปทน"
            width={400}
            height={400}
            priority
          />
          <div className="home-caption">
            <strong>68071269 Sirawit Sappathon</strong>
            <div>Computer Science and Software Development Innovation Dept. (CSI)</div>
            <div>Sripatum University (SPU)</div>
          </div>
        </div>

        <div className="home-content">
          <h2 className="home-heading">Career Objective</h2>
          <p>
            Seeking a position in the field of{" "}
            <span className="home-highlight">
              Computer Science and Software Development
            </span>
            , with a focus on{" "}
            <strong>software and application development</strong>. I aim to
            apply the knowledge gained from my studies—including{" "}
            <strong>programming</strong>,{" "}
            <strong>system design and development</strong>, and{" "}
            <strong>technical problem-solving</strong>—to real-world projects,
            while further honing my skills to foster{" "}
            <span className="home-highlight">
              long-term professional growth
            </span>{" "}
            within the technology sector.
          </p>
        </div>
      </div>

      <style>{`
        .home-page {
          width: min(100% - 32px, 900px);
          margin: 20px auto 40px;
          color: #172033;
        }
        .home-card {
          display: flex;
          align-items: flex-start;
          gap: 24px;
          padding: 16px;
          border: 1px solid #ccc;
          border-radius: 10px;
          background: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          box-sizing: border-box;
        }
        .home-profile {
          flex: 0 0 280px;
          overflow: hidden;
          border: 1px solid #ccc;
          border-radius: 8px;
          background: #fafafa;
        }
        .home-photo {
          display: block;
          width: 100%;
          height: auto;
          aspect-ratio: 1;
          object-fit: cover;
        }
        .home-caption {
          padding: 10px 12px;
          font-size: 0.85rem;
          line-height: 1.6;
        }
        .home-content {
          flex: 1;
          min-width: 0;
          line-height: 1.7;
        }
        .home-heading {
          margin: 0 0 8px;
          font-size: 1.25rem;
          color: #0d6efd;
        }
        .home-content p {
          margin: 0;
          text-align: justify;
        }
          .home-content strong {
          color: #0d6efd;
            font-weight: 700;
        }
      .home-highlight {
          font-weight: 700;
          color: #172033;
        background: linear-gradient(transparent 60%, #ffe58f 60%);
          padding: 0 2px;
        }
        @media (max-width: 640px) {
          .home-card {
            flex-direction: column;
            align-items: stretch;
          }
          .home-profile {
            flex-basis: auto;
            max-width: 320px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
}
