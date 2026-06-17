export default function Logo({ className = "h-8 w-8" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="verveGrad" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0" stopColor="#7c5cff" />
          <stop offset="1" stopColor="#4f8bff" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#verveGrad)" />
      <path
        d="M8 10.5l8 11.5 8-11.5"
        stroke="#fff"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
