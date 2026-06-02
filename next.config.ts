import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-*"
      }
    ]
  },
  async redirects() {
    return [
      { source: "/login", destination: "/auth/login", permanent: false },
      { source: "/register", destination: "/auth/register", permanent: false },
      { source: "/admin/:path*", destination: "/dashboard/admin/:path*", permanent: false },
      { source: "/my-bookings/:path*", destination: "/dashboard/customer/bookings/:path*", permanent: false },
      { source: "/profile", destination: "/dashboard/customer/profile", permanent: false },
      { source: "/reviews", destination: "/dashboard/customer/reviews", permanent: false },
      { source: "/menu/:path*", destination: "/dashboard/customer/menu/:path*", permanent: false },
      { source: "/reservation", destination: "/dashboard/customer/reservation", permanent: false }
    ];
  }
};

export default nextConfig;
