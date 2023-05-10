import React from "react";

const loading = () => {
  return (
    <div className="h-[70vh] w-screen flex items-center justify-center">
      <div className="w-20 h-20 rounded-full border-t border-l border-red-500 animate-spin" />
    </div>
  );
};

export default loading;
