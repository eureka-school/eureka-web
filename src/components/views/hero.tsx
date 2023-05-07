import config from "@/lib/config.json";

export default function Hero() {
  return (
    <div
      className="hero min-h-[70vh]"
      style={{
        backgroundImage: `url("https://eureka-school.s3.us-east-005.backblazeb2.com/undraw_code_thinking.svg")`,
      }}
    >
      <div className="hero-overlay bg-opacity-40"></div>
      <div className="hero-content text-center text-neutral-100">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">{config.hero.title}</h1>
          <p className="mb-5"></p>
          <a href="/labs" className="btn btn-primary">
            Labs
          </a>
        </div>
      </div>
    </div>
  );
}
