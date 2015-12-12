describe('collapse directive', function() {
  var element, scope, $compile, $animate;

  beforeEach(module('ui.bootstrap.collapse'));
  beforeEach(module('ngAnimateMock'));
  beforeEach(inject(function(_$rootScope_, _$compile_, _$animate_) {
    scope = _$rootScope_;
    $compile = _$compile_;
    $animate = _$animate_;
  }));

  beforeEach(function() {
    element = $compile('<div uib-collapse="isCollapsed">Some Content</div>')(scope);
    angular.element(document.body).append(element);
  });

  afterEach(function() {
    element.remove();
  });

  it('should be hidden on initialization if isCollapsed = true', function() {
    scope.isCollapsed = true;
    scope.$digest();
    expect(element.height()).toBe(0);
  });

  it('should collapse if isCollapsed = true on subsequent use', function() {
    scope.isCollapsed = false;
    scope.$digest();
    $animate.flush();
    scope.isCollapsed = true;
    scope.$digest();
    $animate.flush();
    expect(element.height()).toBe(0);
  });

  it('should be shown on initialization if isCollapsed = false', function() {
    scope.isCollapsed = false;
    scope.$digest();
    $animate.flush();
    expect(element.height()).not.toBe(0);
  });

  it('should expand if isCollapsed = false on subsequent use', function() {
    scope.isCollapsed = false;
    scope.$digest();
    $animate.flush();
    scope.isCollapsed = true;
    scope.$digest();
    $animate.flush();
    scope.isCollapsed = false;
    scope.$digest();
    $animate.flush();
    expect(element.height()).not.toBe(0);
  });

  it('should expand if isCollapsed = true on subsequent uses', function() {
    scope.isCollapsed = false;
    scope.$digest();
    $animate.flush();
    scope.isCollapsed = true;
    scope.$digest();
    $animate.flush();
    scope.isCollapsed = false;
    scope.$digest();
    $animate.flush();
    scope.isCollapsed = true;
    scope.$digest();
    $animate.flush();
    expect(element.height()).toBe(0);
  });

  it('should change aria-expanded attribute', function() {
    scope.isCollapsed = false;
    scope.$digest();
    $animate.flush();
    expect(element.attr('aria-expanded')).toBe('true');

    scope.isCollapsed = true;
    scope.$digest();
    $animate.flush();
    expect(element.attr('aria-expanded')).toBe('false');
  });

  it('should change aria-hidden attribute', function() {
    scope.isCollapsed = false;
    scope.$digest();
    $animate.flush();
    expect(element.attr('aria-hidden')).toBe('false');

    scope.isCollapsed = true;
    scope.$digest();
    $animate.flush();
    expect(element.attr('aria-hidden')).toBe('true');
  });

  describe('dynamic content', function() {
    var element;

    beforeEach(function() {
      element = angular.element('<div uib-collapse="isCollapsed"><p>Initial content</p><div ng-show="exp">Additional content</div></div>');
      $compile(element)(scope);
      angular.element(document.body).append(element);
    });

    afterEach(function() {
      element.remove();
    });

    it('should grow accordingly when content size inside collapse increases', function() {
      scope.exp = false;
      scope.isCollapsed = false;
      scope.$digest();
      $animate.flush();
      var collapseHeight = element.height();
      scope.exp = true;
      scope.$digest();
      expect(element.height()).toBeGreaterThan(collapseHeight);
    });

    it('should shrink accordingly when content size inside collapse decreases', function() {
      scope.exp = true;
      scope.isCollapsed = false;
      scope.$digest();
      $animate.flush();
      var collapseHeight = element.height();
      scope.exp = false;
      scope.$digest();
      expect(element.height()).toBeLessThan(collapseHeight);
    });
  });
});

/* Deprecation tests below */

describe('collapse deprecation', function() {
  beforeEach(module('ui.bootstrap.collapse'));
  beforeEach(module('ngAnimateMock'));

  it('should suppress warning', function() {
    module(function($provide) {
      $provide.value('$collapseSuppressWarning', true);
    });

    inject(function($compile, $log, $rootScope) {
      spyOn($log, 'warn');

      var element = $compile('<div collapse="isCollapsed">Some Content</div>')($rootScope);
      $rootScope.$digest();

      expect($log.warn.calls.count()).toBe(0);
    });
  });

  it('should give warning by default', inject(function($compile, $log, $rootScope) {
    spyOn($log, 'warn');

    var element = $compile('<div collapse="isCollapsed">Some Content</div>')($rootScope);
    $rootScope.$digest();

    expect($log.warn.calls.count()).toBe(1);
    expect($log.warn.calls.argsFor(0)).toEqual(['collapse is now deprecated. Use uib-collapse instead.']);

  }));
});
