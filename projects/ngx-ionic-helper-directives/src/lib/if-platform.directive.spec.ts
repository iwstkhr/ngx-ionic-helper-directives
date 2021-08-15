import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';
import { IfPlatformDirective } from './if-platform.directive';

@Component({template: `<span *ngxIonicIfPlatform="'desktop'"></span>`})
class TestComponent {}

describe('IfPlatformDirective', () => {
  let dir: IfPlatformDirective;
  let platform: jasmine.SpyObj<Platform>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        IfPlatformDirective,
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
    const node = fixture.debugElement.queryAllNodes(By.directive(IfPlatformDirective))[0];
    dir = node.injector.get(IfPlatformDirective);
    platform = TestBed.inject(Platform) as jasmine.SpyObj<Platform>;

    dir['viewContainer'].createEmbeddedView = jasmine.createSpy('createEmbeddedView');
    dir['viewContainer'].clear = jasmine.createSpy('clear');
  });

  /**
   * Apply directive
   *
   * @conditions
   * * Platform match
   * * View not rendered
   *
   * @expectations
   * Render view
   */
  it('should render a view when platform matched', () => {
    platform.is.and.returnValue(true);
    dir['hasView'] = false;

    dir.ngxIonicIfPlatform = 'desktop';
    expect(dir['viewContainer'].createEmbeddedView).toHaveBeenCalledTimes(1);
    expect(dir['hasView']).toBeTrue();
  });

  /**
   * Apply directive
   *
   * @conditions
   * * Platform not match
   * * View already rendered
   *
   * @expectations
   * Clear view
   */
  it('should clear a view when platform not matched', () => {
    platform.is.and.returnValue(false);
    dir['hasView'] = true;

    dir.ngxIonicIfPlatform = 'desktop';
    expect(dir['viewContainer'].clear).toHaveBeenCalledTimes(1);
    expect(dir['hasView']).toBeFalse();
  });

  /**
   * Apply directive
   *
   * @conditions
   * * Platform match
   * * View already rendered
   *
   * @expectations
   * Nothing processed
   */
  it('should do nothing when platform not matched and view not rendered', () => {
    platform.is.and.returnValue(true);
    dir['hasView'] = true;

    dir.ngxIonicIfPlatform = 'desktop';
    expect(dir['viewContainer'].createEmbeddedView).toHaveBeenCalledTimes(0);
    expect(dir['viewContainer'].clear).toHaveBeenCalledTimes(0);
    expect(dir['hasView']).toBeTrue();
  });

});
