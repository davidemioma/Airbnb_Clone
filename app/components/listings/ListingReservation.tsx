"use client";
import React from "react";
import { Range } from "react-date-range";
import Calender from "../inputs/Calender";
import Button from "../Button";

interface Props {
  dateRange: Range;
  price: number;
  totalPrice: number;
  disabled: boolean;
  disabledDate: Date[];
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
}

const ListingReservation = ({
  dateRange,
  price,
  totalPrice,
  disabled,
  disabledDate,
  onChangeDate,
  onSubmit,
}: Props) => {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
      <div className="flex items-center gap-1 p-4">
        <p className="font-semibold text-2xl">$ {price}</p>

        <p className="font-light text-neutral-500">night</p>
      </div>

      <hr />

      <Calender
        value={dateRange}
        disabledDates={disabledDate}
        onChange={(value) => onChangeDate(value.selection)}
      />

      <hr />

      <div className="p-4">
        <Button label="Reserve" disabled={disabled} onClick={onSubmit} />
      </div>

      <div className="flex items-center justify-between p-4 font-semibold text-lg">
        <p>Total</p>

        <p>$ {totalPrice}</p>
      </div>
    </div>
  );
};

export default ListingReservation;
