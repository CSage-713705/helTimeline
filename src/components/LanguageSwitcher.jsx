import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (event) => {
    // 修改活动语言
    i18n.changeLanguage(event.target.value);
  };

  return (
    // 隐藏语言切换逻辑
    <div className="hidden bg-white/10 text-white px-4 mx-2 py-1 rounded hover:bg-white/20 transition whitespace-nowrap backdrop-blur-[1px] cursor-pointer">
      <select
        value={i18n.language}
        onChange={handleLanguageChange}
        // 与时间轴控制按钮样式相同
        className=" text-white bg-transparent focus:outline-none rounded  whitespace-nowrap "
      >
        <option value="en">English</option>
        <option value="zh">中文</option>
      </select>
    </div>
  );
}
