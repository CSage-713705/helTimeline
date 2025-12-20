// src/components/Timeline.jsx
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useLayoutEffect,
  useCallback,
} from "react";
import { TIMELINE_DATA, CATEGORIES, CATEGORY_NAMES } from "../data/timelineData";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import RobinsonCrusoeParatext from '../assets/1_paratext.png';
// import FridayRobinsonImage from '../assets/2_FridayRobinson.webp';
import OliverTwist from '../assets/3_OliverTwist.webp';
// import Victorian from '../assets/4_victorian.jpg';
import MrsDalloway from '../assets/5_MrsDalloway.png';
import LordOfTheFlies from '../assets/6_LordoftheFlies.png';
import DigitalReading from '../assets/7_DigitalReading.png';


const MIN_CARD_WIDTH = 300; // 增加最小卡片宽度
const ROW_GAP = 10;
const TIME_MARKER_HEIGHT = 40;
const Z_INDEX_BASE = 20;
const Z_INDEX_HOVER = 100;
const MIN_CARD_HEIGHT = 70;
const MIN_EXPANDED_HEIGHT = 350; // 增加最小展开高度
const ROW_HEIGHT = 70;
const INNER_CARD_PADDING = 60; // add inner card padding
// 10 year per scale
const ZOOM_LEVELS = [50, 100, 150, 200, 250, 300];

// 全局卡片样式
const styles = `
  /* 文学分析卡片样式 */
  .literary-analysis {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 8px 0;
  }
  
  .analysis-section {
    background: rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 16px;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
  }
  
  .analysis-section:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
  
  .analysis-section h4 {
    margin: 0 0 12px 0;
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.4;
  }
  
  .analysis-section ul {
    margin: 0;
    padding-left: 20px;
  }
  
  .analysis-section li {
    margin-bottom: 6px;
    line-height: 1.5;
  }
  
  .analysis-section p {
    margin: 0;
    line-height: 1.5;
  }
`;

// insert pattern
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}

const BASE_ROW_COUNT_CARDS = 5;
const BASE_TIMELINE_ROWS = 6;
const MIN_ROW_COUNT = 4;
const MAX_ROW_COUNT = 12;

// Cards view components
const CardsView = React.memo(function CardsView({
  events,
  activeCategories,
  hoveredEvent,
  setHoveredEvent,
}) {
  const timelineRef = useRef(null);
  const spineRef = useRef(null);
  const { i18n, t } = useTranslation();
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [spineOffset, setSpineOffset] = useState(0);
  const [backgroundProgress, setBackgroundProgress] = useState(0);
  const [hoveredEventIndex, setHoveredEventIndex] = useState(null);

  const filteredEvents = events.filter(
    (event) => activeCategories[event.category]
  );
  const currentEvent = hoveredEventIndex !== null ? filteredEvents[hoveredEventIndex] : filteredEvents[activeEventIndex];

  // Calculate which event is in view and update scroll progress
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    let scrollTimeout;

    const handleScroll = () => {
      lastScrollY = window.scrollY;

      if (!ticking) {
        requestAnimationFrame(() => {
          updateSpinePosition(lastScrollY);
          ticking = false;
        });
        ticking = true;
      }

      // debounce the active card update
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        updateActiveCard(lastScrollY);
      }, 100); // wait for scroll to settle
    };

    const updateActiveCard = (scrollY) => {
      if (!timelineRef.current) return;

      const cards = timelineRef.current.getElementsByClassName("event-card");
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const viewportMiddle = scrollY + viewportHeight / 2;

      // Find the card closest to the middle of the viewport
      let closestCard = 0;
      let minDistance = Infinity;

      Array.from(cards).forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardMiddle = scrollY + rect.top + rect.height / 2;
        const distance = Math.abs(cardMiddle - viewportMiddle);

        if (distance < minDistance) {
          minDistance = distance;
          closestCard = index;
        }
      });

      setActiveEventIndex(closestCard);
    };

    const updateSpinePosition = (scrollY) => {
      if (!currentEvent) {
        setBackgroundProgress(0); // 确保即使没有currentEvent也有默认值
        return;
      }

      const currentDate = new Date(
        currentEvent.start_date.year,
        currentEvent.start_date.month - 1,
        currentEvent.start_date.day
      );
      const startDate = new Date(2015, 0, 1);
      const endDate = new Date(2025, 11, 31);
      const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
      const daysPassed = (currentDate - startDate) / (1000 * 60 * 60 * 24);

      // 添加安全检查，确保progress是有效的数字
      let progress = daysPassed / totalDays;
      if (isNaN(progress)) {
        progress = 0;
      }

      const viewportHeight = window.innerHeight;
      const spineHeight = 1200;
      const dotPosition = 60 + progress * (spineHeight - 120);

      // Calculate background progress based on dot position
      const normalizedProgress = Math.max(0, Math.min(1, progress));
      setBackgroundProgress(normalizedProgress);

      if (dotPosition > viewportHeight - 180) {
        const overflow = dotPosition - (viewportHeight - 180);
        setSpineOffset(-Math.min(overflow, spineHeight - viewportHeight));
      } else {
        setSpineOffset(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [events.length, activeEventIndex, filteredEvents, currentEvent]);

  const scrollToEvent = useCallback((index) => {
    const cards = timelineRef.current.getElementsByClassName("event-card");
    if (cards[index]) {
      const card = cards[index];
      const cardRect = card.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const offset =
        window.scrollY +
        cardRect.top -
        viewportHeight / 2 +
        cardRect.height / 2;

      // Handle edge cases
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const finalOffset = Math.max(0, Math.min(offset, maxScroll));

      // Use native smooth scrolling
      window.scrollTo({
        top: finalOffset,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <div
      className="relative font-sans cards-view"
      data-scroll-progress={backgroundProgress}
    >
      {/* Main timeline */}
      <section
        ref={timelineRef}
        className="grid grid-cols-[70px_1fr]  mb-10 relative"
      >
        {/* Left column: Timeline spine */}
        <div ref={spineRef} className="sticky top-0 pl-6 h-screen">
          {/* Timeline container */}
          <div className="relative h-full">
            <div
              className="relative"
              style={{
                height: "1200px",
                transform: `translateY(${spineOffset}px)`,
                transition: "transform 0.2s ease-out",
                willChange: "transform",
              }}
            >
              {/* Vertical line */}
              <div
                className="absolute left-1/2 transform -translate-x-1/2 w-[2px] bg-white/30"
                style={{ height: "100%" }}
              />

              {/* Moving dot */}
              <div
                className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-lg transition-all duration-300"
                style={{
                  top: `${(() => {
                    if (!currentEvent) return 60;
                    const currentDate = new Date(
                      currentEvent.start_date.year,
                      currentEvent.start_date.month - 1,
                      currentEvent.start_date.day
                    );
                    const startDate = new Date(2015, 0, 1);
                    const endDate = new Date(2025, 11, 31);
                    const totalDays =
                      (endDate - startDate) / (1000 * 60 * 60 * 24);
                    const daysPassed =
                      (currentDate - startDate) / (1000 * 60 * 60 * 24);
                    const progress = daysPassed / totalDays;

                    const usableHeight = 1200 - 120;
                    return 60 + progress * usableHeight;
                  })()}px`,
                  boxShadow: hoveredEventIndex !== null ? "0 0 15px rgba(255, 255, 255, 0.8)" : "0 0 10px rgba(255, 255, 255, 0.5)",
                  transform: hoveredEventIndex !== null ? "translate(-50%, -50%) scale(1.2)" : "translate(-50%, -50%) scale(1)",
                }}
              />

              {/* Year markers - only show years corresponding to cards and align with card tops */}
              {(() => {
                // Get unique years from filtered events
                const cardYears = [...new Set(filteredEvents.map(event => event.start_date.year))];

                // Card spacing and positioning
                const cardTopOffset = 60; // Adjusted value to align exactly with card tops
                const cardGap = 8; // Match the space-y-8 class

                return filteredEvents.map((event, index) => {
                  // Calculate position to align with card top (considering py-12 padding)
                  const position = cardTopOffset + index * (cardGap * 16 + 20); // Adjusted spacing formula

                  return (
                    <div
                      key={`card-year-${index}`}
                      className="absolute left-1/2 transform -translate-x-full pr-4 text-right"
                      style={{
                        top: `${position}px`,
                        transform: "translate(-100%, -50%)",
                      }}
                    >
                      <span className={`text-xl font-medium whitespace-nowrap transition-all duration-300 ${hoveredEventIndex === index ? 'text-white font-bold' : 'text-white/90 year-glow'
                        }`}>
                        {event.start_date.year}
                      </span>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </div>

        <div className="space-y-8 py-12">
          {filteredEvents.map((event, index) => {
            // Use the Chinese version if the current language is 'zh'
            const localizedContent =
              i18n.language === "zh" && event.chinese
                ? event.chinese
                : event.text;

            return (
              <div
                key={index}
                className={`event-card p-6 ${index === activeEventIndex ? "active" : ""}`}
                onMouseEnter={() => setHoveredEventIndex(index)}
                onMouseLeave={() => setHoveredEventIndex(null)}
              >
                <div className="text-sm text-white/60 font-medium tracking-wide">
                  {event.start_date.year}
                </div>
                <div
                  className="font-serif text-2xl font-normal text-white leading-snug mt-2"
                  // Use localized headline
                  dangerouslySetInnerHTML={{
                    __html: localizedContent.headline,
                  }}
                />
                <div className="text-xs font-sans mt-1 text-white/40">
                  {CATEGORY_NAMES[i18n.language === "zh" ? "Chinese" : "English"][event.category]}
                </div>
                <div className="text-white/80 text-base leading-relaxed mt-3">
                  {(() => {
                    // 为Robinson Crusoe的子板块添加图片和注释（仅在卡片视图中显示）
                    if (event.start_date.year === "1719" && event.text.headline.includes("Robinson Crusoe")) {
                      // 手动构建卡片视图的内容，包含两张图片
                      return (
                        <div className="literary-analysis">
                          <div className="analysis-section">
                            <div className="text-left text-white/90 mb-4">
                              "... All the good things of this world are no farther good to us than they are for our use."
                            </div>
                            <div className="text-right text-sm text-white/70">
                              (ch. XII, "<em>I Make Myself a Canoe</em>")
                            </div>
                          </div>
                          <div className="analysis-section">
                            <h4>{i18n.language === "zh" ? "副文本与虚构作者" : "Paratext and Constructed Authorial Persona"}</h4>
                            <div className="ml-4">
                              <li>The <strong>paratext</strong> is cleverly used (such as the statement "written by him himself" on the title page, the editor's note in the preface) to construct a <strong>documentary writing style</strong> that packages the fictional adventure as a real historical record.</li>
                              <li>This shaping of <strong>"constructed authorial persona"</strong> not only blurs the boundaries between fiction and documentary, author and narrator, but also profoundly affects the reader's understanding of the story: it gives the miracle of survival on a desert island a convincing sense of reality, and quietly presents <strong>the ideology of personal struggle and colonial expansion</strong> as objective and natural "facts" in front of readers. Therefore, the construction of the medium itself has become an indispensable part of the meaning of the story.</li>
                            </div>
                            <div className="mt-4 w-full">
                              <img
                                src={RobinsonCrusoeParatext}
                                alt="Robinson Crusoe Paratext"
                                className="w-full rounded-md shadow-lg"
                              />
                              <div className="text-center mt-2 text-sm text-white/50">
                                {/* TODO: 检查cite */}
                                {i18n.language === 'zh' ? '此处添加注释' : 'here for citation'}
                              </div>
                            </div>
                          </div>
                          {/* <div className="analysis-section">
                            <h4>{i18n.language === "zh" ? "将人类定义为理性个体" : "Define Human as Rational Individual"}</h4>
                            <ul>
                              <li>{i18n.language === "zh" ? "对外部世界的改造和征服" : "Transformation and conquest of the external world"}</li>
                              <li>{i18n.language === "zh" ? '作为理性主体的"经济人"' : '"Economic man" as a rational subject'}</li>
                            </ul>
                            <div className="mt-4 w-full">
                              <img 
                                src={FridayRobinsonImage} 
                                alt="Friday and Robinson" 
                                className="w-full rounded-md shadow-lg" 
                              />
                              <div className="text-center mt-2 text-sm text-white/50">
                                {i18n.language === 'zh' ? '此处添加注释' : 'Friday and Robinson Crusoe'}. 
                                lithograph by Currier & Ives, c. 1874.
                              </div>
                            </div>
                          </div> */}
                        </div>
                      );
                    }
                    // 为Oliver Twist的子板块添加图片和注释（仅在卡片视图中显示）
                    else if (event.start_date.year === "1838" && event.text.headline.includes("Oliver Twist")) {
                      // 手动构建卡片视图的内容，包含两张图片
                      return (
                        <div className="literary-analysis">
                          <div className="analysis-section">
                            {/* 第一个子卡片留空 */}
                            <div className="text-left text-white/90 mb-4">
                              "Let the tears which fell, and the broken words which were exchanged in the long close embrace between the orphans, be sacred."
                            </div>
                            <div className="text-right text-sm text-white/70">
                              (ch. LI)
                            </div>
                          </div>
                          <div className="analysis-section">
                            <h4>{i18n.language === "zh" ? "作家与插画师合作" : "Collaboration of Writer and Illustrator"}</h4>
                            <div className="ml-4">
                              <li>Charles Dickens closely stitches the fate of individuals with the entire <strong>social reality</strong> and <strong>historical background</strong> through a grand narrative from an <strong>omniscient perspective</strong>. This broad vision is obtained through the illustrations of painters such as George Cruikshank: the squalor of the slums and the coldness of the workhouse are intuitively presented, and <strong>typical characters</strong> such as the innocent Oliver and the cunning Fagin are also stereotyped and deeply rooted in the hearts of the readers.</li>
                              <li>Writers and Painters are always good co-authors. Illustration in <em>Oliver Twist</em> is not a simple decoration, but serves as a visual medium that reinforces the social realism impact of the novel, transforming the class divisions and moral anxieties of Victorian London into images that can be directly "witnessed" and empathized with by the public, thus profoundly shaping the social critical interpretation of the story.</li>
                            </div>
                            <div className="mt-4 w-full">
                              <img
                                src={OliverTwist}
                                alt="Oliver Twist"
                                className="w-full rounded-md shadow-lg mx-auto"
                              />
                              <div className="text-center mt-2 text-sm text-white/50">
                                {/* TODO：换行处理 */}
                                {/* TODO：引用格式 */}
                                <a href="https://www.britannica.com/topic/Oliver-Twist-novel-by-Dickens" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline">
                                  The Artful Dodger picking a pocket to the amazement of Oliver Twist (far right); illustration by George Cruikshank for Charles Dickens's Oliver Twist (1837–39).
                                </a>
                              </div>
                            </div>
                          </div>
                          {/* <div className="analysis-section">
                            <h4>{i18n.language === "zh" ? "审视社会的人" : "Examine Human as Social Elements"}</h4>
                            <ul>
                              <li>{i18n.language === "zh" ? "工业时代的社会结构、阶级和制度" : "Social structure, class and system in industrial age"}</li>
                              <li>{i18n.language === "zh" ? "人类道德和命运的重塑" : "Human morality and destiny being reshaped"}</li>
                            </ul>
                            <div className="mt-4 w-full">
                              <img 
                                src={Victorian} 
                                alt="Victorian Era" 
                                className="w-full rounded-md shadow-lg mx-auto" 
                              />
                              <div className="text-center mt-2 text-sm text-white/50">
                                
                                The Victorians rise to power of Great Britain.
                                https://www.historic-uk.com/HistoryUK/HistoryofBritain/Victorian-Workhouse/
                              </div>
                            </div>
                          </div> */}
                        </div>
                      );
                    }
                    // 为Mrs Dalloway的子板块添加图片和注释（仅在卡片视图中显示）
                    else if (event.start_date.year === "1925" && event.text.headline.includes("Mrs. Dalloway")) {
                      // 手动构建卡片视图的内容，包含两张图片
                      return (
                        <div className="literary-analysis">
                          <div className="analysis-section">
                            <div className="text-left text-white/90 mb-4">
                              "These triumphs... had a hollowness; at arm’s length they were, not in the heart; and it might be that she was growing old, but they satisfied her no longer as they used. "
                            </div>
                            {/* Mr Dalloway 没有分章节 */}                            
                          </div>
                          <div className="analysis-section">
                            <h4>{i18n.language === "zh" ? "作者参与出版" : "Author Participation in Publication"}</h4>
                            <ul>
                              <li>Virginia Woolf was deeply involved in the publication of Mrs Dalloway, including <strong>text arrangement</strong> and <strong>typography design</strong>, which ensured her <strong>experimental elements</strong> were conveyed precisely to the readers as she intended. </li>
                              <li>The sophisticated paragraph segmentation, stream-of-consciousness narration, and the multiple perspectives of narrative, together foregrounded characters’ <strong>psychology and subjective time experience</strong>. </li>
                              <li><strong>Woolf’s direct control over the medium aligned the publication form with the novel’s theme</strong>, reflecting postwar London’s social anxiety and psychological crisis of the individual.</li>
                            </ul>
                            <div className="mt-4 w-full">
                              <img
                                src={MrsDalloway}
                                alt="Mrs Dalloway"
                                className="w-full rounded-md shadow-lg mx-auto"
                              />
                              <div className="text-center mt-2 text-sm text-white/50">
                                Created by Doubao AI
                              </div>
                            </div>
                          </div>
                          {/* <div className="analysis-section">
                            <h4>{i18n.language === "zh" ? "审视社会的人" : "Discover Human as Psychological Being"}</h4>
                            <ul>
                              <li>{i18n.language === "zh" ? "探讨焦点转向内在世界" : "Focus shifts to the inner world"}</li>
                              <li>{i18n.language === "zh" ? "人的意识流动、记忆和创伤" : "Human consciousness flow, memory and trauma"}</li>
                              <li>{i18n.language === "zh" ? "深化复杂人性的认知" : "Deeper cognition of complex human nature"}</li>
                            </ul>
                            <div className="mt-4 w-full">
                              <img 
                              // TODO：不是这个图
                                src={Victorian} 
                                alt="Victorian Era" 
                                className="w-full rounded-md shadow-lg mx-auto" 
                              />
                              <div className="text-center mt-2 text-sm text-white/50">
                                 here for citation
                              </div>
                            </div>
                          </div> */}
                        </div>
                      );
                    }
                    // 为Lord of the Flies的子板块添加图片和注释（仅在卡片视图中显示）
                    else if (event.start_date.year === "1954" && event.text.headline.includes("Lord of the Flies")) {
                      // 手动构建卡片视图的内容，包含两张图片
                      return (
                        <div className="literary-analysis">
                          <div className="analysis-section">
                            <div className="text-left text-white/90 mb-4">
                              "Which is better--to have rules and agree, or to hunt and kill?"
                            </div>
                            <div className="text-right text-sm text-white/70">
                              (ch. XI, "<em>Castle Rock</em>")
                            </div>
                          </div>
                          <div className="analysis-section">
                            <h4>{i18n.language === "zh" ? "多媒体的冲突张力" : "The Multimedia Tension"}</h4>
                            <ul>
                              <li>William Golding's interaction with the film medium is presented as a tense antagonistic relationship. Golding preferred his own simplified treatment of the <strong>allegorical structure</strong>, and as a result, he felt that the film overemphasized the fable itself, reducing <strong>a profound thought experiment</strong> to an overly straightforward moral story.</li>
                              <li>This disapproval highlights Golding's core intention: his desert island is not a mere allegory of good and evil, but a <strong>sacred tragedy</strong> that reveals the inevitability of human fall, and its power stems from the psychological truth and abstract speculation constructed by words.</li>
                              <li>The author's struggle with the film adaptation of this <strong>"re-creation"</strong> instead defines and defends the unique medium of the original work: <strong>the power of the novel lies in its obscure and complex meaning that refuses to be completely tamed by the visuals.</strong></li>
                            </ul>
                            <div className="mt-4 w-full">
                              {/* TODO：换成视频？ */}
                              <img
                                src={LordOfTheFlies}
                                alt="Lord of the Flies"
                                className="w-full rounded-md shadow-lg mx-auto"
                              />
                              <div className="text-center mt-2 text-sm text-white/50">
                                {/* TODO：citation */} here for citation
                              </div>
                            </div>
                          </div>
                          {/* <div className="analysis-section">
                            <h4>{i18n.language === "zh" ? "直面罪恶的人" : "Confront Human as Sinful Creature"}</h4>
                            <ul>
                              <li>{i18n.language === "zh" ? "剥离社会，直接质问人的本性" : "Strip away the cloak of society to question human nature"}</li>
                              <li>{i18n.language === "zh" ? "二战后对启蒙时代\“理性人\”的颠覆" : "A direct objection to the Enlighenment \"rational man\""}</li>
                              <li>{i18n.language === "zh" ? "人性固有的黑暗与邪恶" : "Dissect the darkness and evilness inherent in human"}</li>
                            </ul>
                            <div className="mt-4 w-full">
                              <img 
                              // TODO：不是这个图
                                src={Victorian} 
                                alt="Victorian Era" 
                                className="w-full rounded-md shadow-lg mx-auto" 
                              />
                              <div className="text-center mt-2 text-sm text-white/50">
                                here for citation
                              </div>
                            </div>
                          </div> */}
                        </div>
                      );
                    }
                    // 为Klara and the Sun的子板块添加图片和注释（仅在卡片视图中显示）
                    else if (event.start_date.year === "2021" && event.text.headline.includes("Klara and the Sun")) {
                      // 手动构建卡片视图的内容，包含两张图片
                      return (
                        <div className="literary-analysis">
                          <div className="analysis-section">
                            <div className="text-left text-white/90 mb-4">
                              "Of course, a human heart is bound to be complex. But it must be limited."
                            </div>
                            <div className="text-right text-sm text-white/70">
                              (Part IX)
                            </div>
                          </div>
                          <div className="analysis-section">
                            <h4>{i18n.language === "zh" ? "数字阅读的媒体革命" : "Digital Reading for Revolutionary Change"}</h4>
                            <ul>
                              <li>As a contemporary literature of the 21st century, "Clara and the Sun" cleverly uses the characteristics of digital media to build <strong>a dynamic metatext ecosystem</strong>.</li>
                              <li><strong>The e-book replicates the logic of robot processing information through form.</strong> The frequent <strong>noun highlighting</strong> directly mimics Clara's visual perception pattern of labeling, classifying, and digitizing solid objects. In addition, the <strong>non-linear narrative jumps of e-book pages</strong> imitate flashbacks and juxtapositions of information fragments.</li>
                              <li>Once published, the work was quickly integrated into the secondary interpretation layer composed of <strong>online public forum discussions</strong>, and <strong>readers deeply participated</strong> in the interpretation of the theme (such as gene editing, AI ethics, what is love), and jointly extended the core of the story: <strong>How does modern technology shape the definition of life and love?</strong> The novel is no longer a closed text, but a continuous dialogue about technology and human nature, designed by the author, participated by readers, and supported by media forms.</li>
                            </ul>
                            <div className="mt-4 w-full">
                              <img
                                src={DigitalReading}
                                alt="Digital Reading"
                                className="w-full rounded-md shadow-lg mx-auto"
                              />
                              <div className="text-center mt-2 text-sm text-white/50">
                                <a href="https://zh.zlib.li/book/11747982/d33271/klara-and-the-sun.html" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline">
                                  Discussions and shared citations in an online community
                                </a>
                              </div>
                            </div>
                          </div>
                          {/* <div className="analysis-section">
                            <h4>{i18n.language === "zh" ? "回归自我的人" : "Confront Human as Sinful Creature"}</h4>
                            <ul>
                              <li>{i18n.language === "zh" ? "叙事权威赋予非人智能体" : "Non-human agents as the owner of narrative authority"}</li>
                              <li>{i18n.language === "zh" ? "爱与希望的独特性面临终极挑战" : "The uniqueness of human love and hope facing the ultimate trial"}</li>
                              <li>{i18n.language === "zh" ? "非人视角的反向质询：何为不可替代的\“人性\”\？" : "Through non-human perspective: What is irreplaceable \"humanity\"\?"}</li>
                            </ul>
                            <div className="mt-4 w-full">
                              <img 
                              // TODO：不是这个图
                                src={Victorian} 
                                alt="Victorian Era" 
                                className="w-full rounded-md shadow-lg mx-auto" 
                              />
                              <div className="text-center mt-2 text-sm text-white/50">
                                here for citation
                              </div>
                            </div>
                          </div> */}
                        </div>
                      );
                    }
                    return <div dangerouslySetInnerHTML={{ __html: localizedContent.text }} />;
                  })()}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
});

const EventCard = React.memo(function EventCard({
  event,
  position,
  row,
  totalRows,
  isHovered,
  onHover,
  rowHeight,
  setActiveEventPositions,
}) {
  const { i18n, t } = useTranslation();
  const localizedContent =
    i18n.language === "zh" && event.chinese ? event.chinese : event.text;
  // 检测文学分析内容
  const hasLiteraryAnalysis = localizedContent.text && localizedContent.text.includes('class="literary-analysis"');
  const categoryClass = event.category;
  const baseOpacity = (Math.min(event.importance + 0.15, 3) / 3) * 0.4 - 0.2;
  const contentRef = useRef(null);
  const expandedContentRef = useRef(null);
  const scrollableContentRef = useRef(null);
  const [width, setWidth] = useState(MIN_CARD_WIDTH);
  const [expandedHeight, setExpandedHeight] = useState(MIN_EXPANDED_HEIGHT);
  const [isNearEdge, setIsNearEdge] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(false);

  // 更新动态位置
  // 移除重复的状态更新，避免无限循环
  // 状态更新已经在鼠标事件处理函数中完成

  useEffect(() => {
    setWidth(MIN_CARD_WIDTH);
  }, [event.id]);

  // 检测是否靠近视口边缘
  useEffect(() => {
    if (!isHovered) return;

    const checkEdgeProximity = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const rightMargin = 40; // 右侧边距

      // 如果卡片右侧距离视口右侧不足一定距离，则认为靠近边缘
      const isEdge = rect.right > viewportWidth - rightMargin;
      setIsNearEdge(isEdge);
    };

    checkEdgeProximity();
    // 添加窗口调整大小监听
    window.addEventListener('resize', checkEdgeProximity);

    return () => {
      window.removeEventListener('resize', checkEdgeProximity);
    };
  }, [isHovered]);

  // 计算内容高度和宽度
  useLayoutEffect(() => {
    let mounted = true;
    if (contentRef.current && mounted) {
      const contentWidth = contentRef.current.offsetWidth;
      // 增加基础宽度以确保能完全容纳内部小卡片
      // 基于内容宽度加上内部小卡片所需的额外空间
      let newWidth = Math.max(MIN_CARD_WIDTH, contentWidth + INNER_CARD_PADDING);

      // 对于包含文学分析的事件，进一步增加宽度以容纳内部卡片
      if (hasLiteraryAnalysis) {
        newWidth += 60; // 为文学分析内部卡片额外增加宽度
      }

      // 如果靠近边缘，调整宽度以确保不超出视口
      if (isHovered && isNearEdge && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const rightMargin = 40;
        const maxAllowedWidth = viewportWidth - rect.left - rightMargin;
        newWidth = Math.min(newWidth, maxAllowedWidth);
      }

      setWidth(newWidth);

      // 计算内容总高度
      if (isHovered && expandedContentRef.current) {
        const headlineHeight = contentRef.current.offsetHeight;
        // 为3个子卡片设置足够的高度，每个子卡片大约140px，加上间距和底部空间
        const requiredHeight = 3 * 140 + 60; // 3个子卡片 + 间距
        setContentHeight(headlineHeight + requiredHeight);
        setExpandedHeight(Math.max(MIN_EXPANDED_HEIGHT, headlineHeight + requiredHeight + 20)); // 足够显示3个子卡片底部的高度
      }
    }
    return () => {
      mounted = false;
    };
  }, [event.text.headline, event.id, isHovered, isNearEdge, hasLiteraryAnalysis]);

  // 处理内部滚动和淡入淡出效果
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollableContentRef.current) return;

      const scrollEl = scrollableContentRef.current;
      const currentScrollTop = scrollEl.scrollTop;
      const scrollHeight = scrollEl.scrollHeight;
      const clientHeight = scrollEl.clientHeight;

      setScrollTop(currentScrollTop);

      // 显示/隐藏顶部淡入淡出效果
      setShowTopFade(currentScrollTop > 10);
      // 显示/隐藏底部淡入淡出效果
      setShowBottomFade(scrollTop < scrollHeight - clientHeight - 10);
    };

    const scrollEl = scrollableContentRef.current;
    if (scrollEl && isHovered) {
      scrollEl.addEventListener('scroll', handleScroll);
      handleScroll(); // 初始检查
    }

    return () => {
      if (scrollEl) {
        scrollEl.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isHovered, scrollTop]);

  // 让所有卡片最上端齐平且靠最上方，参考Robinson Crusoe的高度
  const topPos = TIME_MARKER_HEIGHT;

  // 卡片高度设置为足够显示3个子卡片
  const getCardHeight = () => {
    // 使用计算的内容高度
    return isHovered ? `${expandedHeight}px` : `${MIN_CARD_HEIGHT}px`;
  };

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  return (
    <motion.div
      ref={containerRef}
      className="event-card absolute"
      style={{
        left: isHovered && isNearEdge
          ? "auto"
          : `${position - 20}px`,
        right: isHovered && isNearEdge
          ? "20px"
          : "auto",
        top: `${topPos}px`,
        width: isHovered
          ? `${isNearEdge ? Math.min(width + 60, 600) : width + 60}px` // 增加宽度以容纳内部小卡片
          : `${width}px`,
        height: getCardHeight(),
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: isHovered ? Z_INDEX_HOVER : Z_INDEX_BASE,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{
        scale: 1.03,
        zIndex: Z_INDEX_HOVER,
      }}
      onMouseEnter={() => {
        onHover(event);
        setActiveEventPositions(new Set([position]));
      }}
      onMouseLeave={() => {
        onHover(null);
        setActiveEventPositions(new Set());
      }}
    >
      <div
        className={`
                    h-full rounded-lg border p-2 transition-all duration-200
                    ${isHovered ? "border-white/30" : "border-white/5"}
                    ${event.importance >= 2.5 ? "border-white/30" : ""}
                    ${isHovered ? "transform -translate-y-1" : ""}
                    ${categoryClass}
                    ${hasLiteraryAnalysis ? "literary-event" : ""}
                `}
        style={{
          backgroundColor: isHovered
            ? "rgba(58, 58, 102, 0.85)" // transparency 85%
            : `rgba(255, 255, 255, ${baseOpacity})`,
          backgroundImage: isHovered
            ? "radial-gradient(transparent 1px, rgba(255, 255, 255, 0.12) 1px)"
            : "radial-gradient(transparent 1px, rgba(255, 255, 255, 0.05) 1px)",
          backgroundSize: "4px 4px",
          WebkitMaskImage: isHovered
            ? "linear-gradient(rgb(0, 0, 0) 70%, rgba(0, 0, 0, 0) 100%)" // 底纹淡出
            : "linear-gradient(rgb(0, 0, 0) 60%, rgba(0, 0, 0, 0) 100%)",
          maskImage: isHovered
            ? "linear-gradient(rgb(0, 0, 0) 70%, rgba(0, 0, 0, 0) 100%)" // 底纹淡出
            : "linear-gradient(rgb(0, 0, 0) 60%, rgba(0, 0, 0, 0) 100%)",
          boxShadow: isHovered
            ? `
                            0 0 0 1px rgba(255, 255, 255, 0.1),
                            0 4px 6px -1px rgba(0, 0, 0, 0.2),
                            0 12px 24px -4px rgba(0, 0, 0, 0.5),
                            0 0 20px rgba(255, 255, 255, 0.1),
                            inset 0 0 20px rgba(255, 255, 255, 0.05)
                          `
            : "none",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="relative" ref={contentRef}>
          <div
            className={`
                            font-serif leading-snug mb-1 text-lg
                            ${isHovered ? "text-white" : "text-white/90"}
                        `}
            dangerouslySetInnerHTML={{ __html: localizedContent.headline }}
          />
          <div className="text-sm font-sans text-white/60 font-medium">
            {event.start_date.year} | {CATEGORY_NAMES[i18n.language === "zh" ? "Chinese" : "English"][event.category]}
          </div>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="relative mt-0"
              >
                {/* 可滚动内容区域 - 确保上端为作品标题，下端为最后一个卡片 */}
                <div
                  ref={scrollableContentRef}
                  className="text-sm font-sans text-white/80 overflow-y-auto pr-2"
                  style={{
                    wordBreak: 'break-word',
                    whiteSpace: 'normal',
                    height: "420px", // 增加高度确保显示第三个子卡片底部
                    // 隐藏滚动条但保留滚动功能
                    msOverflowStyle: 'none', // IE 和 Edge
                    scrollbarWidth: 'none', // Firefox
                    scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent'
                  }}
                  onScroll={handleScroll}
                >
                  {/* 使用内联样式实现滚动条隐藏 */}
                  <div style={{ display: 'none' }} className="scrollbar-hide">
                    {/* 隐藏滚动条的样式通过内联样式实现，避免运行时DOM引用问题 */}
                  </div>

                  {/* 内容区域 - 确保标题在滚动时保持可见性 */}
                  <div
                    ref={expandedContentRef}
                    style={{
                      // 确保内容有足够的底部空间，使最后一个卡片可以完全显示
                      paddingBottom: '60px',
                      // 进一步减少顶部内边距，使子卡片上移至与年份时代之间只相隔一行
                      paddingTop: '0px'
                    }}
                  >
                    {/* 特殊处理文学分析卡片，使用i18n翻译 */}
                    {localizedContent.headline.includes('Robinson Crusoe') ? (
                      <div className="literary-analysis">
                        <div className="analysis-section">
                          {/* 第一个子卡片留空 */}
                        </div>
                        <div className="analysis-section">
                          <h4>{t('cards.robinsonCrusoe.section2.title')}</h4>
                          <ul>
                            {t('cards.robinsonCrusoe.section2.points', { returnObjects: true }).map((point, i) => (
                              <li key={i}>{point}</li>
                            ))}
                          </ul>
                        </div>
                        {/* 注释掉第三个子卡片
                        <div className="analysis-section">
                          <h4>{t('cards.robinsonCrusoe.section3.title')}</h4>
                          <ul>
                            {t('cards.robinsonCrusoe.section3.points', { returnObjects: true }).map((point, i) => (
                              <li key={i}>{point}</li>
                            ))}
                          </ul>
                        </div>
                        */}
                      </div>
                    ) : localizedContent.headline.includes('Oliver Twist') ? (
                      <div className="literary-analysis">
                        <div className="analysis-section">
                          {/* 第一个子卡片留空 */}
                        </div>
                        <div className="analysis-section">
                          <h4>{t('cards.oliverTwist.section2.title')}</h4>
                          <ul>
                            {t('cards.oliverTwist.section2.points', { returnObjects: true }).map((point, i) => (
                              <li key={i}>{point}</li>
                            ))}
                          </ul>
                        </div>
                        {/* 注释掉第三个子卡片
                        <div className="analysis-section">
                          <h4>{t('cards.oliverTwist.section3.title')}</h4>
                          <ul>
                            {t('cards.oliverTwist.section3.points', { returnObjects: true }).map((point, i) => (
                              <li key={i}>{point}</li>
                            ))}
                          </ul>
                        </div>
                        */}
                      </div>
                    ) : localizedContent.headline.includes('Mrs Dalloway') ? (
                      <div className="literary-analysis">
                        <div className="analysis-section">
                          {/* 第一个子卡片留空 */}
                        </div>
                        <div className="analysis-section">
                          <h4>{t('cards.mrsDalloway.section2.title')}</h4>
                          <ul>
                            {t('cards.mrsDalloway.section2.points', { returnObjects: true }).map((point, i) => (
                              <li key={i}>{point}</li>
                            ))}
                          </ul>
                        </div>
                        {/* 注释掉第三个子卡片
                        <div className="analysis-section">
                          <h4>{t('cards.mrsDalloway.section3.title')}</h4>
                          <ul>
                            {t('cards.mrsDalloway.section3.points', { returnObjects: true }).map((point, i) => (
                              <li key={i}>{point}</li>
                            ))}
                          </ul>
                        </div>
                        */}
                      </div>
                    ) : localizedContent.headline.includes('Lord of the Flies') ? (
                      <div className="literary-analysis">
                        <div className="analysis-section">
                          {/* 第一个子卡片留空 */}
                        </div>
                        <div className="analysis-section">
                          <h4>{t('cards.lordOfTheFlies.section2.title')}</h4>
                          <ul>
                            {t('cards.lordOfTheFlies.section2.points', { returnObjects: true }).map((point, i) => (
                              <li key={i}>{point}</li>
                            ))}
                          </ul>
                        </div>
                        {/* 注释掉第三个子卡片
                        <div className="analysis-section">
                          <h4>{t('cards.lordOfTheFlies.section3.title')}</h4>
                          <ul>
                            {t('cards.lordOfTheFlies.section3.points', { returnObjects: true }).map((point, i) => (
                              <li key={i}>{point}</li>
                            ))}
                          </ul>
                        </div>
                        */}
                      </div>
                    ) : localizedContent.headline.includes('Klara and the Sun') ? (
                      <div className="literary-analysis">
                        <div className="analysis-section">
                          {/* 第一个子卡片留空 */}
                        </div>
                        <div className="analysis-section">
                          <h4>{t('cards.klaraAndTheSun.section2.title')}</h4>
                          <ul>
                            {t('cards.klaraAndTheSun.section2.points', { returnObjects: true }).map((point, i) => (
                              <li key={i}>{point}</li>
                            ))}
                          </ul>
                        </div>
                        {/* 注释掉第三个子卡片
                        <div className="analysis-section">
                          <h4>{t('cards.klaraAndTheSun.section3.title')}</h4>
                          <ul>
                            {t('cards.klaraAndTheSun.section3.points', { returnObjects: true }).map((point, i) => (
                              <li key={i}>{point}</li>
                            ))}
                          </ul>
                        </div>
                        */}
                      </div>
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: localizedContent.text }} />
                    )}
                  </div>
                </div>

                {/* 顶部淡入淡出效果 - 确保在滚动时作品标题不会突然出现 */}
                {showTopFade && (
                  <div
                    className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
                    style={{
                      // 渐变背景确保内容平滑过渡，匹配卡片背景色
                      background: 'linear-gradient(to bottom, rgba(58, 58, 102, 0.95), rgba(58, 58, 102, 0))',
                      zIndex: 20,
                      // 确保渐变效果自然
                      backgroundSize: '100% 100%'
                    }}
                  />
                )}

                {/* 底部淡入淡出效果 - 确保最后一个卡片滑出时有平滑过渡 */}
                {showBottomFade && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                    style={{
                      // 渐变背景确保内容平滑过渡，匹配卡片背景色
                      background: 'linear-gradient(to top, rgba(58, 58, 102, 0.95), rgba(58, 58, 102, 0))',
                      zIndex: 20,
                      // 确保渐变效果自然
                      backgroundSize: '100% 100%'
                    }}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
});

/* 
  Use React.memo on TimeMarker for the same reason.
*/
const TimeMarker = React.memo(function TimeMarker({ date, position }) {
  return (
    <div
      className="absolute top-0 h-full select-none pointer-events-none z-0"
      style={{ left: `${position}px` }}
    >
      <div className="relative">
        <div className="absolute top-0 text-sm font-sans text-white/40 font-medium whitespace-nowrap transform -translate-x-1/2">
          {date.getFullYear()}
        </div>
        <div className="absolute top-[30px] h-full border-l border-white/10" />
      </div>
    </div>
  );
});

const YearMarker = React.memo(function YearMarker({ year, position }) {
  return (
    <div
      className="absolute -bottom-14 select-none pointer-events-none z-0"
      style={{ left: `${position}px` }}
    >
      <div className="relative">
        <div
          className="
                        absolute text-xl font-sans text-white/60 font-medium
                        whitespace-nowrap transform -translate-x-1/2
                        year-glow
                    "
        >
          {year}
        </div>
        <div />
      </div>
    </div>
  );
});

const TickMarker = React.memo(function TickMarker({
  position,
  isYearTick,
  hasEvent,
  isActive,
  rowHeights,
}) {
  const lineHeight = rowHeights ? rowHeights : "500px";

  return (
    <div
      className="absolute select-none pointer-events-none z-0 -bottom-8"
      style={{ left: `${position}px` }}
    >
      <div className="relative">
        <div
          className={`
                        absolute left-0
                        ${isYearTick
              ? "border-l h-6 border-white/40"
              : "border-l h-3 border-white/20"
            }
                    `}
        />
        {hasEvent && (
          <>
            <div
              className={`
                                absolute w-[2px] transition-opacity duration-300
                                ${isActive
                  ? "bg-gradient-to-b from-white/10 via-white/20 to-white/20 opacity-100"
                  : "bg-gradient-to-b from-transparent via-white/10 to-white/20 opacity-30"
                }
                            `}
              style={{
                height: lineHeight,
                bottom: "4px",
                left: "3px",
                transform: "translateX(-50%)",
              }}
            />
            <div
              className={`
                                absolute w-[6px] h-[6px] bg-white/60 rounded-full -bottom-2
                                transition-all duration-300
                                ${isActive
                  ? "bg-white scale-150"
                  : "bg-white/60 scale-100"
                }
                            `}
              style={{ left: "0px" }}
            />
          </>
        )}
      </div>
    </div>
  );
});

export default function Timeline() {
  const { t } = useTranslation();

  const [activeCategories, setActiveCategories] = useState(() => {
    const categoriesRecord = {};
    Object.values(CATEGORIES).forEach((cat) => {
      categoriesRecord[cat] = true;
    });
    return categoriesRecord;
  });

  const [hoveredEvent, setHoveredEvent] = useState(null);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [zoomIndex, setZoomIndex] = useState(2);
  const [viewMode, setViewMode] = useState("timeline");
  const [isMobile, setIsMobile] = useState(false);
  // 修改为以10年为单位的像素计算
  const pixelsPerDecade = ZOOM_LEVELS[zoomIndex];
  const [activeEventPositions, setActiveEventPositions] = useState(new Set());
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setViewMode(isMobile ? "cards" : "timeline");
  }, [isMobile]);

  const toggleCategory = (category) => {
    setActiveCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // 调整时间范围，覆盖文学作品的年代跨度
  const START_YEAR = 1700;
  const END_YEAR = 2040;

  const events = useMemo(() => {
    return [...TIMELINE_DATA.events].sort((a, b) => {
      // 简化排序，只使用年份
      const yearA = parseInt(a.start_date.year);
      const yearB = parseInt(b.start_date.year);
      return yearA - yearB;
    });
  }, []);

  const rowCount = useMemo(() => {
    if (viewMode === "cards") {
      return BASE_ROW_COUNT_CARDS;
    }
    const dynamic = BASE_TIMELINE_ROWS + (3 - zoomIndex) * 2;
    return Math.min(MAX_ROW_COUNT, Math.max(dynamic, MIN_ROW_COUNT));
  }, [viewMode, zoomIndex]);

  const positionedEvents = useMemo(() => {
    const filteredEvents = events.filter(
      (event) => activeCategories[event.category]
    );

    // Instead of storing arrays of positions, store the "rightmost X" per row
    let rowRightEdges = Array(rowCount).fill(0);

    // 定义文学时代的顺序
    const categoryOrder = {
      [CATEGORIES.ENLIGHTENMENT]: 1,
      [CATEGORIES.VICTORIAN]: 2,
      [CATEGORIES.POST_WWI]: 3,
      [CATEGORIES.POST_WWII]: 4,
      [CATEGORIES.CONTEMPORARY]: 5
    };

    // Sort filtered events by ascending date and then by category (literary era)
    const sortedEvents = [...filteredEvents].sort((a, b) => {
      // 首先按年份排序
      const yearA = parseInt(a.start_date.year);
      const yearB = parseInt(b.start_date.year);
      const yearCompare = yearA - yearB;
      if (yearCompare !== 0) return yearCompare;

      // 同一年份按文学时代排序
      return (categoryOrder[a.category] || 999) - (categoryOrder[b.category] || 999);
    });

    return sortedEvents.map((event) => {
      // 计算基于10年的位置
      const eventYear = parseInt(event.start_date.year);
      // 计算从起始年份开始的10年数
      const decadesSinceStart = (eventYear - START_YEAR) / 10;
      // 计算位置，基于10年单位
      const position = decadesSinceStart * pixelsPerDecade;

      // Try to find the row with the best fit
      let chosenRow = 0;
      let bestRightEdge = Infinity;

      for (let i = 0; i < rowCount; i++) {
        // If this row's right edge is sufficiently behind this event's position, it won't overlap
        // We can allow some small buffer. Let's say 0.8 * MIN_CARD_WIDTH as a safety margin
        if (rowRightEdges[i] + MIN_CARD_WIDTH * 0.8 < position) {
          // This row is a viable candidate.
          // We choose the row that is the "most behind" but still doesn't overlap
          // so we fill from top to bottom, left to right.
          if (rowRightEdges[i] < bestRightEdge) {
            bestRightEdge = rowRightEdges[i];
            chosenRow = i;
          }
        }
      }

      // If we never updated bestRightEdge (still Infinity), it means no row was sufficiently behind.
      // So just pick whichever row has the smallest right edge, to minimize overlap
      if (bestRightEdge === Infinity) {
        let minRowIndex = 0;
        for (let i = 1; i < rowCount; i++) {
          if (rowRightEdges[i] < rowRightEdges[minRowIndex]) {
            minRowIndex = i;
          }
        }
        chosenRow = minRowIndex;
      }

      // Update that row's right edge. We'll assume a base width for the event.
      // A typical guess might be MIN_CARD_WIDTH to keep it simple, or you could try to store
      // event-specific widths in some array once they're rendered.
      rowRightEdges[chosenRow] = position + MIN_CARD_WIDTH;

      return {
        ...event,
        position,
        row: chosenRow,
        era: event.category // 添加文学时代标识便于分组显示
      };
    });
  }, [events, pixelsPerDecade, activeCategories, rowCount, CATEGORIES]);

  const timeMarkers = useMemo(() => {
    const markers = [];

    // 创建10年间隔的时间标记
    for (let year = START_YEAR; year <= END_YEAR; year += 10) {
      const date = new Date(year, 0, 1); // 使用每年的1月1日
      const decadesSinceStart = (year - START_YEAR) / 10;
      const position = decadesSinceStart * pixelsPerDecade;

      markers.push({
        date,
        position
      });
    }

    return markers;
  }, [pixelsPerDecade, START_YEAR, END_YEAR]);

  const yearMarkers = useMemo(() => {
    // 创建10年间隔的年份标记
    const markers = [];

    for (let year = START_YEAR; year <= END_YEAR; year += 10) {
      const decadesSinceStart = (year - START_YEAR) / 10;
      const position = decadesSinceStart * pixelsPerDecade;

      markers.push({
        year: year.toString(), // 使用字符串格式以便显示
        position
      });
    }

    return markers;
  }, [pixelsPerDecade, START_YEAR, END_YEAR]);

  const tickMarkers = useMemo(() => {
    const ticks = [];

    // Create a map of positions to row heights
    const positionToRowHeight = {};
    const totalHeight =
      rowCount * (ROW_HEIGHT + ROW_GAP) + TIME_MARKER_HEIGHT + 130;

    positionedEvents.forEach((event) => {
      const rowMiddle =
        event.row * (ROW_HEIGHT + ROW_GAP) +
        ROW_HEIGHT / 2 +
        TIME_MARKER_HEIGHT;
      // Subtract from total height to get the correct line height
      positionToRowHeight[event.position] = `${totalHeight - rowMiddle}px`;
    });

    // 为每个事件创建标记
    const eventYears = new Set(
      events.map(event => parseInt(event.start_date.year))
    );

    // 为每个事件的年份创建标记
    events.forEach(event => {
      const eventYear = parseInt(event.start_date.year);
      const decadesSinceStart = (eventYear - START_YEAR) / 10;
      const position = decadesSinceStart * pixelsPerDecade;

      ticks.push({
        position,
        isYearTick: false,
        hasEvent: true,
        isActive: activeEventPositions.has(position),
        rowHeight: positionToRowHeight[position],
      });
    });

    // 为每个10年间隔创建年份标记
    for (let year = START_YEAR; year <= END_YEAR; year += 10) {
      const decadesSinceStart = (year - START_YEAR) / 10;
      const position = decadesSinceStart * pixelsPerDecade;

      ticks.push({
        position,
        isYearTick: true,
        hasEvent: eventYears.has(year),
        isActive: activeEventPositions.has(position),
        rowHeight: positionToRowHeight[position],
      });
    }

    ticks.sort((a, b) => a.position - b.position);

    return ticks;
  }, [pixelsPerDecade, events, activeEventPositions, positionedEvents, rowCount, START_YEAR, END_YEAR]);

  const totalWidth = useMemo(() => {
    // 计算总宽度，基于10年单位
    const totalDecades = (END_YEAR - START_YEAR) / 10;
    return totalDecades * pixelsPerDecade + 200;
  }, [pixelsPerDecade, START_YEAR, END_YEAR]);

  const zoomIn = () => {
    setZoomIndex((prev) => (prev < ZOOM_LEVELS.length - 1 ? prev + 1 : prev));
  };
  const zoomOut = () => {
    setZoomIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || viewMode !== "timeline") return;

    const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        if (e.deltaY < 0) {
          setZoomIndex((prev) =>
            prev < ZOOM_LEVELS.length - 1 ? prev + 1 : prev
          );
        } else {
          setZoomIndex((prev) => (prev > 0 ? prev - 1 : prev));
        }
      } else {
        e.preventDefault();
        container.scrollLeft += e.deltaY;

        if (e.deltaX !== 0) {
          container.scrollLeft += e.deltaX;
        }
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [viewMode]);

  // Add this useEffect to set initial scroll position
  useEffect(() => {
    if (containerRef.current && viewMode === "timeline") {
      // Calculate position for 2022 using decades
      const targetYear = 2022;
      const decadesSinceStart = (targetYear - START_YEAR) / 10;
      const scrollPosition = decadesSinceStart * pixelsPerDecade;

      // Set the scroll position after a short delay to ensure the component is fully rendered
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollLeft = scrollPosition;
        }
      }, 100);
    }
  }, [viewMode, pixelsPerDecade, START_YEAR]);

  // For cards view, add initial scroll position
  useEffect(() => {
    if (viewMode === "cards") {
      // Find the first event from 2022
      const events2022Index = events.findIndex(
        (event) => event.start_date.year >= "2022"
      );
      if (events2022Index !== -1) {
        // Calculate approximate scroll position (assuming each card is about 300px tall)
        const scrollPosition = events2022Index * 300;
        window.scrollTo({
          top: scrollPosition,
          behavior: "instant",
        });
      }
    }
  }, [viewMode, events]);

  // Add mouse drag handlers
  useEffect(() => {
    const container = containerRef.current;
    if (!container || viewMode !== "timeline") return;

    const handleMouseDown = (e) => {
      setIsDragging(true);
      setStartX(e.pageX - container.offsetLeft);
      setScrollLeft(container.scrollLeft);
      container.style.cursor = "grabbing";
      container.style.userSelect = "none";
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      container.style.cursor = "grab";
      container.style.userSelect = "auto";
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    };

    const handleMouseLeave = () => {
      setIsDragging(false);
      container.style.cursor = "grab";
      container.style.userSelect = "auto";
    };

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [viewMode, isDragging, startX, scrollLeft]);

  return (
    <div className={`relative mx-auto max-w-[2000px] px-4 md:px-12 py-2`}>
      {viewMode === "timeline" && <div className="absolute inset-0" />}

      <div className="relative">
        <div className="py-4">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
            <div className="flex gap-2 flex-wrap">
              {Object.values(CATEGORIES).map((categoryKey) => (
                <button
                  key={categoryKey}
                  onClick={() => toggleCategory(categoryKey)}
                  className={`
                                        px-3 py-1 rounded-full text-sm font-sans transition-all backdrop-blur-[1px]
                                        ${activeCategories[categoryKey]
                      ? "bg-white/20 text-white"
                      : "bg-white/5 text-white/40"
                    }
                                        hover:bg-white/30
                                    `}
                >
                  {t(`periods.${categoryKey}`)}
                </button>
              ))}
            </div>

            <div className="flex gap-2 font-sans text-sm sm:ml-auto">
              <button
                className="bg-white/10 text-white px-4 py-1 my-auto rounded hover:bg-white/20 transition whitespace-nowrap backdrop-blur-[1px]"
                onClick={() =>
                  setViewMode(viewMode === "timeline" ? "cards" : "timeline")
                }
              >
                {viewMode === "timeline"
                  ? t("switchToCards")
                  : t("switchToTimeline")}
              </button>
              {viewMode === "timeline" && (
                <>
                  <button
                    className="bg-white/10 text-white px-4 py-1 my-auto rounded hover:bg-white/20 transition whitespace-nowrap backdrop-blur-[1px]"
                    onClick={zoomOut}
                  >
                    {t("zoomOut")}
                  </button>
                  <button
                    className="bg-white/10 text-white px-4 py-1 my-auto rounded hover:bg-white/20 transition whitespace-nowrap backdrop-blur-[1px]"
                    onClick={zoomIn}
                  >
                    {t("zoomIn")}
                  </button>
                  <span className="text-white/60 ml-2 my-auto">
                    {t("zoom", { value: pixelsPerDecade })}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {viewMode === "timeline" ? (
          <div
            ref={containerRef}
            className="relative mx-auto overflow-x-scroll timeline-container"
            style={{ cursor: "grab" }}
          >
            <div
              className="relative"
              style={{
                width: `${totalWidth}px`,
                height: `${rowCount * (ROW_HEIGHT + 10) +
                  TIME_MARKER_HEIGHT +
                  (rowCount - 1) * (ROW_GAP + 5)
                  }px`,
                padding: "0 2rem",
              }}
            >
              <div className="absolute inset-0 z-0">
                {timeMarkers.map((marker, index) => (
                  <TimeMarker
                    key={index}
                    date={marker.date}
                    position={marker.position}
                  />
                ))}
                {yearMarkers.map((marker, index) => (
                  <YearMarker
                    key={index}
                    year={marker.year}
                    position={marker.position}
                  />
                ))}
                {tickMarkers.map((marker, index) => (
                  <TickMarker
                    key={index}
                    position={marker.position}
                    isYearTick={marker.isYearTick}
                    hasEvent={marker.hasEvent}
                    isActive={marker.isActive}
                    rowHeights={marker.rowHeight}
                  />
                ))}
              </div>

              <div className="relative z-10">
                {positionedEvents.map((event, index) => (
                  <EventCard
                    key={`${event.id || Math.random().toString(36).substr(2, 9)}-${index}`}
                    event={event}
                    position={event.position}
                    row={event.row}
                    totalRows={rowCount}
                    isHovered={hoveredEvent === event}
                    onHover={setHoveredEvent}
                    rowHeight={ROW_HEIGHT}
                    setActiveEventPositions={setActiveEventPositions}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <CardsView
            events={events}
            activeCategories={activeCategories}
            hoveredEvent={hoveredEvent}
            setHoveredEvent={setHoveredEvent}
          />
        )}
      </div>
    </div>
  );
}