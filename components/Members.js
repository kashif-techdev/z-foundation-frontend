"use client";

const MEMBERS = [
  {
    name: "Kashif Ahmed",
    role: "Founder & Coordinator",
    bio: "Leads community outreach, volunteer programs, and partnerships for long-term impact.",
    focus: "Community Leadership",
    initials: "KA",
  },
  {
    name: "Ayesha Noor",
    role: "Health Program Lead",
    bio: "Coordinates medical support camps and helps connect families with essential healthcare resources.",
    focus: "Healthcare Support",
    initials: "AN",
  },
  {
    name: "Hamza Ali",
    role: "Education Facilitator",
    bio: "Drives scholarship initiatives and learning support for underserved students.",
    focus: "Education Access",
    initials: "HA",
  },
  {
    name: "Sana Tariq",
    role: "Relief Operations Manager",
    bio: "Oversees food, clothing, and shelter distribution during emergency response efforts.",
    focus: "Relief Operations",
    initials: "ST",
  },
];

export default function Members() {
  return (
    <section className="members" id="teams" aria-labelledby="members-title">
      <div className="max-width">
        <h2 id="members-title" className="title">
          Our Members
        </h2>
        <p className="members-subtitle">
          A dedicated team working together to deliver care, dignity, and opportunity to communities in need.
        </p>

        <div className="members-grid">
          {MEMBERS.map((member) => (
            <article key={member.name} className="member-card">
              <div className="member-avatar" aria-hidden>
                {member.initials}
              </div>
              <div className="member-body">
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p className="member-bio">{member.bio}</p>
                <span className="member-focus">{member.focus}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
