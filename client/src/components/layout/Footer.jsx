import { Link } from "react-router-dom";
import { Phone, Mail, Instagram, Facebook, Twitter, Youtube, ArrowUpRight } from "lucide-react";

const DESTS = ["Bali","Maldives","Switzerland","Japan","Thailand","Dubai","Vietnam","Greece","Singapore","Norway","Australia","Mauritius"];
const PKGS  = ["Honeymoon Packages","Family Vacations","Luxury Escapes","Budget Trips","Adventure Tours","Cultural Tours","Beach Holidays","Solo Travel"];

export default function Footer() {
  return (
    <footer className="bg-[#0D0B07] text-[#7A6A56]">
      <div className="max-w-[1320px] mx-auto px-8 lg:px-16">

        {/* Top brand section */}
        <div className="grid lg:grid-cols-2 gap-16 py-20 border-b border-[#1C1610]">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-44 h-44 flex items-center justify-center shrink-0">
                <span className="text-white font-display font-bold text-sm"><img src="/logo1.png"/></span>
              </div>
             
            </div>
            <p className="text-sm leading-[1.9] text-[#5A4E42] max-w-sm">
              Travel is not just about destinations — it's about how you experience them. We curate bespoke international journeys designed around your pace, preferences and passions.
            </p>
            <div className="flex gap-3 mt-8">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-10 h-10 border border-[#2A221A] rounded-full flex items-center justify-center hover:border-[#C09854] hover:text-[#C09854] transition-all duration-200"
                ><Icon className="w-4 h-4" /></a>
              ))}
            </div>
          </div>

          <div className="lg:text-right flex flex-col lg:items-end">
            <p className="eyebrow text-[#5A4E42] mb-4">Talk to a Travel Expert</p>
            <a href="tel:+918090988780"
              className="font-display text-2xl text-white hover:text-[#C09854] transition-colors mb-2 inline-block"
            >+91 80909 88780</a>
            <a href="mailto:hritik@onetravelexpert.com"
              className="text-sm hover:text-[#C09854] transition-colors inline-flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" /> hritik@onetravelexpert.com
            </a>
            <Link to="/contact" className="btn-gold mt-8 self-start lg:self-end">
              Get a Free Quote <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Destinations */}
        <div className="py-14 border-b border-[#1C1610]">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#3D2E18] mb-6">International Destinations</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-2.5">
            {DESTS.map(d => (
              <Link key={d} to={`/destinations?q=${d}`}
                className="text-sm text-[#5A4E42] hover:text-[#C09854] transition-colors"
              >{d} Packages</Link>
            ))}
          </div>
        </div>

        {/* Packages */}
        <div className="py-14 border-b border-[#1C1610]">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#3D2E18] mb-6">Holiday Packages</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2.5">
            {PKGS.map(p => (
              <Link key={p} to="/destinations"
                className="text-sm text-[#5A4E42] hover:text-[#C09854] transition-colors"
              >{p}</Link>
            ))}
          </div>
        </div>

        {/* Bottom links */}
        <div className="py-14 grid grid-cols-2 md:grid-cols-4 gap-10 border-b border-[#1C1610]">
          {[
            { title: "Company",  links: [["About Us","/about"],["Careers","#"],["Blog","#"],["Press","#"]] },
            { title: "Policy",   links: [["Terms & Conditions","#"],["Privacy Policy","#"],["Cancellation","#"],["FAQs","#"]] },
            { title: "Contact",  links: null },
            { title: "Plan",     links: null },
          ].map((sec) => (
            <div key={sec.title}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3D2E18] mb-5">{sec.title}</p>
              {sec.links && (
                <ul className="space-y-2.5">
                  {sec.links.map(([l, to]) => (
                    <li key={l}>
                      <Link to={to} className="text-sm text-[#5A4E42] hover:text-[#C09854] transition-colors">{l}</Link>
                    </li>
                  ))}
                </ul>
              )}
              {sec.title === "Contact" && (
                <ul className="space-y-3 text-sm text-[#5A4E42]">
                  <li className="flex items-center gap-2.5"><Mail className="w-3.5 h-3.5 text-[#C09854] shrink-0" /> hritik@onetravelexpert.com</li>
                  <li className="flex items-center gap-2.5"><Phone className="w-3.5 h-3.5 text-[#C09854] shrink-0" /> +91 80909 88780</li>
                  <li className="flex items-center gap-2.5"><Phone className="w-3.5 h-3.5 text-[#C09854] shrink-0" /> +91 89796 95949</li>
                </ul>
              )}
              {sec.title === "Plan" && (
                <div>
                  <p className="text-sm text-[#5A4E42] mb-4 leading-relaxed">Ready to explore the world?</p>
                  <Link to="/contact" className="btn-gold text-xs px-5 py-3">
                    Plan My Trip <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="py-7 flex flex-col sm:flex-row justify-between gap-2 text-xs text-[#3D2E18]">
          <span>© {new Date().getFullYear()} One Travel Expert Pvt Ltd. All rights reserved.</span>
          <span>OneTravelExpert Global Private Limited</span>
        </div>
      </div>
    </footer>
  );
}
