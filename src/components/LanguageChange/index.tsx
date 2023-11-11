import React, { FC } from "react";
import { Select } from "antd";
import i18n from "i18next";

interface IProps {
  children?: React.ReactNode | React.ReactNode[];
}

const LANGUAGES: any = {
  en: { nativeName: "En" },
  ua: { nativeName: "Ua" },
};

export const LanguageChange: FC<IProps> = (): JSX.Element => {

  const langOptions: any[] = Object.keys(LANGUAGES)
    .map((lng) => ({ value: lng, label: LANGUAGES[lng].nativeName }));

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Select
      defaultValue={i18n.resolvedLanguage}
      style={{ width: 60 }}
      onChange={handleChange}
      options={langOptions}
    />
  );
};