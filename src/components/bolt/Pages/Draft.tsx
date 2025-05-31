import ClientDraft from "./ClientDraft";
import { cookies } from "next/headers";

import { getFormIdByUserId } from "@/lib/fetches/form/getFormIdByUserId";
import { getObjectivesByFormId } from "@/lib/fetches/objective/getObjectivesByFormId";
import { getFormById } from "@/lib/fetches/form/getFormById";
import { FormObjectives } from "@/types/FormObjectives";

export default async function Draft() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  const formId = await getFormIdByUserId(Number(userId));
  const form = await getFormById(Number(formId));
  const data = (await getObjectivesByFormId(
    Number(formId)
  )) as FormObjectives[];

  return <ClientDraft form={form} initialData={data} />;
}
