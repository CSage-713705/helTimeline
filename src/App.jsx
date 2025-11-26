// src/App.jsx
import React, { Suspense, lazy } from "react";
// import Starfield from "./components/Starfield";
import Starfield from "./components/EmergentBackground";
// import Timeline from "./components/Timeline"; // REMOVE this import
import LanguageSwitcher from "./components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

// LAZY import for Timeline
const Timeline = lazy(() => import("./components/Timeline"));

export default function App() {
  const { t, i18n } = useTranslation();

  return (
    <>
      <div className="relative">
        {/* Position language switcher at top right */}
        <div className="absolute top-4 right-4 z-50">
          <LanguageSwitcher />
        </div>

        {/* Starfield canvas behind everything */}
        <Starfield />

        <div className="relative z-10 mx-auto">
          {/* Hero Section */}
          <section
            id="hero"
            className="pt-16 pb-8 text-center mx-auto max-w-[800px]"
          >
            <div className="flex flex-col items-center">
              <h1 className="font-serif text-4xl md:text-5xl font-normal text-white leading-tight mb-6">
                {i18n.language === 'zh' ? '英国文学史时间轴' : 'A Timeline of English Literature'}
              </h1>
              <h2 className="font-serif text-2xl md:text-3xl font-normal text-white leading-tight mb-6">
                {i18n.language === 'zh' ? '小说叙事权威与人性探索' : 'Narrative Authority and Humanity Exploration of Novels'}
              </h2>
              <p className="text-gray-100 font-sans max-w-5xl px-2 text-lg leading-relaxed mb-6 justify">
                {i18n.language === 'zh' ? '本时间轴展示了由启蒙时代到当代5个关键文学时期的代表作品。' : 'This timeline showcases 5 representative works from the Age of Enlightenment to the contemporary era.'}
              </p>
              <p className="text-gray-100 font-sans max-w-6xl px-2 text-lg leading-relaxed mb-6 justify">
                {i18n.language === 'zh' ? '您可以阅览各作品叙事权威的特征与构建方式，了解它们代表了何种对人性的诠释与追求。' : 'You can see the characteristics and construction of narrative authority of each work, as well as what interpretation and exploration of human nature they represent.'}
              </p>
            </div>
          </section>

          {/* Timeline Section */}
          <div className="overflow-visible">
            <Suspense
              fallback={
                <div className="text-white sans max-w-[1600px] px-20 mx-auto py-70 ">
                  {t("loading")}
                </div>
              }
            >
              <Timeline />
            </Suspense>
          </div>

          {/* Footer */}
          <footer className="text-center py-8 text-sm text-gray-400 max-w-[800px] mx-auto font-sans">
            <p className="mb-1">
              {t("footer.createdBy", { year: new Date().getFullYear() })}{" "}
              <a
                href="https://x.com/jam3scampbell"
                className="text-blue-400 hover:text-blue-300 underline decoration-1 hover:decoration-blue-300 transition-colors duration-200"
              >
                James Campbell
              </a>{" "}
              {t("footer.and")}{" "}
              <a
                href="https://x.com/Emiliano_GLopez"
                className="text-blue-400 hover:text-blue-300 underline decoration-1 hover:decoration-blue-300 transition-colors duration-200"
              >
                Emiliano Garcia-Lopez
              </a>
              .
            </p>
            <p className="mb-1">
              {t("footer.contributors")}{" "}
              <a
                href="https://x.com/suntzoogway"
                className="underline decoration-1 hover:decoration-blue-300 transition-colors duration-200"
              >
                suntzoogway
              </a>
              ,{" "}
              <a
                href="https://github.com/puravparab"
                className="underline decoration-1 hover:decoration-blue-300 transition-colors duration-200"
              >
                puravparab
              </a>
              ,{" "}
              <a
                href="https://github.com/jamesms36"
                className="underline decoration-1 hover:decoration-blue-300 transition-colors duration-200"
              >
                jamesms36
              </a>
              , Max Kieffer,{" "}
              <a
                href="https://github.com/jtalmi"
                className="underline decoration-1 hover:decoration-blue-300 transition-colors duration-200"
              >
                Jonathan Talmi
              </a>
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
