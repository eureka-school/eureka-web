import Image from "next/image";

interface Props {
  title: string;
  subtitle: string;
  href: string;
  src: string;
}

export default function LabCard({ title, subtitle, href, src }: Props) {
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl mx-auto">
      <figure>
        <Image src={src} alt={title} width={256} height={256} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{subtitle}</p>
        <div className="card-actions justify-end">
          <a href={href} className="btn btn-primary">
            Enter
          </a>
        </div>
      </div>
    </div>
  );
}
