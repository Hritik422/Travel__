import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Destinations", to: "/destinations", children: [
    { label: "Bali, Indonesia",  to: "/destinations?q=Bali" },
    { label: "Maldives",         to: "/destinations?q=Maldives" },
    { label: "Switzerland",      to: "/destinations?q=Switzerland" },
    { label: "Japan",            to: "/destinations?q=Japan" },
    { label: "Greece",           to: "/destinations?q=Greece" },
    { label: "Norway",           to: "/destinations?q=Norway" },
    { label: "View all →",       to: "/destinations" },
  ]},
  { label: "Packages", to: "/destinations", children: [
    { label: "Honeymoon",        to: "/destinations?q=Honeymoon" },
    { label: "Family Vacations", to: "/destinations?q=Family" },
    { label: "Luxury Escapes",   to: "/destinations?q=Luxury" },
    { label: "Budget Trips",     to: "/destinations?q=Budget" },
    { label: "Adventure",        to: "/destinations?q=Adventure" },
  ]},
  { label: "About",   to: "/about" },
  { label: "Contact", to: "/contact" },
];

function Dropdown({ items }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0,  scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-52 bg-white rounded-2xl shadow-[0_16px_48px_rgba(26,18,8,0.16)] border border-[#EDE5D8] overflow-hidden z-50 py-2"
    >
      {items.map((item) => (
        <Link key={item.label} to={item.to}
          className="block px-5 py-2.5 text-sm font-medium text-[#3D2E18] hover:bg-[#FDFAF5] hover:text-[#C09854] transition-colors"
        >{item.label}</Link>
      ))}
    </motion.div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [activeMenu, setActiveMenu]   = useState(null);
  const [mobileExp, setMobileExp]     = useState(null);
  const navigate  = useNavigate();
  const location  = useLocation();
  const isHome    = location.pathname === "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMobileOpen(false); setActiveMenu(null); }, [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const solid = scrolled || !isHome;

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${solid ? "bg-white/97 backdrop-blur-xl shadow-[0_1px_0_#E8E0D0]" : "bg-transparent"}`}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-16 h-20 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="shrink-0 flex items-center gap-2.5">
            <div className="w-32 h-32 flex items-center justify-center shrink-0">
              <span className=""><img src="/logo1.png"/></span>
            </div>
         
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label} className="relative"
                  onMouseEnter={() => setActiveMenu(link.label)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <button className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${solid ? "text-[#3D2E18] hover:bg-[#FDFAF5]" : "text-white/90 hover:text-white hover:bg-white/10"}`}>
                    {link.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === link.label ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {activeMenu === link.label && <Dropdown items={link.children} />}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={link.label} to={link.to}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${solid ? "text-[#3D2E18] hover:bg-[#FDFAF5] hover:text-[#C09854]" : "text-white/90 hover:text-white hover:bg-white/10"}`}
                >{link.label}</Link>
              )
            )}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+918090988780"
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${solid ? "text-[#7A6A56] hover:text-[#1A1208]" : "text-white/70 hover:text-white"}`}
            >
              <Phone className="w-3.5 h-3.5" />
              +91 80909 88780
            </a>
            <button onClick={() => navigate("/contact")}
              className="px-5 py-2.5 bg-[#C09854] hover:bg-[#a8803e] text-white text-sm font-bold rounded-full transition-all hover:shadow-lg hover:shadow-[#C09854]/30 hover:-translate-y-0.5"
            >
              Plan My Trip
            </button>
          </div>

          {/* Hamburger */}
          <button onClick={() => setMobileOpen(true)}
            className={`lg:hidden p-2 rounded-xl transition-colors ${solid ? "text-[#1A1208] hover:bg-[#F4EFE6]" : "text-white hover:bg-white/10"}`}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div key="bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div key="drawer"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.32, ease: [0.32,0.72,0,1] }}
              className="fixed top-0 right-0 h-full w-[88vw] max-w-[360px] bg-white z-[70] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-7 py-6 border-b border-[#EDE5D8]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#C09854] flex items-center justify-center">
                    <span className="text-white font-display font-bold text-sm">OT</span>
                  </div>
                  <span className="font-display font-semibold text-[#1A1208]">One Travel Expert</span>
                </div>
                <button onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F4EFE6] hover:bg-[#EDE5D8] transition-colors"
                >
                  <X className="w-4.5 h-4.5 text-[#3D2E18]" />
                </button>
              </div>

              {/* Nav items */}
              <nav className="flex-1 overflow-y-auto px-5 py-5 space-y-1">
                {NAV_LINKS.map((link) =>
                  link.children ? (
                    <div key={link.label}>
                      <button onClick={() => setMobileExp(mobileExp === link.label ? null : link.label)}
                        className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-[#1A1208] font-semibold hover:bg-[#FDFAF5] transition-colors"
                      >
                        {link.label}
                        <ChevronDown className={`w-4 h-4 text-[#C09854] transition-transform ${mobileExp === link.label ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {mobileExp === link.label && (
                          <motion.div initial={{ height:0,opacity:0 }} animate={{ height:"auto",opacity:1 }} exit={{ height:0,opacity:0 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 pb-2 space-y-0.5">
                              {link.children.map((c) => (
                                <Link key={c.label} to={c.to} onClick={() => setMobileOpen(false)}
                                  className="block px-4 py-2.5 text-sm text-[#7A6A56] hover:text-[#C09854] font-medium rounded-lg hover:bg-[#FDFAF5] transition-colors"
                                >{c.label}</Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link key={link.label} to={link.to}
                      className="block px-4 py-3.5 rounded-xl text-[#1A1208] font-semibold hover:bg-[#FDFAF5] hover:text-[#C09854] transition-colors"
                    >{link.label}</Link>
                  )
                )}
              </nav>

              {/* Footer */}
              <div className="px-7 pb-10 pt-5 space-y-3 border-t border-[#EDE5D8]">
                <a href="tel:+918090988780" className="flex items-center gap-3 text-sm text-[#7A6A56] font-medium hover:text-[#1A1208]">
                  <Phone className="w-4 h-4 text-[#C09854]" />+91 80909 88780
                </a>
                <button onClick={() => { navigate("/contact"); setMobileOpen(false); }}
                  className="w-full py-4 bg-[#C09854] hover:bg-[#a8803e] text-white font-bold rounded-2xl text-sm transition-colors"
                >Plan My Trip</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
