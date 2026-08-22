import dynamic from "next/dynamic";

const AdminClient = dynamic(() => import("./AdminClient"), { ssr: false });

export const metadata = {
  title: "Admin Dashboard | AdsVerse",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminClient />;
}
