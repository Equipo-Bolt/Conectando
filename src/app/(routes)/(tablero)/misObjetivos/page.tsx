import Borrador from "../../../../components/Borrador";
import EsperandoRevision from "../../../../components/EsperandoRevision";

export default function Page() {
  const state: "borrador" | "esperandoRevision" = "borrador";

  let content;

  switch (state) {
    case "borrador":
      content = <Borrador />;
      break;
    case "esperandoRevision":
      content = <EsperandoRevision />;
      break;
    default:
      content = <p>No content available</p>;
      break;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-1.5">Mis Objetivos</h1>
      {content}
    </div>
  );
}
