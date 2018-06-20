export class Company {

  id: number;
  name: string;

  constructor(company: any = {}) {
    const {
      id = 0,
      name = ''
    } = company;

    this.id = id;
    this.name = name;
  }

}
