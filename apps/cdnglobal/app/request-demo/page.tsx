import type { Metadata } from "next";
import RequestDemoForm from "./RequestDemoForm";

export const metadata: Metadata = {
  title: "Request a Demo - CDN Global",
  description: "Request a demo for CDN Global products.",
};

export default function RequestDemoPage() {
  return <RequestDemoForm />;
}
