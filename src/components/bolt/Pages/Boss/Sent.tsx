import { getFormIdByUserId } from "@/lib/fetches/form/getFormIdByUserId";
import { getObjectivesByFormId } from "@/lib/fetches/objective/getObjectivesByFormId";
import { getFormById } from "@/lib/fetches/form/getFormById";

import { FormObjectives } from "@/types/FormObjectives";

import ClientSent from "@/components/bolt/Pages/Boss/ClientSent";
interface ClientSentProps {
  userId: number;
}

export default async function Feedback(props: ClientSentProps) {
  const userFormId = await getFormIdByUserId(Number(props.userId));
  const form = await getFormById(parseInt(userFormId));
  const data = (await getObjectivesByFormId(
    parseInt(userFormId)
  )) as FormObjectives[];

  return <ClientSent form={form} initialData={data} />;
}
