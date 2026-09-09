import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

export default function Logo() {
  return <Link href="/" className="brand-mark" aria-label={`${siteConfig.name} Startseite`}><Image src="/images/AktenKompass-logo.svg" alt="" width={42} height={42} priority />{siteConfig.name}</Link>;
}
