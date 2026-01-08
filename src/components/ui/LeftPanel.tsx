import "./LeftPanel.css";
import { profile } from "../../data/profile";

export default function LeftPanel() {
  return (
    <aside className="left-panel">
      <div className="left-panel__header">
        <div className="left-panel__name">{profile.name}</div>
        <div className="left-panel__title">{profile.identity.title}</div>
        <div className="left-panel__subtitle">{profile.identity.blurb}</div>
      </div>

      <section className="left-panel__section">
        <div className="left-panel__section-title">ORIGIN STATS</div>
        <ul className="left-panel__list">
          <li>LOCATION: {profile.origin.homeland}</li>
          <li>INSTITUTION: {profile.origin.institution}</li>
          <li>DEGREE: {profile.origin.degree}</li>
          <li>MINOR: {profile.origin.minor}</li>
          <li>CLASS: {profile.origin.class}</li>
          <li title="Derived from GPA 4.8 / 5.0">
            INTEL: {profile.origin.intel}
          </li>
        </ul>
      </section>

      <section className="left-panel__section">
        <div className="left-panel__section-title">SKILLS</div>
        <div className="left-panel__list">
          {profile.skills.map((s) => (
            <div key={s}>{s}</div>
          ))}
        </div>
      </section>

      <section className="left-panel__section">
        <div className="left-panel__section-title">TOOLS</div>
        <div className="left-panel__list">
          {profile.tools.map((t) => (
            <div key={t}>{t}</div>
          ))}
        </div>
      </section>

      <section className="left-panel__section">
        <div className="left-panel__section-title">WEAPONS</div>
        <div className="left-panel__list">
          {profile.weaponry.map((w) => (
            <div key={w}>{w}</div>
          ))}
        </div>
      </section>

      <section className="left-panel__section">
        <div className="left-panel__section-title">COMMS</div>
        <ul className="left-panel__actions">
          {profile.comms.map((c) => (
            <li key={c.label}>
              <a href={c.value}>{c.label}</a>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
