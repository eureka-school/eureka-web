import MainLayout from "@/components/layouts/main";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import defaultConfig from "@/lib/config.json";
import { findPermutations } from "@/lib/helper";
import { Discovery } from "aws-sdk";

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
    priority={true}
  />
);

let socket: WebSocket;
export default function Page({ wsUrl }: { wsUrl: string }) {
  const [num, setNum] = useState(1);
  const [lights, setLights] = useState([false]);
  const [audio, setAudio] = useState<any>(null);
  const [showPermutations, setShowPermutations] = useState(true);
  const initialized = useRef(false);

  const initializeWebsocket = () => {
    socket = new WebSocket(`${wsUrl}/ws/eureka/binary`, ["wss"]);

    // Set up event listeners
    socket.addEventListener("open", () => {
      // console.log("Connected to WebSocket server");
    });

    socket.addEventListener("message", (event) => {
      const message = event.data;
      const res = JSON.parse(message);
      setNum(res.num);
      setLights(res.lights);
    });

    socket.addEventListener("close", () => {
      // console.log("Disconnected from WebSocket server");
    });

    if (socket && socket.readyState === socket.OPEN) {
      socket.send(JSON.stringify({ init: true }));
      // socket.send(JSON.stringify(message));
    }
  };
  useEffect(() => {
    if (!initialized.current) {
      initializeWebsocket();
      setAudio(new Audio("/click-button.mp3"));
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
  const metadata = {
    description: "Learn how data are made up of zeros and ones",
    image: defaultConfig.hero.backgroundImage,
    title: "Binary Labs",
    twitterCard: defaultConfig.hero.backgroundImage,
  };

  const possiblePermutations = findPermutations(num);
  return (
    <MainLayout metadata={metadata}>
      <link
        href="https://fonts.googleapis.com/css?family=Orbitron"
        rel="stylesheet"
        type="text/css"
      />

      <div className="overflow-x-auto md:mx-10 mx-5">
        <div className="card card-body bg-base-100 mt-5 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 gap-3">
            <span>In ASCII</span>
            <span className="font-clock font-semibold">
              {String.fromCharCode(inNumber)}
            </span>
            <span>In Number</span>
            <span className="font-clock font-semibold">{inNumber}</span>
            <span>In Binary</span>
            <span className="font-clock font-semibold">{inBinary}</span>
          </div>
        </div>

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
        <div className="max-w-6xl mx-auto my-10 grid grid-cols-4 md:grid-cols-8 gap-5">
          {lights.map((light, idx) => (
            <button
              key={`lightbulb-${idx}`}
              onClick={() => {
                const newLights = [...lights];
                newLights[idx] = !lights[idx];
                sendMessage({ num, lights: newLights });
                audio.play();
              }}
            >
              <LightBulb on={light} />
            </button>
          ))}
        </div>
        <div className="form-control max-w-xl mx-auto">
          <label className="label cursor-pointer">
            <span className="label-text">Show Possible Permutations</span>
            <input
              type="checkbox"
              className="toggle"
              checked={showPermutations}
              onChange={() => setShowPermutations(!showPermutations)}
            />
          </label>
        </div>
        {showPermutations && (
          <div className="text-center my-5">
            {possiblePermutations.map((arr, idx) => (
              <div key={`permutation-${idx}`}>
                <span className="mr-5 font-semibold">{idx + 1}.</span>
                {arr.join(" ")}
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
