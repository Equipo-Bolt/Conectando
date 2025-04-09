export default function RootLayout({
  borrador,
  esperandoRevision,
}: {
  borrador: React.ReactNode;
  esperandoRevision: React.ReactNode;
}) {
  let state = "borrador";

  let content;
  switch (state) {
    case "borrador":
      content = borrador;
      break;
    case "esperandoRevision":
      content = esperandoRevision;
      break;
    default:
      content = <p>No content available</p>;
      break;
  }

  return (
    <div>
      <div className="text-4xl font-bold">Mis Objetivos</div>
      {content}
    </div>
  );
}
