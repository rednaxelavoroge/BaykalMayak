import { motion } from "motion/react";
import { Anchor, Menu, X, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { auth, signIn, logOut } from "../firebase";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <Anchor className="text-white w-8 h-8" />
          <span className="text-white font-serif text-2xl tracking-widest uppercase">Baikal Mayak</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest text-white/70">
          <a href="#experience" className="hover:text-white transition-colors">Experience</a>
          <a href="#concierge" className="hover:text-white transition-colors">Concierge</a>
          <a href="#gallery" className="hover:text-white transition-colors">Gallery</a>
          <a href="#booking" className="hover:text-white transition-colors text-white/40">Booking</a>
          
          {user ? (
            <div className="flex items-center gap-4 pl-4 border-l border-white/10">
              <img 
                src={user.photoURL || ""} 
                alt={user.displayName || ""} 
                className="w-8 h-8 rounded-full border border-white/20"
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={logOut}
                className="hover:text-white transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={signIn}
              className="flex items-center gap-2 hover:text-white transition-colors pl-4 border-l border-white/10"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </button>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-black/90 p-6 flex flex-col gap-4 text-center text-white/70 uppercase tracking-widest"
        >
          <a href="#experience" onClick={() => setIsOpen(false)}>Experience</a>
          <a href="#concierge" onClick={() => setIsOpen(false)}>Concierge</a>
          <a href="#gallery" onClick={() => setIsOpen(false)}>Gallery</a>
          <a href="#booking" onClick={() => setIsOpen(false)}>Booking</a>
          {user ? (
            <button onClick={() => { logOut(); setIsOpen(false); }} className="text-white">Logout</button>
          ) : (
            <button onClick={() => { signIn(); setIsOpen(false); }} className="text-white">Login</button>
          )}
        </motion.div>
      )}
    </nav>
  );
}
