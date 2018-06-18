import {Company} from './company/company.model';

export class Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;

  constructor(getPage: any) {
    this.content = getPage['content'];
    this.totalElements = getPage['totalElements'];
    this.totalPages = getPage['totalPages'];
    this.size = getPage['size'];
    this.number = getPage['number'];
  }
}
