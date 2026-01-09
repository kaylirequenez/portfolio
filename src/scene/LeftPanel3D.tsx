import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { profile } from "../data/profile";
import type { AvatarMetrics } from "./avatarMetrics";

/* ================= LAYOUT CONSTANTS ================= */

const SIDE_MARGIN = 14;
const BOTTOM_MARGIN = 14;

/* ================= PANEL SECTION ================= */

function PanelSection({
  children,
  side,
  row,
  avatarMetrics,
}: {
  children: React.ReactNode;
  side: "left" | "right" | "bottom";
  row?: 0 | 1;
  avatarMetrics?: AvatarMetrics;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera, size } = useThree();

  useFrame(() => {
    if (!groupRef.current || !avatarMetrics) return;

    const cam = camera as THREE.PerspectiveCamera;
    const distance = 2.2;

    const vFov = (cam.fov * Math.PI) / 180;
    const heightWorld = 2 * Math.tan(vFov / 2) * distance;
    const widthWorld = heightWorld * cam.aspect;

    const pxToWorldX = widthWorld / size.width;
    const pxToWorldY = heightWorld / size.height;

    const screenCenterPx = size.width / 2;

    let targetXPx = screenCenterPx;
    let targetYPx =
      size.height -
      BOTTOM_MARGIN -
      (size.height - avatarMetrics.bottomPx - BOTTOM_MARGIN) / 2;

    /* ---------- HORIZONTAL ---------- */

    if (side === "left") {
      const leftRegionStart = SIDE_MARGIN;
      const leftRegionPxs = avatarMetrics.leftPx;
      targetXPx = leftRegionStart + leftRegionPxs / 2;
    }

    if (side === "right") {
      const rightRegionEnd = size.width - SIDE_MARGIN;
      const rightRegionPxs =
        size.width - 2 * SIDE_MARGIN - avatarMetrics.rightPx;
      targetXPx = rightRegionEnd - rightRegionPxs / 2;
    }

    /* ---------- VERTICAL ---------- */

    if (row !== undefined)
      targetYPx =
        avatarMetrics.topPx +
        avatarMetrics.avatarHeightPx * (row === 0 ? 0.25 : 0.75);

    /* ---------- PX → WORLD ---------- */

    const xWorld = (targetXPx - screenCenterPx) * pxToWorldX;
    const yWorld = (size.height / 2 - targetYPx) * pxToWorldY;

    const targetPos = new THREE.Vector3(xWorld, yWorld, -distance).applyMatrix4(
      cam.matrixWorld
    );

    groupRef.current.position.lerp(targetPos, 0.12);
  });

  /* ---------- WIDTH (PX ONLY) ---------- */

  let widthPx = 320;

  if (avatarMetrics) {
    if (side === "left") widthPx = avatarMetrics.leftPx - SIDE_MARGIN;
    if (side === "right")
      widthPx = size.width - avatarMetrics.rightPx - SIDE_MARGIN;
    if (side === "bottom") widthPx = size.width / 1.5;
  }

  widthPx = Math.max(widthPx, 200);

  return (
    <group ref={groupRef}>
      <Html
        center
        style={{
          width: `${widthPx}px`,
          maxWidth: `${widthPx}px`,
          pointerEvents: "auto",
          overflow: "hidden",
          transformOrigin: "center center",
        }}
      >
        {children}
      </Html>
    </group>
  );
}

/* ================= CONTENT ================= */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={section}>
      <div style={sectionHeader}>
        <div style={sectionRule} />
        <div style={sectionTitle}>{title}</div>
      </div>
      {children}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={stat}>
      <span style={statLabel}>{label}</span>
      <span>{value}</span>
    </div>
  );
}

/* ================= MAIN EXPORT ================= */

export default function LeftPanel3D({
  avatarMetrics,
}: {
  avatarMetrics?: AvatarMetrics;
}) {
  return (
    <>
      {/* BOTTOM BLURB */}
      <PanelSection side="bottom" avatarMetrics={avatarMetrics}>
        <div style={block}>
          <div style={sectionHeaderCenter}>
            <div style={sectionRule} />
            <div style={sectionTitle}>BIO</div>
          </div>
          <div style={blurb}>{profile.identity.blurb}</div>
        </div>
      </PanelSection>

      {/* LEFT */}
      <PanelSection side="left" row={0} avatarMetrics={avatarMetrics}>
        <Section title="ORIGIN">
          {Object.entries(profile.origin).map(([k, v]) => (
            <div key={k} style={lineNoWrap}>
              <Stat label={k.toUpperCase()} value={v} />
            </div>
          ))}
        </Section>
      </PanelSection>

      <PanelSection side="left" row={1} avatarMetrics={avatarMetrics}>
        <Section title="SKILLS">
          {profile.skills.map((s) => (
            <div key={s} style={lineNoWrap}>
              {s}
            </div>
          ))}
        </Section>
      </PanelSection>

      {/* RIGHT */}
      <PanelSection side="right" row={0} avatarMetrics={avatarMetrics}>
        <Section title="TOOLS">
          {profile.tools.map((t) => (
            <div key={t} style={lineNoWrap}>
              {t}
            </div>
          ))}
        </Section>
      </PanelSection>

      <PanelSection side="right" row={1} avatarMetrics={avatarMetrics}>
        <Section title="WEAPONRY">
          {profile.weaponry.map((w) => (
            <div key={w} style={lineNoWrap}>
              {w}
            </div>
          ))}
        </Section>
      </PanelSection>
    </>
  );
}

/* ================= STYLES ================= */

const block = {
  fontFamily: "'VT323', monospace",
  color: "#eaf5ff",
  padding: "20px",
  textAlign: "center" as const,
};

const blurb = {
  fontSize: "13px",
  lineHeight: "1.4",
};

const section = {
  fontFamily: "'VT323', monospace",
  color: "#eaf5ff",
  fontSize: "13px",
};

const sectionHeader = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "6px",
};

const sectionHeaderCenter = {
  ...sectionHeader,
  justifyContent: "center",
};

const sectionRule = {
  height: "1px",
  width: "18px",
  background: "rgba(94, 230, 214, 0.4)",
};

const sectionTitle = {
  color: "#5EE6D6",
  fontSize: "16px",
  letterSpacing: "0.08em",
};

const lineNoWrap = {
  whiteSpace: "nowrap" as const,
  lineHeight: "1.5",
};

const stat = {
  display: "flex",
  justifyContent: "space-between",
};

const statLabel = {
  color: "#8F94AA",
};
