import { AcademyCloudSync } from "@/components/academy/cloud-sync";

/** Every Academy page: keeps a signed-in learner's progress in their account. */
export default function AcademyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AcademyCloudSync />
      {children}
    </>
  );
}
