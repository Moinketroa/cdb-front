import { Company } from '../company/company.model';

export class Computer {

  id: number;
  name: string;
  introduced: Date;
  discontinued: Date;
  company: Company;

}
