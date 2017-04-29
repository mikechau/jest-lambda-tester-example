# jest-lambda-tester-example

## Getting Started

Replace `yarn` with `npm` if you are not using `yarn`.

```
git clone https://github.com/mikechau/jest-lambda-tester-example.git
cd jest-lambda-tester-example
yarn install
```

## Running Tests

```
yarn test
```

## Results

When the lambda function being tested is throwing an error, Jest does not give us the relevant stacktrace.

```
yarn test v0.23.2
$ jest 
 FAIL  test/lambda/index.spec.js
  ● lambda › it returns s3 params

    expecting result but error was thrown
      
      at FailError (node_modules/lambda-tester/lib/runner.js:25:9)
      at process._tickCallback (internal/process/next_tick.js:109:7)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.862s, estimated 1s
Ran all test suites.
error Command failed with exit code 1.
```

## Expected Results

A quickfix would be the add `console.log(err)` @ [`lib/runner.js:82`](https://github.com/vandium-io/lambda-tester/blob/f102e436fd25962e020f36acfa4c6e552d2d315d/lib/runner.js#L82:L83).

```
yarn test v0.23.2
$ jest 
 FAIL  test/lambda/index.spec.js
  ● Console

    console.error node_modules/lambda-tester/lib/runner.js:82
      TypeError: Cannot read property 'match' of undefined
          at getFullVersion (/jest-lambda-tester-example/src/lambda/events/release/s3.js:43:389)
          at getS3Params (/jest-lambda-tester-example/src/lambda/events/release/s3.js:49:21)
          at _callee$ (/jest-lambda-tester-example/src/lambda/index.js:9:45)
          at tryCatch (/jest-lambda-tester-example/node_modules/regenerator-runtime/runtime.js:65:40)
          at GeneratorFunctionPrototype.invoke [as _invoke] (/jest-lambda-tester-example/node_modules/regenerator-runtime/runtime.js:303:22)
          at GeneratorFunctionPrototype.prototype.(anonymous function) [as next] (/jest-lambda-tester-example/node_modules/regenerator-runtime/runtime.js:117:21)
          at step (/jest-lambda-tester-example/node_modules/babel-runtime/helpers/asyncToGenerator.js:17:30)
          at /jest-lambda-tester-example/node_modules/babel-runtime/helpers/asyncToGenerator.js:35:14
          at Promise.F (/jest-lambda-tester-example/node_modules/core-js/library/modules/_export.js:35:28)
          at /jest-lambda-tester-example/node_modules/babel-runtime/helpers/asyncToGenerator.js:14:12
          at /jest-lambda-tester-example/src/lambda/index.js:13:123
          at Array.map (native)
          at /jest-lambda-tester-example/src/lambda/index.js:7:38
          at /jest-lambda-tester-example/node_modules/apex.js/index.js:6:15
          at error (/jest-lambda-tester-example/node_modules/lambda-tester/lib/runner.js:150:25)
          at Promise.resolve.then (/jest-lambda-tester-example/node_modules/lambda-tester/lib/runner.js:137:24)
          at process._tickCallback (internal/process/next_tick.js:109:7)

  ● lambda › it returns s3 params

    expecting result but error was thrown
      
      at FailError (node_modules/lambda-tester/lib/runner.js:25:9)
      at process._tickCallback (internal/process/next_tick.js:109:7)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.867s, estimated 1s
Ran all test suites.
error Command failed with exit code 1.
```

Alternatively, the error message for `expecting result but error was thrown` could be formatted to be more detailed.

