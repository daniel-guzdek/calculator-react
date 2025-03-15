import React, { useEffect, useState } from "react";
import { initialData } from "../data/initialData";
import Button from "./Button";
import { BsBackspace } from "react-icons/bs";
import { RiDivideFill } from "react-icons/ri";
import { FaSquareRootAlt } from "react-icons/fa";
import { handleAllClear } from "../handlers/handleAllClear";
import { handleNumber } from "../handlers/handleNumber";
import { handlePlus } from "../handlers/handlePlus";
import { handleEqual } from "../handlers/handleEqual";
import { handleBackspace } from "../handlers/handleBackspace";
import { handleMinus } from "../handlers/handleMinus";
import { handleMultiply } from "../handlers/handleMultiply";
import { handleDivide } from "../handlers/handleDivide";
import { handlePercentage } from "../handlers/handlePercentage";
import { handleReciprocal } from "../handlers/handleReciprocal";
import { handlePow } from "../handlers/handlePow";
import { handleSqrt } from "../handlers/handleSqrt";
import { handlePlusMinus } from "../handlers/handlePlusMinus";
import { handleComa } from "../handlers/handleComa";

const Calculator: React.FC = () => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (isNaN(data.result) || data.result === Infinity) {
      return setData({
        ...initialData,
        error: "Invalid input",
      });
    }
  }, [data]);

  return (
    <div className="wrapper">
      <h1 className="title">Calculator</h1>
      <h2 className="subtitle">[React.js TypeScript]</h2>
      <div className="calculator">
        <div className="output">
          <div className="equation-panel">{data.equation}</div>
          <div className="result-panel">{data.result}</div>
          <div className="error-panel">{data.error}</div>
        </div>
        <div className="input">
          <Button
            label="%"
            value="%"
            className="btn btn-fn btn-persentage"
            handler={() => handlePercentage(data, setData, "%")}
          />
          <Button
            label="1/x"
            value="1/x"
            className="btn btn-fn btn-reciprocal"
            handler={() => handleReciprocal(data, setData)}
          />
          <Button
            label="AC"
            value="AC"
            className="btn btn-fn btn-clear"
            handler={() => handleAllClear(initialData, setData)}
          />
          <Button
            label={<BsBackspace />}
            value={null}
            className="btn btn-fn"
            handler={() => setData(handleBackspace(data, setData))}
          />
          <Button
            label={
              <>
                x<sup>2</sup>
              </>
            }
            value={null}
            className="btn btn-fn btn-pow-2"
            handler={() => handlePow(data, setData, 2)}
          />
          <Button
            label={
              <>
                x<sup>3</sup>
              </>
            }
            value={null}
            className="btn btn-fn btn-pow-3"
            handler={() => handlePow(data, setData, 3)}
          />
          <Button
            label={<FaSquareRootAlt />}
            value={null}
            className="btn btn-fn btn-sqrt"
            handler={() => handleSqrt(data, setData)}
          />
          <Button
            label={<RiDivideFill />}
            value="/"
            className="btn btn-fn btn-divide"
            handler={() => handleDivide(data, setData, "/")}
          />
          <Button
            label="7"
            value={7}
            className="btn btn-number"
            handler={() => handleNumber(data, setData, 7)}
          />
          <Button
            label="8"
            value={8}
            className="btn btn-number"
            handler={() => handleNumber(data, setData, 8)}
          />
          <Button
            label="9"
            value={9}
            className="btn btn-number"
            handler={() => handleNumber(data, setData, 9)}
          />
          <Button
            label="x"
            value="*"
            className="btn btn-fn btn-multiply"
            handler={() => handleMultiply(data, setData, "*")}
          />
          <Button
            label="4"
            value={4}
            className="btn btn-number"
            handler={() => handleNumber(data, setData, 4)}
          />
          <Button
            label="5"
            value={5}
            className="btn btn-number"
            handler={() => handleNumber(data, setData, 5)}
          />
          <Button
            label="6"
            value={6}
            className="btn btn-number"
            handler={() => handleNumber(data, setData, 6)}
          />
          <Button
            label="-"
            value="-"
            className="btn btn-fn btn-minus"
            handler={() => handleMinus(data, setData, "-")}
          />
          <Button
            label="1"
            value={1}
            className="btn btn-number"
            handler={() => handleNumber(data, setData, 1)}
          />
          <Button
            label="2"
            value={2}
            className="btn btn-number"
            handler={() => handleNumber(data, setData, 2)}
          />
          <Button
            label="3"
            value={3}
            className="btn btn-number"
            handler={() => handleNumber(data, setData, 3)}
          />
          <Button
            label="+"
            value="+"
            className="btn btn-fn btn-plus"
            handler={() => handlePlus(data, setData, "+")}
          />
          <Button
            label="+/-"
            value={null}
            className="btn btn-plus-minus"
            handler={() => handlePlusMinus(data, setData)}
          />
          <Button
            label="0"
            value={0}
            className="btn btn-number"
            handler={() => handleNumber(data, setData, 0)}
          />

          <Button
            label="."
            value="."
            className="btn btn-coma"
            handler={() => handleComa(data, setData)}
          />
          <Button
            label="="
            value="="
            className="btn btn-fn btn-equals"
            handler={() => handleEqual(data, setData)}
          />
        </div>
      </div>
    </div>
  );
};

export default Calculator;
