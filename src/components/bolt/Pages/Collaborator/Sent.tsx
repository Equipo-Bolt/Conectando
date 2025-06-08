import ClientSent from "@/components/bolt/Pages/Collaborator/ClientSent";

import { auth } from "@/app/auth";

import { getFormIdByUserId } from "@/lib/fetches/form/getFormIdByUserId";
import { getObjectivesByFormId } from "@/lib/fetches/objective/getObjectivesByFormId";
import { getFormById } from "@/lib/fetches/form/getFormById";
import { FormObjectives } from "@/types/FormObjectives";

export default async function Sent() {
  const session = await auth();
  const userId = session?.user?.id;

  const formId = await getFormIdByUserId(Number(userId));
  const form = await getFormById(Number(formId));

  const data = (await getObjectivesByFormId(
    Number(formId)
  )) as FormObjectives[];

  return <ClientSent form={form} initialData={data} />;
}
