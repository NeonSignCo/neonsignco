import { motion } from "framer-motion";
import CustomLink from "../CustomLink"
import MobileDropDown from "./MobileDropDown"

const MobileMenu = ({closeMenu}) => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-gray-800 lg:hidden text-lg absolute w-full uppercase"
      >
        <div className="py-5 px-5 flex flex-col gap-3 overflow-auto h-[calc(100vh-60px)]">
          <CustomLink text="design your neon" onClick={closeMenu}/>
          <MobileDropDown
            closeMenu={closeMenu}
            title="shop neons"
            items={[
              {
                title: "explore",
                links: [
                  { text: "build your own" },
                  { text: "inspiration" },
                  { text: "shop all" },
                ],
              },
              {
                title: "decoration",
                links: [
                  { text: "aesthetic" },
                  { text: "inspirational" },
                  { text: "neon art" },
                  { text: "neon letters" },
                  { text: "neon lights" },
                  { text: "quotes" },
                  { text: "marvel comics" },
                  { text: "retro" },
                ],
              },
              {
                title: "occasion",
                links: [
                  { text: "christmas" },
                  { text: "halloween" },
                  { text: "faith" },
                  { text: "party" },
                  { text: "wedding" },
                ],
              },
              {
                title: "location",
                links: [
                  { text: "bar signs" },
                  { text: "gaming" },
                  { text: "home" },
                  { text: "kids home" },
                  { text: "man cave" },
                ],
              },
            ]}
          />
          <CustomLink href="/about" text="about" onClick={closeMenu}/>
          <CustomLink href="/contact" text="contact" onClick={closeMenu}/>
        </div>
      </motion.div>
    );
}

export default MobileMenu
