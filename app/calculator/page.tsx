"use client";

import { checkLogin } from "@/utils/login";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type Operator = "+" | "-" | null;

export default function CalculatorPage() {
  const router = useRouter();
  useEffect(() => checkLogin(router, "/calculator"), [router]);

  const [display, setDisplay] = useState("0");
  const [first, setFirst] = useState(0);
  const [operator, setOperator] = useState<Operator>(null);
  const [waitingForSecond, setWaitingForSecond] = useState(false);
  const [justEquals, setJustEquals] = useState(false);
  // remember last operation for repeat "=" (e.g. 1 + 1 = = = -> 2, 3, 4)
  const [lastOperator, setLastOperator] = useState<Operator>(null);
  const [lastOperand, setLastOperand] = useState(0);

  const clear = useCallback(() => {
    setDisplay("0");
    setFirst(0);
    setOperator(null);
    setWaitingForSecond(false);
    setJustEquals(false);
    setLastOperator(null);
    setLastOperand(0);
  }, []);

  const inputNumber = useCallback(
    (digit: string) => {
      setDisplay((current) => {
        if (waitingForSecond || justEquals) {
          setWaitingForSecond(false);
          setJustEquals(false);
          return digit;
        }
        if (current.replace(/\D/g, "").length >= 9) return current;
        return current === "0" ? digit : String(Number(current + digit));
      });
    },
    [waitingForSecond, justEquals],
  );

  const chooseOperator = useCallback(
    (nextOperator: Exclude<Operator, null>) => {
      const current = Number(display);
      if (operator && !waitingForSecond) {
        const result = operator === "+" ? first + current : first - current;
        setFirst(result);
        setDisplay(String(result));
      } else {
        setFirst(current);
      }
      setOperator(nextOperator);
      setWaitingForSecond(true);
      setJustEquals(false);
    },
    [display, first, operator, waitingForSecond],
  );

  const equals = useCallback(() => {
    if (operator) {
      // normal "=" : first (operator) second
      const second = waitingForSecond ? first : Number(display);
      const result = operator === "+" ? first + second : first - second;
      setDisplay(String(result));
      setFirst(result);
      setLastOperator(operator);
      setLastOperand(second);
      setOperator(null);
      setWaitingForSecond(false);
      setJustEquals(true);
    } else if (lastOperator) {
      // repeat "=" : apply last operation again to current display
      const current = Number(display);
      const result =
        lastOperator === "+" ? current + lastOperand : current - lastOperand;
      setDisplay(String(result));
      setFirst(result);
      setJustEquals(true);
    }
  }, [display, first, operator, waitingForSecond, lastOperator, lastOperand]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (/^[0-9]$/.test(event.key)) inputNumber(event.key);
      else if (event.key === "+" || event.key === "-")
        chooseOperator(event.key);
      else if (event.key === "Enter" || event.key === "=") {
        event.preventDefault();
        equals();
      } else if (event.key === "Escape") clear();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [inputNumber, chooseOperator, equals, clear]);

  const formatted = display.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const numberButton = (n: number) => (
    <button
      key={n}
      className="calc-key calc-purple"
      onClick={() => inputNumber(String(n))}
    >
      {n}
    </button>
  );
  const disabledKey = (label: string) => (
    <button
      key={label}
      className="calc-key calc-green calc-disabled-key"
      disabled
    >
      {label}
    </button>
  );
  const operatorButton = (label: string, value: Exclude<Operator, null>) => (
    <button
      key={label}
      className="calc-key calc-green"
      onClick={() => chooseOperator(value)}
    >
      {label}
    </button>
  );

  return (
    <section className="calc-page">
      <div className="calc-calculator">
        <div className="calc-outer">
          <div className="calc-inner">
            <div className="calc-screen" aria-live="polite">
              {formatted}
            </div>
            <div className="calc-row">
              {disabledKey("mc")}
              {disabledKey("mr")}
              {disabledKey("m+")}
              {disabledKey("m-")}
              <button className="calc-key calc-red" onClick={clear}>
                CE
              </button>
            </div>
            <div className="calc-row">
              {numberButton(7)}
              {numberButton(8)}
              {numberButton(9)}
              {disabledKey("÷")}
              {disabledKey("√")}
            </div>
            <div className="calc-row">
              {numberButton(4)}
              {numberButton(5)}
              {numberButton(6)}
              {disabledKey("×")}
              {disabledKey("%")}
            </div>
            <div className="calc-row">
              {numberButton(1)}
              {numberButton(2)}
              {numberButton(3)}
              {operatorButton("−", "-")}
              {disabledKey("1/x")}
            </div>
            <div className="calc-row">
              {numberButton(0)}
              {disabledKey(".")}
              {disabledKey("±")}
              {operatorButton("+", "+")}
              <button className="calc-key calc-green" onClick={equals}>
                =
              </button>
            </div>
          </div>
          <div className="calc-student">68071269 สิรวิชญ์ สัปทน</div>
        </div>
      </div>

      <style>{`
        .calc-page {
          min-height: 65vh;
          display: grid;
          place-items: center;
          padding: 24px 12px;
        }
        .calc-calculator {
          width: 270px;
          max-width: 100%;
          font-family: Arial, Helvetica, sans-serif;
        }
        .calc-outer {
          border: 3px solid #000;
          border-radius: 18px 18px 0 0;
          background: gray;
        }
        .calc-inner {
          border: 5px solid gray;
          border-radius: 15px;
          padding: 5px;
          background: linear-gradient(to bottom right, white, gray);
        }
        .calc-screen {
          box-sizing: border-box;
          height: 45px;
          margin-top: 25px;
          padding: 0 0.5rem 0.25rem;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          overflow: hidden;
          border: 1px solid #000;
          border-radius: 10px;
          background: rgb(230, 254, 251);
          font-size: 1.75rem;
          white-space: nowrap;
        }
        .calc-row {
          display: flex;
          gap: 3px;
          margin-top: 5px;
        }
        .calc-key {
          flex: 1 1 0;
          min-width: 0;
          height: 45px;
          padding: 0;
          border: 1px solid #555;
          border-radius: 10px;
          font-size: 1.2rem;
          font-weight: 700;
          cursor: pointer;
        }
        .calc-key:disabled {
          cursor: not-allowed;
          opacity: 0.9;
        }
        .calc-green {
          background: rgb(108, 192, 108);
        }
        .calc-red {
          background: red;
        }
        .calc-purple {
          background: rgb(186, 169, 218);
        }
        .calc-student {
          padding: 8px 0;
          color: rgb(224, 223, 223);
          text-align: center;
          font-family: monospace;
          font-size: 1.05rem;
        }
        .calc-disabled-key {
          background-color: #a8cfa8 !important;
          color: #5c7f5c !important;
          border-color: #86ad86 !important;
          opacity: 1 !important;
          filter: none !important;
          cursor: not-allowed;
        }
      `}</style>
    </section>
  );
}
