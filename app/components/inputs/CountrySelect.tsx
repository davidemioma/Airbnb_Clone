"use client";
import React from "react";
import Select from "react-select";
import useCountries from "../../hooks/useCountries";
import { CountryType } from "@/types";

interface Props {
  value?: CountryType;
  onChange: (value: CountryType) => void;
}

const CountrySelect = ({ value, onChange }: Props) => {
  const { getAll } = useCountries();

  return (
    <Select
      value={value}
      placeholder="Anywhere"
      isClearable
      options={getAll()}
      onChange={(value) => onChange(value as CountryType)}
      formatOptionLabel={(option) => (
        <div className="flex items-center gap-3 text-sm sm:text-base">
          <div>{option.flag}</div>

          <div>
            {option.label},{" "}
            <span className="ml-1 text-neutral-500">{option.region}</span>
          </div>
        </div>
      )}
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: "black",
          primary25: "#ffe4e6",
        },
      })}
    />
  );
};

export default CountrySelect;
