export const SnapLogo = ({
  color,
  size,
}: {
  color?: string | undefined;
  size: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox={`0 0 32 32`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="16" fill="#121425" />
    <circle cx="16" cy="16" r="16" stroke="#ADFF00" />
    <path d="M9.82868 22.1631H8.1681V12.2077H2.29531V10.5471H15.7015V12.2077H9.82868V22.1631ZM29.375 22.1631H27.204L22.6597 17.4811L18.1316 22.1631H15.9526L21.5824 16.3551L15.9526 10.5471H18.1316L29.375 22.1631ZM29.375 10.5471L24.3122 15.7557L23.2348 14.6459L27.204 10.5471H29.375Z" fill="#ADFF00" />
  </svg>
);
