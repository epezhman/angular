'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('chat app', function() {

  browser.get('index.html');

  it('should automatically redirect to /login when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/login");
  });


  describe('join', function() {

    beforeEach(function() {
      browser.get('index.html#/login');
    });


    it('should render login when user navigates to /login', function() {
      expect(element.all(by.css('[ng-view] h2')).first().getText()).
        toMatch(/Join Chat/);
    });

  });

});
