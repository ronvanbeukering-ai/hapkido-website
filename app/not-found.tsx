import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center">
      <div className="container-x text-center py-24">
        <div className="font-[family-name:var(--font-display)] text-[8rem] md:text-[12rem] text-[color:var(--color-accent-500)] leading-none">
          404
        </div>
        <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl mt-2">
          Deze techniek kennen we nog niet
        </h1>
        <p className="text-[color:var(--color-muted)] mt-4 max-w-md mx-auto">
          De pagina die je zocht bestaat niet of is verplaatst. Geen probleem, gebruik onderstaande knop om terug te keren.
        </p>
        <Link href="/" className="btn-primary mt-8 inline-flex">
          Terug naar home
        </Link>
      </div>
    </section>
  );
}
