/* card mode */

export const CATEGORIES = {
  ENLIGHTENMENT: "Enlightenment",
  VICTORIAN: "Victorian",
  MODERNISM: "Modernism",
  POSTWAR: "Postwar",
  CONTEMPORARY: "Contemporary",
};

function createLink(url, title) {
  return `<a href="${url}" target="_blank" rel="noopener noreferrer">${title}</a>`;
}

export const TIMELINE_DATA = {
  events: [
    {
      start_date: { year: "1719"},
      text: {
        headline: "<em>Robinson Crusoe</em>",
        text: `
          <div class="literary-analysis">
            <div class="analysis-section">
              <!-- 第一个子卡片留空 -->
            </div>
            <div class="analysis-section">
              <h4>Monopoly of Narrative Authority</h4>
              <ul>
                <li>Documentary writing style</li>
                <li>\"Authorship\" created by paratexts</li>
              </ul>
            </div>
            <div class="analysis-section">
              <h4>Define Human as Rational Individual</h4>
              <ul>
                <li>Transformation and conquest of the external world</li>
                <li>\"Economic man\" as a rational subject</li>
              </ul>
            </div>
          </div>
        `,
      },
      chinese: { // TODO:中文翻译
        headline: "<em>Robinson Crusoe</em>",
        text: `
          <div class="literary-analysis">
            <div class="analysis-section">
              <!-- 第一个子卡片留空 -->
            </div>
            <div class="analysis-section">
              <h4>Monopoly of Narrative Authority</h4>
              <ul>
                <li>Documentary writing style</li>
                <li>"Authorship": pages & frontispieces</li>
              </ul>
            </div>
            <div class="analysis-section">
              <h4>Human as Rational Individual</h4>
              <ul>
                <li>Transformation and conquest of the external world</li>
                <li>Define "economic man" as a rational subject</li>
              </ul>
            </div>
          </div>
        `,
      },
      importance: 3,
      category: CATEGORIES.ENLIGHTENMENT,
    },
    {
      start_date: { year: "1838"},
      text: {
        headline: "<em>Oliver Twist</em>",
        text: `
          <div class="literary-analysis">
            <div class="analysis-section">
              <!-- 第一个子卡片留空 -->
            </div>
            <div class="analysis-section">
              <h4>Critical Concentration of Narrative Authority</h4>
              <ul>
                <li>Social realism and historical background</li>
                <li>Typical character</li>
                <li>Omniscient perspective</li>
              </ul>
            </div>
            <div class="analysis-section">
              <h4>Examine Human as Social Elements</h4>
              <ul>
                <li>Social structure, class and system in industrial age</li>
                <li>Human morality and destiny being reshaped</li>
              </ul>
            </div>
          </div>
        `,
      },
      chinese: {// TODO:中文翻译
        headline: "<em>Oliver Twist</em>",
        text: `
          <div class="literary-analysis">
            <div class="analysis-section">
              <!-- 第一个子卡片留空 -->
            </div>
            <div class="analysis-section">
              <h4>Critical Concentration of Authority</h4>
              <ul>
                <li>Social realism</li>
                <li>Typical character</li>
                <li>Omniscient perspective</li>
              </ul>
            </div>
            <div class="analysis-section">
              <h4>Human as Social Examiner</h4>
              <ul>
                <li>Social structure, class and system in an industrial society</li>
                <li>Human morality and destiny being reshaped</li>
              </ul>
            </div>
          </div>
        `,
      },
      importance: 3,
      category: CATEGORIES.VICTORIAN,
    },
    {
      start_date: { year: "1925"},
      text: {
        headline: "<em>Mrs. Dalloway</em>",
        text: `
          <div class="literary-analysis">
            <div class="analysis-section">
              <!-- 第一个子卡片留空 -->
            </div>
            <div class="analysis-section">
              <h4>Internalization and Dispersion of Narrative Authority</h4>
              <ul>
                <li>Stream of consciousness</li>
                <li>Internal reality</li>
                <li>Multiple focalization</li>
              </ul>
            </div>
            <div class="analysis-section">
              <h4>Discover Human as Psychological Being</h4>
              <ul>
                <li>Focus shifts to the inner world</li>
                <li>Human consciousness flow, memory and trauma</li>
                <li>Deeper cognition of complex human nature</li>
              </ul>
            </div>
          </div>
        `,
      },
      chinese: {// TODO:中文翻译
        headline: "<em>Mrs. Dalloway</em>",
        text: `
          <div class="literary-analysis">
            <div class="analysis-section">
              <!-- 第一个子卡片留空 -->
            </div>
            <div class="analysis-section">
              <h4>Internalization and Dispersion of Narrative Authority</h4>
              <ul>
                <li>Stream of consciousness</li>
                <li>Internal reality</li>
                <li>Multiple focalization</li>
              </ul>
            </div>
            <div class="analysis-section">
              <h4>Human as Psychological Being</h4>
              <ul>
                <li>The exploration of human turns to the inner world</li>
                <li>Human consciousness flow, memory and trauma</li>
                <li>Deeper understanding of the complexity of human nature</li>
              </ul>
            </div>
          </div>
        `,
      },
      importance: 3,
      category: CATEGORIES.MODERNISM,
    },
    {
      start_date: { year: "1954"},
      text: {
        headline: "<em>Lord of the Flies</em>",
        text: `
          <div class="literary-analysis">
            <div class="analysis-section">
              <!-- 第一个子卡片留空 -->
            </div>
            <div class="analysis-section">
              <h4>Philosophical Transfer of Narrative Authority</h4>
              <ul>
                <li>Allegorical structure</li>
                <li>Thought experiment</li>
                <li>Divine tragedy</li>
              </ul>
            </div>
            <div class="analysis-section">
              <h4>Confront Human as Sinful Creature</h4>
              <ul>
                <li>Strip away the cloak of society to question human nature</li>
                <li>A direct objection to the Enlighenment \"rational man\"</li>
                <li>Dissect the darkness and evilness inherent in human</li>
              </ul>
            </div>
          </div>
        `,
      },
      chinese: {// TODO:中文翻译
        headline: "<em>Lord of the Flies</em>",
        text: `
          <div class="literary-analysis">
            <div class="analysis-section">
              <!-- 第一个子卡片留空 -->
            </div>
            <div class="analysis-section">
              <h4>Philosophical Transfer of Authority</h4>
              <ul>
                <li>Allegorical structure</li>
                <li>Thought experiment</li>
                <li>Divine tragedy</li>
              </ul>
            </div>
            <div class="analysis-section">
              <h4>Human as Sinful Creature</h4>
              <ul>
                <li>Strip off the cloak of society to question human nature</li>
                <li>Dissect the darkness and evilness inherent in mind</li>
                <li>A direct objection to the "rational man" of Enlightenment</li>
              </ul>
            </div>
          </div>
        `,
      },
      importance: 3,
      category: CATEGORIES.POSTWAR,
    },
    {
      start_date: { year: "2021"},
      text: {
        headline: "<em>Klara and the Sun</em>",
        text: `
          <div class="literary-analysis">
            <div class="analysis-section">
              <!-- 第一个子卡片留空 -->
            </div>
            <div class="analysis-section">
              <h4>Diffusion of Narrative Authority</h4>
              <ul>
                <li>Post-human perspective</li>
                <li>Technical explosion and value crisis</li>
              </ul>
            </div>
            <div class="analysis-section">
              <h4>Rediscover Human as Yearning Self</h4>
              <ul>
                <li>Non-human agents as the owner of narrative authority</li>
                <li>The uniqueness of human love and hope facing the ultimate trial</li>
                <li>Through non-human perspective: What is irreplaceable \"humanity\"\?</li>
              </ul>
            </div>
          </div>
        `,
      },
      chinese: {// TODO:中文翻译
        headline: "<em>Klara and the Sun</em>",
        text: `
          <div class="literary-analysis">
            <div class="analysis-section">
              <!-- 第一个子卡片留空 -->
            </div>
            <div class="analysis-section">
              <h4>Diffusion of Narrative Authority</h4>
              <ul>
                <li>Post-human perspective</li>
                <li>Technical Apocalypse</li>
              </ul>
            </div>
            <div class="analysis-section">
              <h4>Human as Yearning Self</h4>
              <ul>
                <li>Non-human agents as the owner of narrative authority</li>
                <li>The uniqueness of human love and hope faces the ultimate trial</li>
                <li>Reverse questioning by AI: What is irreplaceable "human nature"?</li>
              </ul>
            </div>
          </div>
        `,
      },
      importance: 3,
      category: CATEGORIES.CONTEMPORARY,
    },
  ]
};
