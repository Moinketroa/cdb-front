import {Company} from './company/company.model';

export class Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;

  constructor(getPage: any) {
    const page = new Page<Company>();
    page.content = getPage['content'];
    page.totalElements = getPage['totalElements'];
    page.totalPages = getPage['totalPages'];
    page.size = getPage['size'];
    page.number = getPage['number'];
  }
}
