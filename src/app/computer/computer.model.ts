import { Company } from '../company/company.model';

export class Computer {

  id?: number;
  name?: string;
  introduced?: Date;
  discontinued?: Date;
  company?: Company;

  constructor(computer: any = {}) {
    const {
      id = 0,
      name = '',
      introduced = null,
      discontinued = null,
      company = '',
      companyId = 0
    } = computer;

    this.id = id;
    this.name = name;
    this.introduced = Computer.fromArrayDate(introduced);
    this.discontinued = Computer.fromArrayDate(discontinued);
    this.company = new Company({id: companyId, name: company});
  }

  private static fromArrayDate(arrayDate: number[]): Date {
    if (arrayDate !== null) {
      const date = new Date();
      date.setFullYear(arrayDate[0], arrayDate[1] - 1, arrayDate[2]);
      return date;
    }
  }
}
