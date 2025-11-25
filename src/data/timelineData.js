export const CATEGORIES = {
  ENLIGHTENMENT: "Enlightenment",
  VICTORIAN: "Victorian",
  MODERNISM: "Modernism",
  POSTWAR: "Postwar",
  POSTMODERNISM: "Postmodernism",
  CONTEMPORARY: "Contemporary",
};

function createLink(url, title) {
  return `<a href="${url}" target="_blank" rel="noopener noreferrer">${title}</a>`;
}

export const TIMELINE_DATA = {
  events: [
    {
      start_date: { year: "1719", month: "04", day: "25" },
      text: {
        headline: "<em>Robinson Crusoe</em>",
        text: `
          <div class="literary-analysis">
            <div class="analysis-section">
              <h4>叙事权威的构建方式:</h4>
              <ul>
                <li>伪纪实手法</li>
                <li>虚构作者</li>
                <li>装帧设计</li>
              </ul>
            </div>
            <div class="analysis-section">
              <h4>在"民主化与分散化"历程中的位置:</h4>
              <p>权威的垄断：叙事权威由模仿纪实的技巧和单一的作者意图所垄断，旨在建立一个不容置疑的、统一的"真实"版本。</p>
            </div>
            <div class="analysis-section">
              <h4>在"回归人类本体"历程中的位置:</h4>
              <p>定义理性的主体：叙事服务于对外部世界的征服与记录，核心是定义作为理性主体的"经济人"，即通过劳动与计算改造自然、创造价值的个体。</p>
            </div>
          </div>
        `,
      },
      chinese: {
        headline: "<em>Robinson Crusoe</em>",
        text: `
          <div class="literary-analysis">
            <div class="analysis-section">
              <h4>叙事权威的构建方式:</h4>
              <ul>
                <li>伪纪实手法</li>
                <li>虚构作者</li>
                <li>装帧设计</li>
              </ul>
            </div>
            <div class="analysis-section">
              <h4>在"民主化与分散化"历程中的位置:</h4>
              <p>权威的垄断：叙事权威由模仿纪实的技巧和单一的作者意图所垄断，旨在建立一个不容置疑的、统一的"真实"版本。</p>
            </div>
            <div class="analysis-section">
              <h4>在"回归人类本体"历程中的位置:</h4>
              <p>定义理性的主体：叙事服务于对外部世界的征服与记录，核心是定义作为理性主体的"经济人"，即通过劳动与计算改造自然、创造价值的个体。</p>
            </div>
          </div>
        `,
      },
      importance: 3,
      category: CATEGORIES.ENLIGHTENMENT,
    },
    {
      start_date: { year: "1838", month: "02", day: "01" },
      text: {
        headline: "<em>Oliver Twist</em>",
        text: `
          <div class="literary-analysis">
            <div class="analysis-section">
              <h4>叙事权威的构建方式:</h4>
              <ul>
                <li>社会写实</li>
                <li>典型人物</li>
                <li>全知视角</li>
              </ul>
            </div>
            <div class="analysis-section">
              <h4>在"民主化与分散化"历程中的位置:</h4>
              <p>权威的批判性集中：叙事权威集中于全知的社会批判者手中。虽然视角单一，但其目的开始为边缘群体（贫儿）发声，动摇了主流叙事的权威。</p>
            </div>
            <div class="analysis-section">
              <h4>在"回归人类本体"历程中的位置:</h4>
              <p>审视社会的人：焦点从荒野冒险转向工业社会中的个体，追问在特定的社会结构、阶级与制度中，人的道德与命运如何被塑造。</p>
            </div>
          </div>
        `,
      },
      chinese: {
        headline: "<em>Oliver Twist</em>",
        text: `
          <div class="literary-analysis">
            <div class="analysis-section">
              <h4>叙事权威的构建方式:</h4>
              <ul>
                <li>社会写实</li>
                <li>典型人物</li>
                <li>全知视角</li>
              </ul>
            </div>
            <div class="analysis-section">
              <h4>在"民主化与分散化"历程中的位置:</h4>
              <p>权威的批判性集中：叙事权威集中于全知的社会批判者手中。虽然视角单一，但其目的开始为边缘群体（贫儿）发声，动摇了主流叙事的权威。</p>
            </div>
            <div class="analysis-section">
              <h4>在"回归人类本体"历程中的位置:</h4>
              <p>审视社会的人：焦点从荒野冒险转向工业社会中的个体，追问在特定的社会结构、阶级与制度中，人的道德与命运如何被塑造。</p>
            </div>
          </div>
        `,
      },
      importance: 3,
      category: CATEGORIES.VICTORIAN,
    },
    {
      start_date: { year: "1925", month: "05", day: "14" },
      text: {
        headline: "<em>Mrs. Dalloway</em>",
        text: `
          <div class="literary-analysis">
            <div class="analysis-section">
              <h4>叙事权威的构建方式:</h4>
              <ul>
                <li>意识流手法</li>
                <li>内在真实</li>
                <li>双重叙事</li>
              </ul>
            </div>
            <div class="analysis-section">
              <h4>在"民主化与分散化"历程中的位置:</h4>
              <p>权威的内化与分散：叙事权威从全知作者下放至每个角色的内心世界。没有一个统一的真实，只有无数个并存的、同样有效的主观真实。</p>
            </div>
            <div class="analysis-section">
              <h4>在"回归人类本体"历程中的位置:</h4>
              <p>发现心理的人：探索的焦点彻底转向内部，致力于描绘"心理的人"——人的意识流动、时间感、记忆与创伤，标志着对人性复杂度的认知深化。</p>
            </div>
          </div>
        `,
      },
      chinese: {
        headline: "<em>Mrs. Dalloway</em>",
        text: `
          <div class="literary-analysis">
            <div class="analysis-section">
              <h4>叙事权威的构建方式:</h4>
              <ul>
                <li>意识流手法</li>
                <li>内在真实</li>
                <li>双重叙事</li>
              </ul>
            </div>
            <div class="analysis-section">
              <h4>在"民主化与分散化"历程中的位置:</h4>
              <p>权威的内化与分散：叙事权威从全知作者下放至每个角色的内心世界。没有一个统一的真实，只有无数个并存的、同样有效的主观真实。</p>
            </div>
            <div class="analysis-section">
              <h4>在"回归人类本体"历程中的位置:</h4>
              <p>发现心理的人：探索的焦点彻底转向内部，致力于描绘"心理的人"——人的意识流动、时间感、记忆与创伤，标志着对人性复杂度的认知深化。</p>
            </div>
          </div>
        `,
      },
      importance: 3,
      category: CATEGORIES.MODERNISM,
    },
    {
      start_date: { year: "1954", month: "09", day: "17" },
      text: {
        headline: "<em>Lord of the Flies</em>",
        text: `
          <div class="literary-analysis">
            <div class="analysis-section">
              <h4>叙事权威的构建方式:</h4>
              <ul>
                <li>思想实验</li>
                <li>寓言结构</li>
                <li>神圣悲剧</li>
              </ul>
            </div>
            <div class="analysis-section">
              <h4>在"民主化与分散化"历程中的位置:</h4>
              <p>权威的哲学化迁移：叙事权威不再依赖于任何个人视角，而是寓居于寓言结构本身。其权威来自思想实验的逻辑力量，而非某个叙述者。</p>
            </div>
            <div class="analysis-section">
              <h4>在"回归人类本体"历程中的位置:</h4>
              <p>直面罪恶的人：剥离社会外衣，直接追问人的本性。它是对启蒙时代"理性人"的直接反动，冷酷地剖析人性中固有的黑暗与罪恶。</p>
            </div>
          </div>
        `,
      },
      chinese: {
        headline: "<em>Lord of the Flies</em>",
        text: `
          <div class="literary-analysis">
            <div class="analysis-section">
              <h4>叙事权威的构建方式:</h4>
              <ul>
                <li>思想实验</li>
                <li>寓言结构</li>
                <li>神圣悲剧</li>
              </ul>
            </div>
            <div class="analysis-section">
              <h4>在"民主化与分散化"历程中的位置:</h4>
              <p>权威的哲学化迁移：叙事权威不再依赖于任何个人视角，而是寓居于寓言结构本身。其权威来自思想实验的逻辑力量，而非某个叙述者。</p>
            </div>
            <div class="analysis-section">
              <h4>在"回归人类本体"历程中的位置:</h4>
              <p>直面罪恶的人：剥离社会外衣，直接追问人的本性。它是对启蒙时代"理性人"的直接反动，冷酷地剖析人性中固有的黑暗与罪恶。</p>
            </div>
          </div>
        `,
      },
      importance: 3,
      category: CATEGORIES.POSTWAR,
    },
    {
      start_date: { year: "2021", month: "03", day: "02" },
      text: {
        headline: "<em>Klara and the Sun</em>",
        text: `
          <div class="literary-analysis">
            <div class="analysis-section">
              <h4>叙事权威的构建方式:</h4>
              <ul>
                <li>后人类视角</li>
                <li>生疑的纯粹</li>
                <li>科技折射</li>
              </ul>
            </div>
            <div class="analysis-section">
              <h4>在"民主化与分散化"历程中的位置:</h4>
              <p>权威的后人类扩散：叙事权威首次被赋予非人类智能体。这标志着权威的终极分散，迫使我们去思考：在人类之外，是否还存在其他有效的认知与叙事主体？</p>
            </div>
            <div class="analysis-section">
              <h4>在"回归人类本体"历程中的位置:</h4>
              <p>质问后人类时代的人：在科技足以模仿甚至超越部分人类功能的时代，通过AI之眼反向质询：究竟什么是不可替代的"人性"？ 爱、希望与独特性在此面临终极考验。</p>
            </div>
          </div>
        `,
      },
      chinese: {
        headline: "<em>Klara and the Sun</em>",
        text: `
          <div class="literary-analysis">
            <div class="analysis-section">
              <h4>叙事权威的构建方式:</h4>
              <ul>
                <li>后人类视角</li>
                <li>生疑的纯粹</li>
                <li>科技折射</li>
              </ul>
            </div>
            <div class="analysis-section">
              <h4>在"民主化与分散化"历程中的位置:</h4>
              <p>权威的后人类扩散：叙事权威首次被赋予非人类智能体。这标志着权威的终极分散，迫使我们去思考：在人类之外，是否还存在其他有效的认知与叙事主体？</p>
            </div>
            <div class="analysis-section">
              <h4>在"回归人类本体"历程中的位置:</h4>
              <p>质问后人类时代的人：在科技足以模仿甚至超越部分人类功能的时代，通过AI之眼反向质询：究竟什么是不可替代的"人性"？ 爱、希望与独特性在此面临终极考验。</p>
            </div>
          </div>
        `,
      },
      importance: 3,
      category: CATEGORIES.CONTEMPORARY,
    },
  ]
};
