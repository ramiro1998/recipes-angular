import { ElementRef } from '@angular/core';
import { BrokenImageDirective } from './broken-image.directive';

describe('BrokenImageDirective', () => {
  it('should create an instance', () => {
    const mockElement = new ElementRef('');
    const directive = new BrokenImageDirective(mockElement);
    expect(directive).toBeTruthy();
  });
});
