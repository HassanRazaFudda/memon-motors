import { Reveal } from "@/components/motion/reveal";
import { ServiceCard } from "@/components/sections/service-card";
import { services } from "@/lib/business";

export function ServicesGrid() {
  return (
    <Reveal as="div" className="grid gap-5 sm:grid-cols-2" stagger={0.08}>
      {services.map((service) => (
        <ServiceCard key={service.slug} service={service} />
      ))}
    </Reveal>
  );
}
