import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";

vi.mock("next/image", () => ({
  default: ({
    alt,
    className,
    src,
  }: {
    alt?: string;
    className?: string;
    src?: string | { src: string };
  }) => (
    // Test-only replacement for next/image; production uses next/image.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt ?? ""}
      className={className}
      src={typeof src === "string" ? src : src?.src}
    />
  ),
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    className,
    href,
    onClick,
  }: {
    children: ReactNode;
    className?: string;
    href: string;
    onClick?: () => void;
  }) => (
    <a className={className} href={href} onClick={onClick}>
      {children}
    </a>
  ),
}));

import Home from "@/app/(default)/page";

test("homepage renders its primary promise, CTA, and core content", () => {
  render(<Home />);

  expect(
    screen.getByRole("heading", {
      level: 1,
      name: "Weniger Papier. Mehr Zeit für Ihr Unternehmen.",
    }),
  ).toBeInTheDocument();

  const primaryCtas = screen.getAllByRole("link", {
    name: "Kostenloses Erstgespräch",
  });
  expect(primaryCtas.length).toBeGreaterThan(0);
  expect(primaryCtas[0]).toHaveAccessibleName("Kostenloses Erstgespräch");

  expect(
    screen.getByRole("heading", { name: "Kommt Ihnen das bekannt vor?" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", {
      name: "Digitale Lösungen, die zu Ihrem Unternehmen passen",
    }),
  ).toBeInTheDocument();
});
