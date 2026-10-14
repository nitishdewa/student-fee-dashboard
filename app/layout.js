import "./globals.css";

export const metadata = {
  title: "Student Fee Management Dashboard",
  description: "Track student fees, payments, and pending amounts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}