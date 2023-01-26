import { ITags } from "../types";

export function formatPredictible(
  partition: string,
  system: string,
  env: string,
  group: string,
  component: string
): string {
  return `${partition}-${system}-${env}-${group}-${component}`;
}

export function formatRessourceId(
  group: string,
  component: string,
  ...parts: string[]
): string {
  return `${group}-${component}${parts.length > 0 ? "-" : ""}${parts.join(
    "-"
  )}`;
}

export function formatSSMId(
  partition: string,
  system: string,
  env: string,
  group: string,
  component: string,
  ...parameterName: string[]
): string {
  return `/${partition}/${system}/${env}/${group}/${component}/${parameterName.join(
    "/"
  )}`;
}

export function formatTags(
  partition: string,
  system: string,
  env: string,
  group: string,
  component: string
): ITags {
  const result = {
    partition,
    system,
    group,
    component,
    env,
  };
  return result;
}
