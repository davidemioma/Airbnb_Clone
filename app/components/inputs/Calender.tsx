"use client";
import React from "react";
import { Range, RangeKeyDict, DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface Props {
  value: Range;
  disabledDates?: Date[];
  onChange: (value: RangeKeyDict) => void;
}

const Calender = ({ value, disabledDates, onChange }: Props) => {
  return (
    <DateRange
      ranges={[value]}
      date={new Date()}
      rangeColors={["#262626"]}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      disabledDates={disabledDates}
    />
  );
};

export default Calender;
