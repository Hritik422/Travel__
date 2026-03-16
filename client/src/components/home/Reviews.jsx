import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchReviews } from "../../store/slices/travelSlice";
import { Star, Quote } from "lucide-react";

const FALLBACK = [
  { name:"Priya Sharma",          location:"Mumbai",    rating:5, quote:"One Travel Expert planned our Maldives honeymoon flawlessly. Every detail — from the seaplane to the private beach dinner — was handled with such care. Truly unforgettable!" },
  { name:"Rahul & Meera Kapoor",  location:"Delhi",     rating:5, quote:"Switzerland exceeded every expectation. No stress, no surprises — just pure joy for the whole family. The kids still talk about it." },
  { name:"Arjun Mehta",           location:"Bengaluru", rating:5, quote:"The Japan itinerary was perfect — cherry blossoms in Kyoto, street food in Tokyo, bullet trains. Hritik was always just a call away." },
  { name:"Sophia L.",             location:"Paris",     rating:5, quote:"Flawless execution from start to finish. The concierge team anticipated needs we didn't even know we had. Simply sublime." },
  { name:"Vikram Nair",           location:"Chennai",   rating:5, quote:"Norway for the Northern Lights was a dream. Perfect timing, cozy cabins, expert guides — one of the best experiences of my life!" },
  { name:"Neha & Rohan Gupta",    location:"Pune",      rating:5, quote:"Our Greece honeymoon was everything we dreamed. Santorini at sunset from our private terrace — we still can't believe how perfectly it was organised." },
];

function ReviewCard({ review, i }) {
  const initials = review.name?.split(" ").map(w => w[0]).slice(0,2).join("").toUpperCase();
  const text = review.quote || review.text || "";
  return (
    <motion.div
      initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:"-40px" }} transition={{ duration:0.55, delay: i * 0.07 }}
      className="flex flex-col bg-white rounded-3xl p-8 border border-[#EDE5D8] hover:shadow-[0_16px_48px_rgba(26,18,8,0.1)] hover:border-[#C09854]/30 transition-all duration-400 group"
    >
      <Quote className="w-8 h-8 text-[#EDE5D8] group-hover:text-[#C09854]/30 transition-colors mb-5 shrink-0" />
      <p className="text-[#3D2E18] text-[15px] leading-[1.85] flex-1 mb-6 italic">"{text}"</p>
      <div className="flex gap-0.5 mb-5">
        {Array.from({ length: review.rating || 5 }).map((_, k) => (
          <Star key={k} className="w-4 h-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <div className="flex items-center gap-4 pt-5 border-t border-[#F4EFE6]">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#C09854] to-[#8B6834] flex items-center justify-center text-white text-sm font-bold shrink-0">
          {review.photo ? (
            <img src={review.photo} alt={review.name} className="w-full h-full rounded-full object-cover" />
          ) : initials}
        </div>
        <div>
          <p className="font-semibold text-[#1A1208] text-sm">{review.name}</p>
          <p className="text-[#B5A898] text-xs mt-0.5">{review.location}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Reviews() {
  const dispatch = useDispatch();
  const { reviews } = useSelector((s) => s.travel);
  useEffect(() => { dispatch(fetchReviews()); }, [dispatch]);
  const list = reviews.length ? reviews : FALLBACK;

  return (
    <section className="section-padding bg-[#FDFAF5]">
      <div className="container-wide">
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
          className="text-center mb-16"
        >
          <p className="eyebrow mb-4">Testimonials</p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-[#1A1208]">
            Voices of Our <em>Travellers</em>
          </h2>
          <div className="gold-divider mx-auto mt-5" />
          <p className="text-[#7A6A56] mt-5 text-base max-w-md mx-auto leading-relaxed">
            Real stories from people we've had the honour of guiding across the world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.slice(0,6).map((r, i) => <ReviewCard key={r._id || i} review={r} i={i} />)}
        </div>
      </div>
    </section>
  );
}
