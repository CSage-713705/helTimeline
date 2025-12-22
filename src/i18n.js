import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// Translation resources for English, Chinese and Spanish
const resources = {
  en: {
    translation: {
      switchToCards: "Switch to Cards",
        switchToTimeline: "Switch to Timeline",
        reference: "References",
      zoomOut: "Zoom Out",
      zoomIn: "Zoom In",
      zoom: "Zoom: {{value}}px/decade",
      footer: {
        createdBy: "© {{year}}. Source code created by",
        and: "and",
        contributors: "Open-source contributors:",
      },
      loading: "Loading timeline...",
      periods: {
        Enlightenment: "Enlightenment",
        Victorian: "Victorian",
        Modernism: "Modernism",
        "Post-WWII": "Post-WWII",
        Contemporary: "Contemporary"
      },
      cards: {
        robinsonCrusoe: {
          section2: {
            title: "Paratexts and Constructed Authorial Persona",
            points: [
              "Interaction between narrative and paratexts",
              "Realistic style and \“constructed author\”"
            ]
          },
          section3: {
            title: "Define Human as Rational Individual",
            points: [
              "Transformation and conquest of the external world",
              "\"Economic man\" as a rational subject"
            ]
          }
        },
        oliverTwist: {
          section2: {
            title: "Combination of Writer and Illustrator",
            points: [
              "Combination of narrative and visual art",
              "The influence on public reception of social realism"
            ]
          },
          section3: {
            title: "Examine Human as Social Elements",
            points: [
              "Social structure, class and system in industrial age",
              "Human morality and destiny being reshaped"
            ]
          }
        },
        mrsDalloway: {
          section2: {
            title: "Author Participation in Publication",
            points: [
              "Author's own thoughts and ideas for real presentation:",
              "Stream of consciousness",
              "Internal reality",
              "Multiple focalization"
            ]
          },
          section3: {
            title: "Discover Human as Psychologic Being",
            points: [
              "Focus shifts to the inner world",
              "Human consciousness flow, memory and trauma in World War I",
              "Deeper cognition of complex human nature"
            ]
          }
        },
        lordOfTheFlies: {
          section2: {
            title: "The Multimedia Tension",
            points: [
              "The limitation in sophistication of visual form",
              "The abstract, multi-layered meanings within language"
            ]
          },
          section3: {
            title: "Confront Human as Sinful Creature",
            points: [
              "Strip away the cloak of society to question human nature",
              "A direct objection to the Enlightenment \"rational man\" after World War II",
              "Dissect the darkness and evilness inherent in human"
            ]
          }
        },
        klaraAndTheSun: {
          section2: {
            title: "Dynamic meta-textual ecosystem of digital media",
            points: [
              "Digital interface and online community",
              "The co-construction of the novel theme in digital era"
            ]
          },
          section3: {
            title: "Rediscover Human as Yearning Self",
            points: [
              "Non-human agents as the owner of narrative authority",
              "The uniqueness of human love and hope facing the ultimate trial",
              "Through non-human perspective: What is irreplaceable humanity?"
            ]
          }
        }
      }
    }
  },
  zh: {
    translation: {
      switchToCards: "切换到卡片视图",
      switchToTimeline: "切换到时间轴",
      reference: "参考文献",
      zoomOut: "缩小",
      zoomIn: "放大",
      zoom: "缩放：{{value}}px/十年",
      footer: {
        createdBy: "© {{year}}. 源代码由",
        and: "和",
        contributors: "开源贡献者：",
      },
      loading: "正在加载时间轴...",
      periods: {
        Enlightenment: "启蒙时代",
        Victorian: "维多利亚时代",
        Modernism: "现代主义",
        "Post-WWII": "二战后",
        Contemporary: "当代"
      },
      cards: {
        robinsonCrusoe: {
          section2: {
            title: "叙事权威的垄断",
            points: [
              "纪实写作手法",
              "\"虚构作者\"：副文本"
            ]
          },
          section3: {
            title: "定义理性的人",
            points: [
              "重塑与征服外在世界",
              "作为理性主体的\"经济人\""
            ]
          }
        },
        oliverTwist: {
          section2: {
            title: "叙事权威的批判性集中",
            points: [
              "社会写实与历史背景",
              "典型人物",
              "全知视角"
            ]
          },
          section3: {
            title: "审视社会的人",
            points: [
              "工业时代的社会结构、阶级和制度",
              "人类道德和命运的重塑"
            ]
          }
        },
        mrsDalloway: {
          section2: {
            title: "叙事权威的内化与分散",
            points: [
              "意识流",
              "内在真实",
              "多重聚焦"
            ]
          },
          section3: {
            title: "发现心理的人",
            points: [
              "探讨焦点转向内在世界",
              "人的意识流动、记忆与一战的创伤",
              "深化复杂人性的认知"
            ]
          }
        },
        lordOfTheFlies: {
          section2: {
            title: "叙事权威的哲学化迁移",
            points: [
              "寓言结构",
              "思想实验",
              "神圣悲剧"
            ]
          },
          section3: {
            title: "直面罪恶的人",
            points: [
              "剥离社会，直接质问人的本性",
              "二战后对启蒙时代\“理性人\”的颠覆",
              "人性固有的黑暗与邪恶"
            ]
          }
        },
        klaraAndTheSun: {
          section2: {
            title: "叙事权威的扩散",
            points: [
              "后人类视角",
              "科技爆发与价值观危机"
            ]
          },
          section3: {
            title: "回归自我的人",
            points: [
              "叙事权威赋予非人智能体",
              "爱与希望的独特性面临终极挑战",
              "非人视角的反向质询：何为不可替代的\“人性\”\？"
            ]
          }
        }
      }
    }
  }
};
i18n
  .use(initReactI18next) // Integrates with React
  .init({
    resources,
    lng: "en", // Default language is English
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
  });
export default i18n;