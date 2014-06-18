# jasmine-test-container-support

This is an extension for [jasmine](jasmine.github.io/2.0/introduction.html) that provides per-spec test containers, i.e. `<div />` DOM elements.

## Features

The library provides a test container with a caption for each spec.
Links and conditional coloring for successful or failed tests are included.

![jasmine-test-container-support in action](https://raw.githubusercontent.com/bpmn-io/jasmine-test-container-support/master/docs/screenshot.png "Screenshot of the test container on bpmn-js")

The screenshot shows the container being used during SVG rendering test for [bpmn-js](https://github.com/bpmn-io/bpmn-js).


## Usage

Get the test container support extend jasmine with it before running the test suite.

```javascript
var JasmineTestContainerSupport = window.JasmineTestContainerSupport || require('jasmine-test-container-support');

JasmineTestContainerSupport.extend(jasmine);
```

The container support extends the jasmine test environment with a `#getTestContainer()` method.
Use it in your tests to locate a per spec test container that your test cases may draw in.

```javascript
describe('mytest', function() {

  var container;

  beforeEach(function() {
    container = jasmine.getEnv().getTestContainer();
  });

  it('can access container', function() {
    // we may draw on container now :o)
  });
});
```

The container hijacks the [jasmine reporters](https://jasmine.github.io/2.0/boot.html#section-Reporters) feature to get access to the currently executed spec and create the container for it. Check out the [implementation](https://github.com/bpmn-io/jasmine-test-container-support/blob/master/index.js).


## LICENSE

MIT