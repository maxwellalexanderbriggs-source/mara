import Image from "next/image";
import { Play } from "lucide-react";

type MediaFrameProps = {
  title: string;
  eyebrow: string;
  description: string;
  className?: string;
  imageSrc?: string;
  videoSrc?: string;
};

export function MediaFrame({ title, eyebrow, description, className = "", imageSrc = "/media/mara-poster.svg", videoSrc }: MediaFrameProps) {
  return (
    <figure className={`media-frame ${className}`}>
      <div className="media-visual">
        {videoSrc ? (
          <video autoPlay loop muted playsInline poster={imageSrc} aria-label={title}><source src={videoSrc} /></video>
        ) : (
          <Image src={imageSrc} alt="" fill priority sizes="(max-width: 900px) 92vw, 72vw" />
        )}
        <div className="media-wash" />
        <span className="play-mark" aria-hidden="true"><Play fill="currentColor" size={22} /></span>
      </div>
      <figcaption>
        <span>{eyebrow}</span>
        <div><h3>{title}</h3><p>{description}</p></div>
      </figcaption>
    </figure>
  );
}
