import Image from "next/image";

const LOGOS = [
  { src: "/assets/image-10.png", alt: "design.coffee", width: 133, height: 70 },
  { src: "/assets/fiaplogo-1.png", alt: "FIAP", width: 70, height: 70 },
  { src: "/assets/helplinguaslogo-1.png", alt: "Help Línguas", width: 139, height: 61 },
  { src: "/assets/orbescorelogo-1.png", alt: "Orbes Core", width: 105, height: 70 },
];

export default function Companies() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-xl font-extrabold md:text-2xl">
          Empresas que confiam no nosso trabalho
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-10">
          {LOGOS.map((logo) => (
            <Image
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="h-[70px] w-auto object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
