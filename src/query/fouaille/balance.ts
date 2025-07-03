import { useQuery } from "@tanstack/react-query"
import { ZodError } from "zod/v4";

import { Balance, BalanceSchema } from "@/schemas/fouaille/balance";

async function balanceFetcher(): Promise<Balance | null> {
  try {
    const payload = await fetch(
      "https://fouaille.bde-tps.fr/api/fouaille/balance",
      { headers: { "Content-Type": "application/json" } }
    ).then(res => res.json());

    const parsed = BalanceSchema.safeParse(payload);

    return parsed.data!;
  } catch (error) {
    if (error instanceof ZodError) {
      error.issues.map((e) => ({ path: e.path, message: e.message }));
      console.error(error);
    }

    console.error(error);
  }

  return null;
}

export function getBalance() {
  const { data } = useQuery({
    queryKey: ["balance"],
    queryFn: balanceFetcher
  })

  if (!data) {
    return null;
  }


  return data;
}
