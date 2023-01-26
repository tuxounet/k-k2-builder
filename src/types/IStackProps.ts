export interface IStackProps extends Record<string, unknown> {
  partition: string;
  system: string;
  env: string;
  group: string;
  prod: boolean;
  dns: {
    root_domain: string;
    root_domain_prefix: string;
    root_hostedzone_id: string;
    root_hostedzone_name: string;
    global_region: string;
  };
}
