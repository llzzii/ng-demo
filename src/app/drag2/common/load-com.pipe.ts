import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HtmlList } from './htmlList';

@Pipe({
  name: 'loadCom',
})
export class LoadComPipe implements PipeTransform {
  private sanitizer: DomSanitizer;

  constructor(sanitizer: DomSanitizer) {
    this.sanitizer = sanitizer;
  }
  transform(data) {
    const res = '';
    if (data) {
      const frag = document.createDocumentFragment();
      const htmlList = new HtmlList(data.data);
      frag.append(htmlList[data.type]);
      return this.sanitizer.bypassSecurityTrustHtml(htmlList[data.type]);
    } else {
      return '--';
    }
  }
}
