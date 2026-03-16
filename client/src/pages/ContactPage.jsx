import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postQuery } from "../store/slices/travelSlice";
import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Phone, Mail, Instagram, Facebook, Twitter, ArrowRight, CheckCircle2 } from "lucide-react";

const AUTOFILL_CSS = `
  input:-webkit-autofill, input:-webkit-autofill:hover,
  input:-webkit-autofill:focus, textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover, textarea:-webkit-autofill:focus {
    -webkit-text-fill-color: #EDE5D8;
    -webkit-box-shadow: 0 0 0px 1000px #0D0B07 inset;
    transition: background-color 5000s ease-in-out 0s;
  }
`;

const INITIAL = { name:"", email:"", contact:"", location:"", message:"" };

function FloatField({ id, label, type="text", value, onChange, isTextarea }) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || !!value;
  const Tag = isTextarea ? "textarea" : "input";
  return (
    <div className="relative pt-6 border-b border-white/10 focus-within:border-[#C09854] transition-colors duration-500 pb-2">
      <label htmlFor={id}
        className={`absolute left-0 transition-all duration-300 pointer-events-none ${lifted ? "top-0 text-[10px] text-[#C09854] uppercase tracking-[0.2em] font-bold" : "top-6 text-base text-white/30 font-display italic"}`}
      >{label}</label>
      <Tag id={id} type={type} value={value} onChange={onChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        rows={isTextarea ? 3 : undefined}
        className="w-full bg-transparent text-white text-base outline-none resize-none pt-0.5"
      />
    </div>
  );
}

export default function ContactPage() {
  const dispatch = useDispatch();
  const { querySubmitting } = useSelector((s) => s.travel);
  const [form, setForm]       = useState(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email) return;
    const result = await dispatch(postQuery(form));
    if (!result.error) { setForm(INITIAL); setSubmitted(true); }
  };

  return (
    <div className="min-h-screen bg-[#FDFAF5]">
      <style>{AUTOFILL_CSS}</style>
      <Navbar />

      <section className="flex flex-col md:flex-row min-h-screen pt-20">

        {/* Left visual */}
        <div className="relative w-full md:w-5/12 min-h-[45vh] md:min-h-screen overflow-hidden">
          <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
            alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B07] via-[#0D0B07]/50 to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0D0B07]" />

          <div className="relative z-10 h-full flex flex-col justify-end md:justify-between p-10 md:p-14 text-white">
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9 }}>
              <p className="eyebrow text-[#C09854] mb-4">Private Concierge</p>
              <h1 className="font-display text-[clamp(3rem,6vw,5rem)] leading-tight">
                Begin Your<br /><em className="text-[#D4AF7A]">Journey</em>
              </h1>
            </motion.div>

            <div className="space-y-6 hidden md:block">
              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/35 font-bold mb-4">At Your Service</p>
                <a href="tel:+918090988780" className="flex items-center gap-4 group">
                  <div className="w-11 h-11 border border-white/10 rounded-full flex items-center justify-center group-hover:border-[#C09854] transition-colors">
                    <Phone className="w-4 h-4 text-white/50 group-hover:text-[#C09854] transition-colors" />
                  </div>
                  <span className="font-display text-lg group-hover:text-[#D4AF7A] transition-colors">+91 80909 88780</span>
                </a>
                <a href="mailto:hritik@onetravelexpert.com" className="flex items-center gap-4 group">
                  <div className="w-11 h-11 border border-white/10 rounded-full flex items-center justify-center group-hover:border-[#C09854] transition-colors">
                    <Mail className="w-4 h-4 text-white/50 group-hover:text-[#C09854] transition-colors" />
                  </div>
                  <span className="font-display text-lg group-hover:text-[#D4AF7A] transition-colors">hritik@onetravelexpert.com</span>
                </a>
              </div>
              <div className="flex gap-4 pt-2">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 border border-white/10 rounded-full flex items-center justify-center hover:border-[#C09854] hover:text-[#C09854] transition-all text-white/35">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right form */}
        <div className="w-full md:w-7/12 bg-[#0D0B07] flex flex-col justify-center px-8 py-16 md:px-16 lg:px-24">
          <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.8, delay:0.2 }}
            className="max-w-lg mx-auto w-full"
          >
            {submitted ? (
              <div className="text-center py-10">
                <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:"spring", stiffness:200 }}>
                  <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
                </motion.div>
                <h2 className="font-display text-3xl text-white mb-3">Thank You!</h2>
                <p className="text-[#5A4E42] text-sm leading-relaxed mb-10 max-w-sm mx-auto">
                  Your request has been received. Our expert will reach out within 24 hours.
                </p>
                <button onClick={() => setSubmitted(false)}
                  className="btn-outline border-white/20 text-white"
                >Submit Another Request</button>
              </div>
            ) : (
              <>
                <p className="eyebrow text-[#C09854] mb-3">Get In Touch</p>
                <h2 className="font-display text-3xl text-white mb-3">Plan Your Journey</h2>
                <p className="text-[#5A4E42] text-sm leading-relaxed mb-12">
                  Our travel designers are at your disposal. Allow 24 hours for a personalised response.
                </p>

                <div className="space-y-10">
                  <FloatField id="name"     label="Your Full Name"          value={form.name}     onChange={set("name")} />
                  <FloatField id="email"    label="Email Address"           value={form.email}    onChange={set("email")} type="email" />
                  <FloatField id="contact"  label="Phone Number"            value={form.contact}  onChange={set("contact")} type="tel" />
                  <FloatField id="location" label="Desired Destination"     value={form.location} onChange={set("location")} />
                  <FloatField id="message"  label="Tell us about your dream…" value={form.message} onChange={set("message")} isTextarea />

                  <button onClick={handleSubmit} disabled={querySubmitting || !form.name || !form.email}
                    className="group relative w-full py-5 border border-white/12 hover:border-white/40 rounded-2xl overflow-hidden transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                  >
                    <div className="absolute inset-0 w-0 bg-[#C09854] group-hover:w-full transition-all duration-400 ease-out" />
                    <div className="relative z-10 flex items-center justify-center gap-3">
                      <span className="text-xs font-bold uppercase tracking-[0.3em] text-white">
                        {querySubmitting ? "Submitting…" : "Submit Request"}
                      </span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
