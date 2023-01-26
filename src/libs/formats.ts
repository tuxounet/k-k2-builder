export function formatPredictible(
  partition: string,
  system: string,
  env: string,
  group: string,
  component: string
) {
  return `${partition}-${system}-${env}-${group}-${component}`;
}

export function formatRessourceId(
  group: string,
  component: string,
  ...parts: string[]
) {
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
) {
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
) {
  const result = {
    partition: partition,
    system: system,
    group: group,
    component: component,
    env: env,
  };
  return result;
}
