import {Directive, ElementRef, HostListener, Output, EventEmitter} from '@angular/core';
@Directive({
  selector: '[ccMarkDown]'
})

export class CcMarkDownDirective {

  constructor(private element: ElementRef) {}
  star = '**'; slash = '//'; bracketStart = '[['; bracketClose = ']]'; pipeOperator = '|';
  buttonIdList = ['linkButton'];
  input: string;
  @Output()
  valueChange: EventEmitter<string> = new EventEmitter<string>();
  /*@HostListener('window:click', ['$event'])
  onClick(event: KeyboardEvent) {
    let startIndex; let endIndex; let urlText; let urlArray = []; let url;
    if (this.buttonIdList.indexOf(event.target.id) !== -1) {
      this.input = this.element.nativeElement.value;
      startIndex = this.input.indexOf(this.bracketStart);
      endIndex = this.input.indexOf(this.bracketClose);
      urlText = this.input.substring(startIndex + 2, endIndex);
      urlArray = urlText.split(this.pipeOperator);
      url = '<a href="' + urlArray[0] + '">' + urlArray[1] + '</a>';
      this.input = this.input.replace(this.input.substring(startIndex, endIndex + 2), url);
      this.valueChange.emit(this.input);
    }
  }*/
  @HostListener('window:keyup')
  keyUp() {
    this.input = this.element.nativeElement.value;
    if (this.input) {
      this.getInnerHtml(this.input, this.star);
      this.getInnerHtml(this.input, this.slash);
      // this.getInnerHtml(this.input, this.bracketStart);
    }
    this.valueChange.emit(this.input);
  }
  getInnerHtml(input: string, character: string): void {
    let index;
    let indexesArray = [];
    index = input.indexOf(character);
    indexesArray.push(index);
    while (index >= 0) {
      index = input.indexOf(character, index + 1);
      if (index !== -1) {
        indexesArray.push(index);
      }
    }
    indexesArray = indexesArray.filter((data) => {
      return data !== -1;
    });
    if (indexesArray.length % 2 !== 0) {
      indexesArray.pop();
    }
    for (let i = 0; i < indexesArray.length; i++) {
      let newIndex; let startTag; let endTag;
      newIndex = this.input.indexOf(character);
      startTag = character === this.star ? '<strong>' : '<em>';
      endTag = character === this.star ? '</strong>' : '</em>';
      if (i % 2 === 0) {
        this.input = this.replaceBetween(newIndex, this.input, startTag);
      } else {
        this.input = this.replaceBetween(newIndex, this.input, endTag);
      }
    }
  }
  replaceBetween(start: number, originalString: string, insertString: string): string {
    return originalString.replace(originalString.substring(start, start + 2), insertString);
  }
}

