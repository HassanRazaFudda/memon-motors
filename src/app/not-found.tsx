import { Button } from "@/components/ui/button";
import { telHref } from "@/lib/business";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-start justify-center px-6 py-24 sm:px-10">
      <span className="font-display text-sm font-bold tracking-tight text-red">
        404
      </span>
      <h1 className="mt-2 font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
        That page took a wrong turn.
      </h1>
      <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
        The page you&apos;re looking for doesn&apos;t exist. Try the
        homepage, or call us directly.
      </p>
      <div className="mt-8 flex gap-3">
        <Button href="/" variant="primary">
          Back to homepage
        </Button>
        <Button href={telHref} variant="secondary">
          Call us
        </Button>
      </div>
    </section>
  );
}
