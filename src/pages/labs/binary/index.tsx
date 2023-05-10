import MainLayout from "@/components/layouts/main";
import Image from "next/image";
import { useEffect, useState } from "react";

const LightBulb = ({ on }: { on: boolean }) => (
  <Image
    width={96}
    height={96}
    src={
      on
        ? "https://eureka-school.s3.us-east-005.backblazeb2.com/light-on.png"
        : "https://eureka-school.s3.us-east-005.backblazeb2.com/light-off.png"
    }
    alt={on ? "light-on" : "light-off"}
  />
);

export default function Page() {
  const [num, setNum] = useState(8);
  const [lights, setLights] = useState(
    Array.from({ length: num }, (v, i) => false)
  );

  useEffect(() => {
    setLights(Array.from({ length: num }, (v, i) => false));
  }, [num]);

  const inNumber = lights.reduce((prevVal, curVal, curIdx) => {
    if (curVal) {
      const result =
        curIdx === 0 ? 2 ** (num - 1) : prevVal + 2 ** (num - curIdx - 1);
      return result;
    }
    return prevVal;
  }, 0);

  const inBinary = lights.reduce((prevVal, curVal, curIdx) => {
    const newDigit = curVal ? "1" : "0";
    const result = prevVal + newDigit;
    return result;
  }, "");
  return (
    <MainLayout>
      <link
        href="https://fonts.googleapis.com/css?family=Orbitron"
        rel="stylesheet"
        type="text/css"
      />

      <div className="overflow-x-auto mx-10">
        <table className="table max-w-lg mx-auto my-10">
          <tbody>
            <tr>
              <th>In ASCII</th>
              <td className="font-clock font-semibold">
                {String.fromCharCode(inNumber)}
              </td>
            </tr>

            <tr>
              <th>In Number</th>
              <td className="font-clock font-semibold">{inNumber}</td>
            </tr>
            <tr>
              <th>In Binary</th>
              <td className="font-clock font-semibold">{inBinary}</td>
            </tr>
          </tbody>
        </table>

        <div className="mx-auto max-w-xl my-10">
          <p className="text-2xl font-clock text-center my-5">
            <span className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content w-12 mx-auto items-center">
              <span className="countdown font-mono text-2xl">
                {/* @ts-ignore */}
                <span style={{ "--value": num }}></span>
              </span>
            </span>
            light bulb{num > 1 ? "s" : ""}
          </p>
          <input
            type="range"
            min="0"
            max="32"
            value={num}
            className="range range-primary"
            step="1"
            onChange={(e: any) => {
              setNum(parseInt(e.target.value));
            }}
          />
          <div className="w-full flex justify-between text-xs px-1">
            <span>0</span>
            {/* <span>8</span> */}
            <span>8</span>
            {/* <span>24</span> */}
            <span>16</span>
            {/* <span>40</span> */}
            <span>24</span>
            {/* <span>56</span> */}
            <span>32</span>
          </div>
        </div>
        <div className="max-w-6xl mx-auto my-10 grid grid-cols-8 gap-5">
          {lights.map((light, idx) => (
            <button
              key={`lightbulb-${idx}`}
              onClick={() => {
                const newLights = [...lights];
                newLights[idx] = !lights[idx];
                setLights(newLights);
              }}
            >
              <LightBulb on={light} />
            </button>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
