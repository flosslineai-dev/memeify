const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  className: "h-5 w-5",
};

export function SocialIcon() {
  return (
    <svg {...base}>
      <path d="M4 6.5A3.5 3.5 0 0 1 7.5 3h9A3.5 3.5 0 0 1 20 6.5v6a3.5 3.5 0 0 1-3.5 3.5H11l-4.5 4v-4A3.5 3.5 0 0 1 4 12.5z" />
      <circle cx="12" cy="9.5" r="2" />
      <path d="M14 9.5v.8a1.4 1.4 0 0 0 2.8 0v-.8a4.8 4.8 0 1 0-1.9 3.8" />
    </svg>
  );
}

export function SparkIcon() {
  return (
    <svg {...base}>
      <rect x="3" y="5" width="13" height="13" rx="3" />
      <path d="m3 15 3.5-3.5a1.5 1.5 0 0 1 2.1 0L13 16" />
      <path d="M18.5 2.5c.3 1.8 1.2 2.7 3 3-1.8.3-2.7 1.2-3 3-.3-1.8-1.2-2.7-3-3 1.8-.3 2.7-1.2 3-3z" fill="currentColor" stroke="none" />
      <circle cx="12" cy="9" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SimpleIcon() {
  return (
    <svg {...base}>
      <path d="M9 4.5V3M4.5 9H3M5.8 5.8 4.7 4.7M13.2 5.8l1.1-1.1" />
      <path d="M9 9l11 4.2-4.6 1.6 3.4 3.4-1.8 1.8-3.4-3.4L12 21z" />
    </svg>
  );
}

export function CommunityIcon() {
  return (
    <svg {...base}>
      <circle cx="12" cy="7.5" r="3" />
      <circle cx="5.5" cy="10" r="2.2" />
      <circle cx="18.5" cy="10" r="2.2" />
      <path d="M6.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M2 18.5a3.5 3.5 0 0 1 4.5-3.3M22 18.5a3.5 3.5 0 0 0-4.5-3.3" />
    </svg>
  );
}
