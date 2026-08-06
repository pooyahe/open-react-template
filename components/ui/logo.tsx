import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Logo() {
  return <Link href="/" className="brand-mark" aria-label={`${siteConfig.name} Startseite`}><span className="brand-dot" aria-hidden="true" />{siteConfig.name}</Link>;
}
