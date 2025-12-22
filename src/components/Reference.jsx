import React from "react";
import { useTranslation } from "react-i18next";
import EmergentBackground from "./EmergentBackground";
import LanguageSwitcher from "./LanguageSwitcher";

const Reference = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col text-white">
      <EmergentBackground />
      <div className="relative z-10 p-4 md:p-8">
        <LanguageSwitcher />
        
        {/* Back Button */}
        <button
          className="bg-white/10 text-white px-4 py-2 rounded hover:bg-white/20 transition backdrop-blur-[1px] mb-8"
          onClick={() => window.location.hash = ''}
        >
          ← Back to Timeline
        </button>

        {/* Reference Cards */}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Works Cited</h1>

          {/* Primary Source */}
          <div className="bg-white/10 rounded-lg p-6 mb-8 backdrop-blur-[2px]">
            <h2 className="text-2xl font-bold mb-4">Primary Source</h2>
            <ul className="space-y-3">
              <li className="pl-2 indent-[-2ch]">Defoe, Daniel. <em>Robinson Crusoe</em>. With Robert Mayer and Paul Theroux, Penguin Publishing Group, 2008. K10plus ISBN.</li>
              <li className="pl-2 indent-[-2ch]">Dickens, Charles. <em>Oliver Twist</em> (Barnes & Noble Classics Series). Barnes & Noble, 2011.</li>
              <li className="pl-2 indent-[-2ch]">Golding, William. <em>Lord of the Flies: Penguin Classics Deluxe Edition</em>. With Lois Lowry et al., 1st ed, Penguin Publishing Group, 2016. Penguin Classics Deluxe Edition Series. K10plus ISBN.</li>
              <li className="pl-2 indent-[-2ch]">Ishiguro, Kazuo. <em>Klara and the Sun</em>. First edition, Alfred A. Knopf, 2021. K10plus ISBN.</li>
              <li className="pl-2 indent-[-2ch]">Woolf, Virginia. <em>Mrs Dalloway</em>. Penguin Publishing Group, 2000, London.</li>
            </ul>
          </div>

          {/* Secondary Source */}
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-[2px]">
            <h2 className="text-2xl font-bold mb-4">Secondary Source</h2>
            <ul className="space-y-3">
              <li className="pl-2 indent-[-2ch]">Abu-Fares, Ashraf. "Temporality in Great Expectations and Mrs. Dalloway: A Comparative Study." International Journal of Arts and Humanities Studies, vol. 1, Oct. 2021, pp. 08–13, <a href="https://doi.org/10.32996/ijahs.2021.1.1.2." className="text-blue-300 hover:underline" target="_blank" rel="noopener noreferrer">https://doi.org/10.32996/ijahs.2021.1.1.2.</a></li>
              <li className="pl-2 indent-[-2ch]">Collins, Phillip. <em>Charles Dickens: The Critical Heritage</em>. Taylor & Francis e-Library, 2005.</li>
              <li className="pl-2 indent-[-2ch]">Golding, William, and James R. Baker. "An Interview with William Golding." <em>Twentieth Century Literature</em>, vol. 28, no. 2, 1982, p. 130. DOI.org (Crossref), <a href="https://doi.org/10.2307/441151" className="text-blue-300 hover:underline" target="_blank" rel="noopener noreferrer">https://doi.org/10.2307/441151</a>.</li>
              <li className="pl-2 indent-[-2ch]">Larbi, Nariman. "A Literary Voyage into the Unconscious: A Philosophical Approach to the Psychological Novel in Woolf's Mrs. Dalloway (1925)." <em>AWEJ for Translation & Literary Studies</em>, Volume 3, Number 3, 2019.</li>
              <li className="pl-2 indent-[-2ch]">Seidel, Michael. "The Man Who Came to Dinner: Ian Watt and the Theory of Formal Realism." <em>Eighteenth-Century Fiction</em>, vol. 12 no. 2, 2000, p. 193-212. Project MUSE, <a href="https://dx.doi.org/10.1353/ecf.2000.0037" className="text-blue-300 hover:underline" target="_blank" rel="noopener noreferrer">https://dx.doi.org/10.1353/ecf.2000.0037</a>.</li>
              <li className="pl-2 indent-[-2ch]">Sutherland, John. <em>A Little History of Literature</em>. TJ International Ltd, Padstow, Cornwall, 2013.</li>
            </ul>
          </div>

          {/* PS Note */}
          <div className="bg-white/10 rounded-lg p-6 backdrop-blur-[2px] mt-8">
            <p className="space-y-3">For pictures and websites mentioned, you can click on them to jump forward directly.</p>
            <div className="mt-6 pt-4 border-t border-white/20">
              <p className="mb-2">Base code implementation and material references from the open-source GitHub community project <a href="https://github.com/jam3scampbell/ai-timeline" className="text-blue-300 hover:underline" target="_blank" rel="noopener noreferrer">https://github.com/jam3scampbell/ai-timeline</a>. Special thanks.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-white/70">
          <p>Sage Yijing Chen | 2025-fall History of English Literature</p>
        </footer>
      </div>
    </div>
  );
};

export default Reference;