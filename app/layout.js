import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next"
// Configure Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // add desired weights
  display: "swap",
});

export const metadata = {
  title: "Interview Ace",
  description: "AI-powered mock interview generator",
  icons:{
    icon: "favico.svg",
    // apple: "/apple-touch-icon.png",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Analytics />
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
