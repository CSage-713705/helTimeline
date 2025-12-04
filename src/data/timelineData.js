/* card mode */

// 时代分类
export const CATEGORIES = {
  ENLIGHTENMENT: "Enlightenment",
  VICTORIAN: "Victorian",
  POST_WWI: "Post-WWI",
  POST_WWII: "Post-WWII",
  CONTEMPORARY: "Contemporary",
};

// 时代分类名称映射（中英文）
export const CATEGORY_NAMES = {
  English: {
    [CATEGORIES.ENLIGHTENMENT]: "Enlightenment",
    [CATEGORIES.VICTORIAN]: "Victorian",
    [CATEGORIES.POST_WWI]: "Post-WWI",
    [CATEGORIES.POST_WWII]: "Post-WWII",
    [CATEGORIES.CONTEMPORARY]: "Contemporary",
  },
  Chinese: {
    [CATEGORIES.ENLIGHTENMENT]: "启蒙时代",
    [CATEGORIES.VICTORIAN]: "维多利亚时代",
    [CATEGORIES.POST_WWI]: "一战后",
    [CATEGORIES.POST_WWII]: "二战后",
    [CATEGORIES.CONTEMPORARY]: "当代",
  }
};

function createLink(url, title) {
  return `<a href="${url}" target="_blank" rel="noopener noreferrer">${title}</a>`;
}

export const TIMELINE_DATA = {
  events: [
    {
      start_date: { year: "1719"},
      text: {
        headline: "<em>Robinson Crusoe</em> \| Daniel Defoe",
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
      chinese: {
        headline: "<em>《鲁滨逊漂流记》</em> \| 丹尼尔·笛福",
        text: `
          <div class="literary-analysis">
            <div class="analysis-section">
              <!-- 第一个子卡片留空 -->
            </div>
            <div class="analysis-section">
              <h4>叙事权威的垄断</h4>
              <ul>
                <li>纪实写作手法</li>
                <li>"虚构作者"：副文本</li>
              </ul>
            </div>
            <div class="analysis-section">
              <h4>定义理性的人</h4>
              <ul>
                <li>重塑与征服外在世界</li>
                <li>作为理性主体的\“经济人\”</li>
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
        headline: "<em>Oliver Twist</em> \| Charles Dickens",
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
      chinese: {
        headline: "<em>《雾都孤儿》</em> \| 查尔斯·狄更斯",
        text: `
          <div class="literary-analysis">
            <div class="analysis-section">
              <!-- 第一个子卡片留空 -->
            </div>
            <div class="analysis-section">
              <h4>叙事权威的批判性集中</h4>
              <ul>
                <li>社会写实与历史背景</li>
                <li>典型人物</li>
                <li>全知视角</li>
              </ul>
            </div>
            <div class="analysis-section">
              <h4>审视社会的人</h4>
              <ul>
                <li>工业时代的社会结构、阶级和制度</li>
                <li>人类道德和命运的重塑</li>
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
        headline: "<em>Mrs. Dalloway</em> \| Virginia Woolf",
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
      chinese: {
        headline: "<em>《达洛维夫人》</em> \|  弗吉尼亚·伍尔弗",
        text: `
          <div class="literary-analysis">
            <div class="analysis-section">
              <!-- 第一个子卡片留空 -->
            </div>
            <div class="analysis-section">
              <h4>叙事权威的内化与分散</h4>
              <ul>
                <li>意识流</li>
                <li>内在现实</li>
                <li>多重聚焦</li>
              </ul>
            </div>
            <div class="analysis-section">
              <h4>发现心理的人</h4>
              <ul>
                <li>探讨焦点转向内在世界</li>
                <li>人的意识流动、记忆与创伤</li>
                <li>深化复杂人性的认知</li>
              </ul>
            </div>
          </div>
        `,
      },
      importance: 3,
      category: CATEGORIES.POST_WWI,
    },
    {
      start_date: { year: "1954"},
      text: {
        headline: "<em>Lord of the Flies</em> \| William Golding",
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
      chinese: {
        headline: "<em>《蝇王》</em> \| 威廉·戈尔丁",
        text: `
          <div class="literary-analysis">
            <div class="analysis-section">
              <!-- 第一个子卡片留空 -->
            </div>
            <div class="analysis-section">
              <h4>叙事权威的哲学化迁移</h4>
              <ul>
                <li>寓言结构</li>
                <li>思想实验</li>
                <li>神圣悲剧</li>
              </ul>
            </div>
            <div class="analysis-section">
              <h4>直面罪恶的人</h4>
              <ul>
                <li>剥离社会，直接质问人的本性</li>
                <li>二战后对启蒙时代\“理性人\”的颠覆</li>
                <li>人性固有的黑暗与邪恶</li>
              </ul>
            </div>
          </div>
        `,
      },
      importance: 3,
      category: CATEGORIES.POST_WWII,
    },
    {
      start_date: { year: "2021"},
      text: {
        headline: "<em>Klara and the Sun</em> \| Kazuo Ishiguro",
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
      chinese: {
        headline: "<em>《克拉拉与太阳》</em> \| 石黑一雄",
        text: `
          <div class="literary-analysis">
            <div class="analysis-section">
              <!-- 第一个子卡片留空 -->
            </div>
            <div class="analysis-section">
              <h4>叙事权威的扩散</h4>
              <ul>
                <li>后人类视角</li>
                <li>科技爆发与价值观危机</li>
              </ul>
            </div>
            <div class="analysis-section">
              <h4>回归自我的人</h4>
              <ul>
                <li>叙事权威赋予非人智能体</li>
                <li>爱与希望的独特性面临终极挑战</li>
                <li>非人视角的反向质询：何为不可替代的\“人性\”\？</li>
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