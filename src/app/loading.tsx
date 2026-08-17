import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <Container className="py-24">
      <div className="mx-auto max-w-xl animate-pulse space-y-4" aria-hidden="true">
        <div className="h-3 w-24 rounded bg-white/10" />
        <div className="h-10 w-full rounded bg-white/10" />
        <div className="h-10 w-4/5 rounded bg-white/10" />
        <div className="h-24 w-full rounded bg-white/5" />
      </div>
      <p className="sr-only">Зареждане</p>
    </Container>
  );
}
