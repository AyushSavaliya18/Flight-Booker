export default function PolicyPage({ title }: { title: string }) {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 dark:text-white">{title}</h1>
      <div className="prose dark:prose-invert max-w-none text-muted-foreground space-y-6">
        <p>This is the official {title.toLowerCase()} for SkyBook. Please read carefully.</p>
        <h2 className="text-2xl font-bold text-foreground">1. Overview</h2>
        <p>Our commitment to transparency ensures you have the best travel experience.</p>
        <h2 className="text-2xl font-bold text-foreground">2. Details</h2>
        <p>Standard industry practices apply to all transactions and user interactions on our platform.</p>
      </div>
    </div>
  );
}
