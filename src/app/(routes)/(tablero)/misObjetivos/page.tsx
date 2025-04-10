import Borrador from "../../../../components/Borrador";
import EsperandoRevision from "../../../../components/EsperandoRevision";

export default function Page() {
  const state = "borrador";

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

  return <>{content}</>;
}
