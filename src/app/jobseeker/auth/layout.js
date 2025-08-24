"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";


export default function AuthLayout({ children }) {
  const pathname = usePathname();

  return (
    <div
      className="min-h-screen flex"
      style={{
        backgroundImage: `
          radial-gradient(circle at top left, #3B82F6 0%, transparent 40%),
          radial-gradient(circle at bottom right, #3B82F6 0%, transparent 40%)
        `,
      }}
    >
      {/* Left Side - Auth forms */}
      <div className="w-2/3 flex items-center justify-center p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full max-w-md"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      
      {/* <div className="w-full hidden md:flex items-center justify-center rounded-l-2xl ">
        <video
          autoPlay
          loop
          muted
          className="w-3/4 h-3/4 object-cover"
        >
          <source src="/animations/jobseeker animation.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
} */}

    <div className="w-full hidden md:flex items-center justify-center rounded-l-2xl">
         <Image
           src="/images/jobseekerauth.png"
           alt="Job seeker illustration"
           width={600}
           height={600}
           className="w-2/3 h-2/3 object-cover"
         />
       </div>
     </div>
   );
 }