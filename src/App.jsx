// src/App.jsx
import React, { Suspense, lazy, useState, useEffect } from "react";
// import Starfield from "./components/Starfield";
import Starfield from "./components/EmergentBackground";
// import Timeline from "./components/Timeline"; // REMOVE this import
import LanguageSwitcher from "./components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

// LAZY import for Timeline
const Timeline = lazy(() => import("./components/Timeline"));
const Reference = lazy(() => import("./components/Reference"));

export default function App() {
  const { t, i18n } = useTranslation();
  const [showReference, setShowReference] = useState(false);

  // Check hash on initial load and whenever hash changes
  useEffect(() => {
    const checkHash = () => {
      setShowReference(window.location.hash === '#reference');
    };

    // Initial check
    checkHash();

    // Add event listener for hash changes
    window.addEventListener('hashchange', checkHash);

    // Clean up event listener
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  return (
    <>
      {showReference ? (
        <Suspense
          fallback={
            <div className="text-white sans max-w-[1600px] px-20 mx-auto py-70 ">
              {t("loading")}
            </div>
          }
        >
          <Reference />
        </Suspense>
      ) : (
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
                  {i18n.language === 'zh' ? '作者、媒体、小说' : 'Author, Media, Novel'}
                </h1>
                <h2 className="font-serif text-2xl md:text-3xl font-normal text-white leading-tight mb-6">
                  {i18n.language === 'zh' ? '英国文学时间轴' : 'A Timeline of English Literature'}
                </h2>
                <p className="text-gray-100 font-sans max-w-5xl px-2 text-lg leading-relaxed mb-6 justify">
                  {i18n.language === 'zh' ? '本时间轴展示了由启蒙时代到当代5个关键文学时期的代表作品。' : 'This timeline showcases 5 representative works from the Age of Enlightenment to the contemporary era.'}
                </p>
                <p className="text-gray-100 font-sans max-w-6xl px-2 text-lg leading-relaxed mb-6 justify">
                  {i18n.language === 'zh' ? '您可以阅览各个作者如何参与其媒体构建，了解它们如何影响故事的诠释。' : 'You can see how the author and the medium interact, which fundamentally shape the novel\'s meaning production and interpretation.'}
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
              <p>Sage Yijing Chen | 2025-fall History of English Literature</p>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}
