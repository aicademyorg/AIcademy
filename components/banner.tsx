import { Banner } from "fumadocs-ui/components/banner";
import Link from "next/link";

export function SiteBanner() {
  return (
    <Banner id="close">
      <Link
        href="https://github.com/aicademyorg/AIcademy"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center"
      >
        Give AIcademy a star on GitHub!
      </Link>
    </Banner>
  );
}
