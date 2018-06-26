import { Computer } from '../computer/computer.model';

export class Company {

  id: number;
  name: string;
  description: string;
  image: string;
  computers: Computer[];

  constructor(company: any = {}) {
    const {
      id = 0,
      name = '',
      description = null,
      image = null,
      computers = []
    } = company;

    this.id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.computers = computers;
  }

}
