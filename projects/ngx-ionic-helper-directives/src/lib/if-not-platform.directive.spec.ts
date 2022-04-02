import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';
import { IfNotPlatformDirective } from './if-not-platform.directive';

@Component({template: `<span *ngxIonicIfNotPlatform="'desktop'"></span>`})
class TestComponent {}

describe('IfNotPlatformDirective', () => {
  let dir: IfNotPlatformDirective;
  let platform: jasmine.SpyObj<Platform>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        IfNotPlatformDirective,
        TestComponent,
      ],
      providers: [
        {provide: Platform, useValue: jasmine.createSpyObj(['is'])},
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(TestComponent);
    const node = fixture.debugElement.queryAllNodes(By.directive(IfNotPlatformDirective))[0];
    dir = node.injector.get(IfNotPlatformDirective);
    platform = TestBed.inject(Platform) as jasmine.SpyObj<Platform>;

    dir['viewContainer'].createEmbeddedView = jasmine.createSpy('createEmbeddedView');
    dir['viewContainer'].clear = jasmine.createSpy('clear');
  });

  /**
   * Apply directive
   *
   * @conditions
   * * Platform not match
   * * View not rendered
   *
   * @expectations
   * Render view
   */
  it('should render a view when platform matched', () => {
    platform.is.and.returnValue(false);
    dir['hasView'] = false;

    dir.ngxIonicIfNotPlatform = 'desktop';
    expect(dir['viewContainer'].createEmbeddedView).toHaveBeenCalledTimes(1);
    expect(dir['hasView']).toBeTrue();
  });

  /**
   * Apply directive
   *
   * @conditions
   * * Platform match
   * * View already rendered
   *
   * @expectations
   * Clear view
   */
  it('should clear a view when platform not matched', () => {
    platform.is.and.returnValue(true);
    dir['hasView'] = true;

    dir.ngxIonicIfNotPlatform = 'desktop';
    expect(dir['viewContainer'].clear).toHaveBeenCalledTimes(1);
    expect(dir['hasView']).toBeFalse();
  });

  /**
   * Apply directive
   *
   * @conditions
   * * Platform not match
   * * View already rendered
   *
   * @expectations
   * Nothing processed
   */
  it('should do nothing when platform not matched and view not rendered', () => {
    platform.is.and.returnValue(false);
    dir['hasView'] = true;

    dir.ngxIonicIfNotPlatform = 'desktop';
    expect(dir['viewContainer'].createEmbeddedView).toHaveBeenCalledTimes(0);
    expect(dir['viewContainer'].clear).toHaveBeenCalledTimes(0);
    expect(dir['hasView']).toBeTrue();
  });

});
