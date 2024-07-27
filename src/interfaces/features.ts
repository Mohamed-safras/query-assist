import { LucideProps } from "lucide-react";

export interface Features {
  name: String;
  description: string;
  icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}
