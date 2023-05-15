import MainLayout from "@/components/layouts/main";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export async function getStaticProps({}) {
  return {
    props: { wsUrl: process.env.WSURL }, // will be passed to the page component as props
  };
}

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

let socket: WebSocket;
export default function Page({ wsUrl }: { wsUrl: string }) {
  const [num, setNum] = useState(1);
  const [lights, setLights] = useState([false]);
  const initialized = useRef(false);

  const initializeWebsocket = () => {
    socket = new WebSocket(`${wsUrl}/ws/eureka/binary`, ["ws"]);
    console.log("socket setup", wsUrl);

    // Set up event listeners
    socket.addEventListener("open", () => {
      console.log("Connected to WebSocket server");
    });

    socket.addEventListener("message", (event) => {
      const message = event.data;
      const res = JSON.parse(message);
      console.log(res);
      setNum(res.num);
      setLights(res.lights);
    });

    socket.addEventListener("close", () => {
      console.log("Disconnected from WebSocket server");
    });

    if (socket && socket.readyState === socket.OPEN) {
      socket.send(JSON.stringify({ init: true }));
      // socket.send(JSON.stringify(message));
    }
  };
  useEffect(() => {
    if (!initialized.current) {
      initializeWebsocket();
      initialized.current = true;
    }

    return () => {
      if (socket.readyState === socket.OPEN) {
        socket.close();
      }
    };
  }, []);

  const sendMessage = (message: any) => {
    if (socket && socket.readyState === socket.OPEN) {
      socket.send(JSON.stringify(message));
    }
  };

  const onChangeNumber = (e: any) => {
    sendMessage({
      num: parseInt(e.target.value),
      lights: Array.from({ length: e.target.value }, (v, i) => false),
    });
  };

  const inNumber = lights.reduce((prevVal, curVal, curIdx) => {
    if (curVal) {
      const result =
        curIdx === 0 ? 2 ** (num - 1) : prevVal + 2 ** (num - curIdx - 1);
      return result;
    }
    return prevVal;
  }, 0);

  const inBinary = lights.map((v) => (v ? "1" : "0")).join(" ");
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
            onChange={onChangeNumber}
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
                sendMessage({ num, lights: newLights });
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
