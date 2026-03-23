import { Anchor, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        {/* Brand */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <Anchor className="w-8 h-8" />
            <span className="text-2xl font-serif uppercase tracking-widest">Baikal Mayak</span>
          </div>
          <p className="text-white/40 text-sm leading-relaxed max-w-xs">
            Experience the deepest lake on Earth from the comfort of our premium lighthouse resort. Where luxury meets the wild.
          </p>
          <div className="flex items-center gap-6 text-white/40">
            <Instagram className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
            <Facebook className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
            <Twitter className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-8">
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">Navigation</h4>
          <ul className="space-y-4 text-sm uppercase tracking-widest text-white/60">
            <li><a href="#experience" className="hover:text-white transition-colors">Experience</a></li>
            <li><a href="#concierge" className="hover:text-white transition-colors">Concierge</a></li>
            <li><a href="#gallery" className="hover:text-white transition-colors">Gallery</a></li>
            <li><a href="#booking" className="hover:text-white transition-colors">Booking</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-8">
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">Contact</h4>
          <ul className="space-y-4 text-sm text-white/60">
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-white/40" />
              <span>+7 (3952) 123-456</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-white/40" />
              <span>welcome@baikalmayak.com</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-white/40" />
              <span>Listvyanka, Irkutsk Region, Russia</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-8">
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">Newsletter</h4>
          <p className="text-white/40 text-sm">Join our inner circle for exclusive offers and Baikal news.</p>
          <div className="flex items-center border-b border-white/20 pb-2">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="bg-transparent border-none text-sm w-full focus:outline-none placeholder:text-white/20"
            />
            <button className="text-[10px] uppercase tracking-widest font-bold hover:text-white/60 transition-colors">Join</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.2em] text-white/20 font-bold">
        <span>© 2026 Baikal Mayak Resort. All Rights Reserved.</span>
        <div className="flex items-center gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
