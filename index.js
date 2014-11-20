'use strict';


/**
 * A fake reporter that acts as our test environment and exposes
 * a custom test container for each test case.
 */
function JasmineTestContainerSupport(parent, options) {

  parent.call(this, options);

  var currentSpec;

  this.specStarted = function(result) {
    currentSpec = result;

    var container = document.createElement('div');
    container.id = result.id + '-parent';
    container.style.margin = '10px -5px';
    container.style.border = 'solid 1px #888';
    container.classList.add('test-container');

    var header = document.createElement('h4');
    header.id = result.id + '-header';
    header.style.background = '#CCC';
    header.style.fontFamily = 'Monospace';
    header.style.padding = '5px';
    header.style.margin = 0;


    var headerLink = document.createElement('a');
    headerLink.innerText = result.fullName;
    headerLink.href = '#' + container.id;
    headerLink.style.color = 'inherit';
    headerLink.style.textDecoration = 'none';

    header.appendChild(headerLink);
    container.appendChild(header);

    var canvas = document.createElement('div');
    canvas.id = result.id + '-container';
    canvas.classList.add('result');
    container.appendChild(canvas);

    document.body.appendChild(container);
  };

  this.getTestContainer = function() {
    return document.getElementById(currentSpec.id + '-container');
  };

  this.specDone = function(result) {

    var indicator = document.createElement('div');
    indicator.innerText = result.status;

    var color = result.status === 'failed' ? 'red' : 'green';

    indicator.style.float = 'right';
    indicator.style.margin = '-5px';
    indicator.style.padding = '5px';

    var header = document.getElementById(result.id + '-header');
    var parent = document.getElementById(result.id + '-parent');

    header.appendChild(indicator);

    header.style.background = parent.style.borderColor = color;
    header.style.color = 'white';

    currentSpec = null;
  };
}

/**
 * Bootstraps the custom environment with the given
 * jasmine runner.
 *
 * @method JasmineTestContainerSupport.extend
 *
 * It extends the jasmine test environment with a #getTestContainer method.
 *
 * Use it in your test cases to get access to a local dom element for drawing.
 *
 * @example
 *
 * ```javascript
 * describe('mytest', function() {
 *
 *   var container;
 *
 *   beforeEach(function() {
 *     container = jasmine.getEnv().getTestContainer();
 *   });
 *
 *   it('can access container', function() {
 *     // we may draw on container now :o)
 *   });
 *
 * });
 * ```
 */
JasmineTestContainerSupport.extend = function(jasmine) {
  var BaseReporter = jasmine.JsApiReporter;

  var reporter = new JasmineTestContainerSupport(BaseReporter, {
    timer: new jasmine.Timer()
  });

  var env = jasmine.getEnv();

  env.addReporter(reporter);

  // monkey patch jasmine for AWESOME api additions
  env.getTestContainer = function() {
    return reporter.getTestContainer();
  };
};


// export for commonJS or browser (via window.JasmineTestContainerSupport)

if (module && module.exports) {
  module.exports = JasmineTestContainerSupport;
} else {
  window.JasmineTestContainerSupport = JasmineTestContainerSupport;
}