import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// Translation resources for English, Chinese and Spanish
const resources = {
  en: {
    translation: {
      switchToCards: "Switch to Cards",
      switchToTimeline: "Switch to Timeline",
      zoomOut: "Zoom Out",
      zoomIn: "Zoom In",
      zoom: "Zoom: {{value}}px/decade",
      footer: {
        createdBy: "© {{year}} 英国近现代文学'叙事权威'演变分析. Created by",
        and: "and",
        contributors: "Open-source contributors:",
      },
      loading: "Loading timeline...",
    },
  },
  zh: {
    translation: {
      switchToCards: "切换到卡片视图",
      switchToTimeline: "切换到时间轴",
      zoomOut: "缩小",
      zoomIn: "放大",
      zoom: "缩放：{{value}}px/十年",
      footer: {
        createdBy: "© {{year}} 英国近现代文学'叙事权威'演变分析。由",
        and: "和",
        contributors: "开源贡献者：",
      },
      loading: "正在加载时间轴...",
    },
  },
  es: {
    translation: {
      switchToCards: "Cambiar a Tarjetas",
      switchToTimeline: "Cambiar a Línea de Tiempo",
      zoomOut: "Alejar",
      zoomIn: "Acercar",
      zoom: "Zoom: {{value}}px/década",
      footer: {
        createdBy: "© {{year}} 英国近现代文学'叙事权威'演变分析. Creado por",
        and: "y",
        contributors: "Colaboradores de código abierto:",
      },
      loading: "Cargando línea de tiempo...",
    },
  },
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
