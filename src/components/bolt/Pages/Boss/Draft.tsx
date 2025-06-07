import { getFormIdByUserId } from "@/lib/fetches/form/getFormIdByUserId";
import { getObjectivesByFormId } from "@/lib/fetches/objective/getObjectivesByFormId";
import { getFormById } from "@/lib/fetches/form/getFormById";

import { FormObjectives } from "@/types/FormObjectives";

import ClientDraft from "@/components/bolt/Pages/Boss/ClientDraft";
interface ClientSentProps {
  userId: number;
}

export default async function Draft(props: ClientSentProps) {
  const userFormId = await getFormIdByUserId(Number(props.userId));
  const form = await getFormById(parseInt(userFormId));
  const data = (await getObjectivesByFormId(
    parseInt(userFormId)
  )) as FormObjectives[];

  return <ClientDraft form={form} initialData={data} />;
}
