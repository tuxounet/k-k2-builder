export interface IStackProps extends Record<string, unknown> {
  partition: string;
  system: string;
  env: string;
  group: string;
  component: string;
  prod: string;
}
