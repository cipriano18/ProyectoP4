import Link from "next/link";
import NavLinksG from "@/app/ui/GraduateDashboard/nav-linksG";
import HomeLogo from "@/app/ui/home-logo";

export default function SideNavGraduates() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        href="/"
        className="mb-2 flex h-20 items-end justify-start rounded-xl p-4 md:h-40
             bg-gradient-to-r from-purple-600/30 via-indigo-500/30 to-purple-600/30
             backdrop-blur-md border border-white/20 shadow-xl
             text-white transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
      >
        <div className="w-32 md:w-40">
          <HomeLogo />
        </div>
      </Link>


      <div className="flex grow flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinksG />
      </div>
    </div>
  );
}
