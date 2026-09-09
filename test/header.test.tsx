import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";

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

import Header from "@/components/ui/header";

test("header exposes a named navigation landmark and meaningful links", () => {
  render(<Header />);

  const navigation = screen.getByRole("navigation", {
    name: "Hauptnavigation",
  });
  expect(navigation).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: "Leistungen" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: "Kostenloses Erstgespräch" }),
  ).toBeInTheDocument();
});
