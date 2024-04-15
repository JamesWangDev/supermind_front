"use client";
import { useContext } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import WrapperComponent from "../Common/WrapperComponent";
import AboutUsImage from "./AboutUsImage";
import AboutUsText from "./AboutUsText";
import ClientSection from "./ClientSection";
import CreativeTeam from "./CreativeTeam";
import OurBlog from "./OurBlog";
import ReviewSection from "./ReviewSection";
import ThemeOptionContext from "@/Helper/ThemeOptionsContext";

const AboutUsContent = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  return (
    <>
      <Breadcrumb title={"AboutUs"} subNavigation={[{ name: "AboutUs" }]} />
      {themeOption?.about_us?.about?.futures?.length &&
        (themeOption?.about_us?.about?.content_left_image_url ||
          themeOption?.about_us?.about?.content_right_image_url) && (
          <WrapperComponent
            classes={{
              sectionClass: "fresh-vegetable-section section-lg-space",
              row: "gx-xl-5 gy-xl-0 g-3 ratio_148_1",
            }}
            customCol
          >
            <AboutUsImage />
            <AboutUsText />
          </WrapperComponent>
        )}
      {themeOption?.about_us?.clients?.status &&
        themeOption?.about_us?.clients?.content?.length &&
        (themeOption?.about_us?.clients?.sub_title ||
          themeOption?.about_us?.clients?.title) && <ClientSection />}
      {themeOption?.about_us?.team?.status &&
        themeOption?.about_us?.team?.members?.length &&
        (themeOption?.about_us?.team?.sub_title ||
          themeOption?.about_us?.team?.title) && <CreativeTeam />}
      {themeOption?.about_us?.testimonial?.status &&
        themeOption?.about_us?.testimonial?.reviews?.length &&
        (themeOption?.about_us?.testimonial?.sub_title ||
          themeOption?.about_us?.testimonial?.title) && <ReviewSection />}
      {themeOption?.about_us?.blog?.status && <OurBlog />}
    </>
  );
};

export default AboutUsContent;
