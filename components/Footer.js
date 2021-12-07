import { FaCcMastercard, FaCcPaypal, FaCcVisa, FaEnvelopeOpenText, FaMapMarkedAlt } from "react-icons/fa";
import CurrencyConverter from "./CurrencyConverter";
import CustomLink  from "./CustomLink"

const Footer = () => {
    return (
      <div className="px-5 lg:px-20 py-10 bg-black text-white">
        <CustomLink
          className="transition hover:underline"
          className="text-4xl"
          text="NeonShop"
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-20 sm:gap-10 capitalize text-sm">
          <div className="grid gap-2 place-content-start">
            <h4 className="font-semibold uppercase mb-3">customer care</h4>
            <CustomLink
              className="transition hover:underline"
              text="Shipping & returns"
            />
            <CustomLink
              className="transition hover:underline uppercase"
              text="faq"
            />
            <CustomLink className="transition hover:underline" text="contact" />
            <CustomLink
              className="transition hover:underline"
              text="privacy policy"
            />
            <CustomLink
              className="transition hover:underline"
              text="terms & conditions"
            />
            <CustomLink
              className="transition hover:underline"
              text="terms of service"
            />
            <CustomLink
              className="transition hover:underline"
              text="refund policy"
            />
            <CustomLink className="transition hover:underline" text="sitemap" />
            <CustomLink
              className="transition hover:underline"
              text="e-privacy"
            />
          </div>
          <div className="grid gap-2 place-content-start">
            <h4 className="font-semibold uppercase mb-3">company</h4>
            <CustomLink
              className="transition hover:underline"
              text="custom neons"
            />
            <CustomLink
              className="transition hover:underline"
              text="about us"
            />
            <CustomLink className="transition hover:underline" text="blog" />
            <CustomLink className="transition hover:underline" text="careers" />
            <CustomLink
              className="transition hover:underline"
              text="partnershops/collabs"
            />
          </div>
          <div className="grid gap-2 place-content-start">
            <h4 className="font-semibold uppercase mb-3">contact</h4>
            <div>
              <div className="flex items-center gap-1">
                <FaEnvelopeOpenText />
                <span>email:</span>
              </div>
              <a
                href="mailto:contact@neonshop.com"
                className="transition hover:underline"
              >
                contact@neonshop.com
              </a>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <FaMapMarkedAlt />
                <span>Address:</span>
              </div>
              <CustomLink
                href="https://goo.gl/maps/m3UfXirNQnHZNMnv7"
                target="_blank"
              >
                <p className="transition hover:underline">
                  Los Angeles <br /> 3951 Hguera Street, Los Angeles, CA <br />{" "}
                  90232 <br /> United States
                </p>
              </CustomLink>
            </div>
          </div>
        </div>
        <div className="h-[1px] bg-gray-900 my-4"></div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} NeonShop</p>
          <div className="flex items-center gap-1">
            <p>Currency</p>
            <CurrencyConverter />
          </div> 
          <div className="flex gap-2 text-6xl">
                    <FaCcVisa />
                    <FaCcMastercard />
                    <FaCcPaypal/>
          </div>
        </div>
      </div>
    );
}

export default Footer