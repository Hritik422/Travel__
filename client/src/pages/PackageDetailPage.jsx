import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchItinerary, fetchDestinationById, clearItinerary } from "../store/slices/travelSlice";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, Phone, Clock, MapPin, Star, CheckCircle2, XCircle, Calendar, Plane, Hotel, Utensils, Camera, Car, Wifi } from "lucide-react";

const INC = ["Return Flights","Handpicked Hotel Stay","Daily Breakfast","All Airport Transfers","Expert Guided Tours","24/7 On-Trip Support"];
const EXC = ["Personal Expenses","Travel Insurance","Visa Fees","Optional Activities"];

function DayCard({ day, index }) {
  return (
    <motion.div initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay: index*0.06 }}
      className="flex gap-6 group"
    >
      <div className="flex flex-col items-center shrink-0 pt-1.5">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#C09854] to-[#8B6834] text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-md">
          {index + 1}
        </div>
        <div className="w-px flex-1 bg-gradient-to-b from-[#C09854]/40 to-transparent mt-3 group-last:hidden" />
      </div>

      <div className="pb-12 flex-1 min-w-0">
        {day.subtitle && (
          <p className="eyebrow text-[#C09854] mb-1">Day {index+1} · {day.subtitle}</p>
        )}
        <h4 className="font-display text-xl text-[#1A1208] mb-2">{day.title}</h4>
        {day.highlight && (
          <div className="inline-flex items-center gap-2 bg-[#F4EFE6] border border-[#EDE5D8] text-[#8B6834] text-xs font-semibold px-3 py-2 rounded-full mb-4">
            <Star className="w-3 h-3 fill-[#C09854] text-[#C09854]" />{day.highlight}
          </div>
        )}
        {day.image && (
          <div className="mb-4 rounded-2xl overflow-hidden h-52 w-full shadow-md">
            <img src={day.image} alt={day.title} loading="lazy" className="w-full h-full object-cover" />
          </div>
        )}
        {day.description && (
          <p className="text-[#7A6A56] text-sm leading-relaxed mb-5">{day.description}</p>
        )}
        {day.details?.length > 0 && (
          <div className="space-y-2.5">
            {day.details.map((d, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-3 bg-[#FDFAF5] border border-[#EDE5D8] rounded-xl hover:border-[#C09854]/40 transition-colors">
                <span className="text-xs font-bold text-[#C09854] tabular-nums w-10 shrink-0">{d.time}</span>
                <div className="w-px h-4 bg-[#EDE5D8] shrink-0" />
                <span className="text-sm text-[#3D2E18] font-medium">{d.activity}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ServicesRow({ services }) {
  if (!services) return null;
  const items = [
    { label:"Grade",    value: services.luxury },
    { label:"Duration", value: services.Duration },
    { label:"Meals",    value: services.includes },
    { label:"Features", value: services.experience },
  ].filter(i => i.value);
  if (!items.length) return null;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
      {items.map(({ label, value }) => (
        <div key={label} className="bg-white border border-[#EDE5D8] rounded-2xl p-5 text-center shadow-sm">
          <p className="eyebrow text-[#B5A898] mb-2">{label}</p>
          <p className="text-sm text-[#1A1208] font-semibold">{value}</p>
        </div>
      ))}
    </div>
  );
}

export default function PackageDetailPage() {
  const { id }     = useParams();
  const dispatch   = useDispatch();
  const navigate   = useNavigate();
  const { itinerary, itineraryLoading, currentDestination, currentDestinationLoading } = useSelector((s) => s.travel);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) { dispatch(fetchItinerary(id)); dispatch(fetchDestinationById(id)); }
    return () => dispatch(clearItinerary());
  }, [id, dispatch]);

  const loading   = itineraryLoading || currentDestinationLoading;
  const dest      = currentDestination || {};
  const itn       = itinerary || {};
  const days      = Array.isArray(itn.days) ? itn.days : [];
  const heroImg   = itn.backgroundUrl || dest.image || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&auto=format&fit=crop";
  const tagline   = itn.displayTagline || "Curated Journey";
  const heading   = itn.mainHeading || dest.title || dest.name || "Package Details";

  return (
    <div className="min-h-screen bg-[#FDFAF5]">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[70vh] min-h-[520px] overflow-hidden bg-[#1A1208]">
        {loading ? (
          <div className="w-full h-full bg-[#EDE5D8] animate-pulse" />
        ) : (
          <img src={heroImg} alt={heading} className="absolute inset-0 w-full h-full object-cover opacity-75" fetchpriority="high" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/25" />

        <button onClick={() => navigate(-1)}
          className="absolute top-28 left-8 z-10 flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="absolute bottom-0 left-0 right-0 z-10 max-w-[1320px] mx-auto px-8 lg:px-16 pb-14">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8 }}>
            <p className="eyebrow text-[#D4AF7A] mb-3">{tagline}</p>
            <h1 className="font-display text-[clamp(3.5rem,7vw,6rem)] text-white leading-tight">{heading}</h1>
            <div className="flex flex-wrap gap-5 mt-5 text-white/55 text-sm">
              {dest?.location && <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#C09854]" />{dest.location}</span>}
              {(itn.services?.Duration || dest?.duration) && <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#C09854]" />{itn.services?.Duration || dest?.duration}</span>}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[1320px] mx-auto px-8 lg:px-16 py-20 grid grid-cols-1 lg:grid-cols-3 gap-16">

        {/* LEFT */}
        <div className="lg:col-span-2">
          <ServicesRow services={itn.services} />

          {/* Description */}
          {(itn.descriptionHeading || itn.descriptionContent || dest.description) && (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.7 }} className="mb-16">
              {itn.descriptionHeading && (
                <h2 className="font-display text-2xl text-[#1A1208] mb-4 italic">{itn.descriptionHeading}</h2>
              )}
              <p className="text-[#3D2E18] text-base leading-[1.9] font-light">
                {itn.descriptionContent || dest.description}
              </p>
            </motion.div>
          )}

          {/* Itinerary */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-10">
              <p className="eyebrow">Day-by-Day Itinerary</p>
              <div className="flex-1 h-px bg-[#EDE5D8]" />
            </div>

            {loading && (
              <div className="space-y-10">
                {[1,2,3].map(i => (
                  <div key={i} className="flex gap-6 animate-pulse">
                    <div className="w-11 h-11 rounded-full bg-[#EDE5D8] shrink-0" />
                    <div className="flex-1 space-y-3 pt-1">
                      <div className="h-3 bg-[#EDE5D8] rounded w-1/4" />
                      <div className="h-5 bg-[#EDE5D8] rounded w-1/2" />
                      <div className="h-4 bg-[#EDE5D8] rounded w-full" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && days.length > 0 && days.map((d, i) => <DayCard key={i} day={d} index={i} />)}

            {!loading && days.length === 0 && (
              <div className="text-center py-20 border-2 border-dashed border-[#EDE5D8] rounded-3xl">
                <Calendar className="w-12 h-12 mx-auto text-[#EDE5D8] mb-4" />
                <p className="text-[#B5A898] font-medium">Itinerary is being personalised for you.</p>
                <p className="text-[#C09854] text-xs mt-1.5">Contact us for a custom plan.</p>
              </div>
            )}
          </div>

          {/* Inclusions */}
          <div className="grid sm:grid-cols-2 gap-6 p-8 bg-white rounded-3xl border border-[#EDE5D8] shadow-sm">
            <div>
              <p className="eyebrow mb-5">What's Included</p>
              <div className="space-y-3.5">
                {INC.map((t, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-[#3D2E18]">{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow text-[#B5A898] mb-5">Not Included</p>
              <div className="space-y-3.5">
                {EXC.map((t, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <XCircle className="w-4 h-4 text-[#C0B8B0] shrink-0" />
                    <span className="text-[#B5A898]">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Sticky booking card */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-5">

            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
              className="bg-[#1A1208] rounded-3xl p-8 shadow-xl"
            >
              {dest.price ? (
                <>
                  <p className="text-[#7A6A56] text-xs uppercase tracking-wider mb-2">Starting from</p>
                  <p className="font-display text-4xl font-semibold text-white mb-1">{dest.price}</p>
                  {dest.originalPrice && <p className="text-[#5A4E42] text-sm line-through">{dest.originalPrice}</p>}
                </>
              ) : (
                <p className="text-[#7A6A56] text-sm mb-4">Get a personalised quote for this journey.</p>
              )}
              <div className="space-y-3 mt-7">
                <a href="tel:+918090988780"
                  className="flex items-center justify-center gap-2.5 w-full py-4 bg-[#C09854] hover:bg-[#a8803e] text-white font-bold text-sm rounded-2xl transition-all hover:shadow-lg hover:shadow-[#C09854]/30"
                >
                  <Phone className="w-4 h-4" /> Call to Book
                </a>
                <a href="https://wa.me/918090988780" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full py-4 border border-white/12 hover:border-white/35 text-white text-sm font-semibold rounded-2xl transition-colors"
                >
                  WhatsApp Us
                </a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4 }}
              className="bg-white rounded-3xl p-7 border border-[#EDE5D8] shadow-sm"
            >
              <p className="eyebrow mb-5">Trip Highlights</p>
              <div className="grid grid-cols-2 gap-4">
                {[{Icon:Plane,l:"Flights"},{Icon:Hotel,l:"Hotels"},{Icon:Utensils,l:"Meals"},{Icon:Camera,l:"Tours"},{Icon:Car,l:"Transfers"},{Icon:Wifi,l:"24/7 Support"}].map(({Icon,l}) => (
                  <div key={l} className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#F4EFE6] flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5 text-[#C09854]" />
                    </div>
                    <span className="text-xs text-[#3D2E18] font-semibold">{l}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5 }}
              className="bg-[#F4EFE6] rounded-3xl p-6 text-center border border-[#EDE5D8]"
            >
              <div className="flex justify-center gap-0.5 mb-2.5">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="font-semibold text-[#1A1208] text-sm">4.9 / 5 Rating</p>
              <p className="text-[#B5A898] text-xs mt-1">Based on 2,400+ travellers</p>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
