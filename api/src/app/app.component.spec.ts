import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should request notify every 1min', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    spyOn(app['http'], 'post').and.returnValue(of({}))
    app.ngOnInit()
    tick(100000)

    expect(app['http'].post).toHaveBeenCalled();
  }))
});
