import { useEffect, useState } from 'react';

const SelectSymbol = ({ symbol, setSymbol }) => {
  const selectSymbol = (e) => {
    const sel = e.target.value;
    setSymbol(sel);
  };

//   useEffect(() => {
//     setSymbol(symbol);
//   }, [symbol, setSymbol]);
  return (
    <div>
      <label>투자 종목 선택하기</label>
      <select onChange={selectSymbol}>
        <option value="BTCUSDT">BTCUSDT</option>
        <option value="ETHUSD">ETHUSD</option>
        <option value="XRPUSDT">XRPUSDT</option>
        <option value="MATICUSDT">MATICUSDT</option>
      </select>
    </div>
  );
};

export default SelectSymbol;
