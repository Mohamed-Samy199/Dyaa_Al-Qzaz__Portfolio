import { Link } from "react-router-dom";
import SocialMedia from "./SocialMedia/SocialMedia";
import logo from "../../assets/logo/logo2.png";



function Footer() {
  return (
    <footer className="grid md:grid-cols-10 grid-cols-1 px-5 py-3 gap-5 bg-mainColor text-lightColor">

      <div className="md:col-span-2 flex justify-center items-center lg:px-8">
        <Link to="/" className="block">
          <img
            className="object-contain w-[75%] md:w-full m-auto"
            src={logo}
            loading="lazy"
            alt="logo"
          />
        </Link>
      </div>

      <div className="md:col-span-5 flex flex-col items-center md:items-start justify-center">

        {/*<nav className="flex flex-wrap justify-center md:justify-start gap-1 font-semibold">
          {linksTop.map((l, i) => (
            <Link key={i} to={l.to} className="me-1 hover:opacity-80">
              {l.label} {i < linksTop.length - 1 && "|"}
            </Link>
          ))}
        </nav>

        <nav className="flex flex-wrap justify-center md:justify-start gap-1 mt-1 font-semibold">
          {linksBottom.map((l, i) => (
            <Link key={i} to={l.to} className="me-1 hover:opacity-80">
              {l.label} {i < linksBottom.length - 1 && "|"}
            </Link>
          ))}
        </nav>*/}
        <p className="text-sm mt-2 text-center md:text-left">
          🎋نَفْسُ الكَرِيـمِ عَلَـى الخَصَاصَـةِ وَالأَذَى🎋 هِي فِي الفَضَـاءِ مَـعَ النُّسُـورِ تُحَلِّـقُ🎋
        </p>
        <p className="text-sm mt-2 text-center md:text-left">
          © 2026 Dyaa El Qzaz, All rights reserved
        </p>
      </div>

      {/* Social */}
      <div className="md:col-span-3 flex justify-evenly items-center">
        <SocialMedia />
      </div>
    </footer>
  );
}

export default Footer;