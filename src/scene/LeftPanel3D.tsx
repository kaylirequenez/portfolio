import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { profile } from "../data/profile";
import type { AvatarMetrics } from "./avatarMetrics";

function PanelSection({
  children,
  col,
  row,
  centered,
  avatarMetrics,
}: {
  children: React.ReactNode;
  col?: 0 | 1;
  row?: 0 | 1;
  centered?: boolean;
  avatarMetrics?: AvatarMetrics;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera, size } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;

    const cam = camera as THREE.PerspectiveCamera;
    const distance = 2.2;

    const vFov = (cam.fov * Math.PI) / 180;
    const heightWorld = 2 * Math.tan(vFov / 2) * distance;
    const widthWorld = heightWorld * cam.aspect;

    const pxToWorldX = widthWorld / size.width;
    const pxToWorldY = heightWorld / size.height;

    // ---------------------------
    // Define valid regions in PX
    // ---------------------------

    const screenCenterPx = size.width / 2;
    const validLeftPx = 15;

    const avatarLeftPx = avatarMetrics?.leftPx ?? screenCenterPx;
    const validRightPx = avatarLeftPx + 20;

    let targetXPx = size.width / 4;
    let targetYPx = size.height / 2;

    // ---------------------------
    // Horizontal placement
    // ---------------------------

    if (!centered && col !== undefined) {
      const halfWidthPx = validRightPx - validLeftPx;
      const quarterPx = halfWidthPx / 2;

      targetXPx =
        col === 0
          ? validLeftPx + quarterPx / 2
          : validLeftPx + quarterPx + quarterPx / 2;
    }

    // ---------------------------
    // Vertical placement
    // ---------------------------

    if (avatarMetrics && row !== undefined && !centered) {
      const topBandPx = avatarMetrics.topPx + avatarMetrics.avatarHeightPx / 4;
      const bottomBandPx =
        avatarMetrics.topPx + (3 * avatarMetrics.avatarHeightPx) / 4;

      targetYPx = row === 0 ? topBandPx : bottomBandPx;
    }

    if (centered && avatarMetrics) {
      targetYPx = avatarMetrics.topPx / 2;
    }

    // ---------------------------
    // Convert PX → WORLD
    // ---------------------------

    const xWorld = (targetXPx - screenCenterPx) * pxToWorldX;

    const yWorld = (size.height / 2 - targetYPx) * pxToWorldY;

    const targetPos = new THREE.Vector3(xWorld, yWorld, -distance).applyMatrix4(
      cam.matrixWorld
    );

    groupRef.current.position.lerp(targetPos, 0.12);
    groupRef.current.quaternion.slerp(cam.quaternion, 0.12);
  });

  // ---------------------------
  // Width calculation (PX only)
  // ---------------------------

  const avatarLeftPx = avatarMetrics?.leftPx ?? size.width / 2;
  const validWidthPx = avatarLeftPx;

  let widthPx: number;

  if (centered) {
    widthPx = size.width / 2;
  } else if (col !== undefined) {
    widthPx = Math.max(validWidthPx / 2, 180);
  } else {
    widthPx = validWidthPx;
  }

  return (
    <group ref={groupRef}>
      <Html
        transform={false}
        center
        style={{
          width: `${widthPx}px`,
          maxWidth: `${widthPx}px`,
          pointerEvents: "auto",
          overflow: "hidden",
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
      <div style={sectionTitle}>{title}</div>
      {children}
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div style={stat} title={hint}>
      <span style={statLabel}>{label}</span>
      <span>{value}</span>
    </div>
  );
}

export default function LeftPanel3D({
  avatarMetrics,
}: {
  avatarMetrics?: AvatarMetrics;
}) {
  return (
    <>
      {/* HEADER */}
      <PanelSection centered avatarMetrics={avatarMetrics}>
        <div style={block}>
          <div style={name}>{profile.name.toUpperCase()}</div>
          <div style={title}>{profile.identity.title}</div>
          <div style={blurb}>{profile.identity.blurb}</div>
        </div>
      </PanelSection>

      <PanelSection col={0} row={0} avatarMetrics={avatarMetrics}>
        <Section title="ORIGIN">
          <div style={scrollAll}>
            <div style={linesColumn}>
              {Object.entries(profile.origin).map(([k, v]) => (
                <div key={k} style={lineNoWrap}>
                  <Stat label={k.toUpperCase()} value={v} />
                </div>
              ))}
            </div>
          </div>
        </Section>
      </PanelSection>

      <PanelSection col={0} row={1} avatarMetrics={avatarMetrics}>
        <Section title="SKILLS">
          <div style={scrollAll}>
            <div style={linesColumn}>
              {profile.skills.map((s) => (
                <div key={s} style={lineNoWrap}>
                  {s}
                </div>
              ))}
            </div>
          </div>
        </Section>
      </PanelSection>

      <PanelSection col={1} row={0} avatarMetrics={avatarMetrics}>
        <Section title="TOOLS">
          <div style={scrollAll}>
            <div style={linesColumn}>
              {profile.tools.map((t) => (
                <div key={t} style={lineNoWrap}>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </Section>
      </PanelSection>

      <PanelSection col={1} row={1} avatarMetrics={avatarMetrics}>
        <Section title="WEAPONRY">
          <div style={scrollAll}>
            <div style={linesColumn}>
              {profile.weaponry.map((w) => (
                <div key={w} style={lineNoWrap}>
                  {w}
                </div>
              ))}
            </div>
          </div>
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
  width: "100%",
  boxSizing: "border-box" as const,
};

const name = {
  fontSize: "34px",
  color: "#5EE6D6",
  textAlign: "center" as const,
};
const title = { fontSize: "18px", color: "#8F94AA" };
const blurb = { fontSize: "13px", lineHeight: "1.4" };

const section = {
  fontFamily: "'VT323', monospace",
  color: "#eaf5ff",
  fontSize: "13px",
  width: "100%",
};

const sectionTitle = {
  color: "#5EE6D6",
  fontSize: "16px",
  marginBottom: "6px",
};

const lineNoWrap = {
  whiteSpace: "nowrap" as const,
  lineHeight: "1.5",
};

const stat = {
  display: "flex",
  justifyContent: "space-between",
};

const statLabel = { color: "#8F94AA" };

const scrollAll = {
  overflowX: "auto" as const,
  width: "100%",
};

const linesColumn = {
  width: "100%",
  textAlign: "center" as const,
};
