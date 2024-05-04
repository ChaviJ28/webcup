import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import { GlobalPreloader } from "../components/global/GlobalPreloader";

export default function Home() {
  const beenBefore = sessionStorage.getItem("beenBefore") !== null;
  const [mapAnim, setMapAnim] = useState(beenBefore);

  return (
    <>
      {!beenBefore && <GlobalPreloader onAnimComplete={setMapAnim} />}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
        </motion.div>
      </AnimatePresence>
    </>
  );
}
