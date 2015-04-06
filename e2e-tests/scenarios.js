'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('chat app', function() {

  browser.get('index.html');

  it('should automatically redirect to /join when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/join");
  });


  describe('join', function() {

    beforeEach(function() {
      browser.get('index.html#/join');
    });


    it('should render join when user navigates to /join', function() {
      expect(element.all(by.css('[ng-view] h2')).first().getText()).
        toMatch(/Join Chat/);
    });

  });

});
