import * as React from "react";

// This component handles showing the correct logo based on the theme.
// It relies on the parent having the 'dark' class for dark mode.
export const PinskyLogoForReact = () => {
  // Since dark mode is forced site-wide, directly use the white logo.
  return (
    <img
      src="/pinsky_logo_white.svg"
      alt="Pinsky Studio Logo"
      className="h-7 w-auto block" // Always block, as it's always dark mode
    />
  );
};
