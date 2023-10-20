# youngbinback

영차영차앱 백앤드 nodejs

### 컴퓨터가 소스 코드를 이해하려면?

- 컴퓨터 프로세스는 0과 1만 이해할 수 있기 때문에 우리가 작성한 소스 코드를 머신 코드로 변환해 줘야 한다.
- 이 변환 과정은 컴파일과 인터프리터를 통해 일어난다.

- Interpreter(인터프리터)

  - 한 줄씩 번역 및 분석
  - 실행할 때마다 한줄 씩 번역

- Compiler(컴파일)

  - 코드를 한번에 기계어로 변환

- 자바스크립트는 단순한 인터프리터였지만, 최신 엔진은 성능 향상을 위해 Just-In-Time 컴파일을 사용한다.

- JIT Compiler (Just In Time)
  - 인터프리터 언어는 컴파일 되는 다른 언어보다 한줄 한줄 해석하고 실행하기 때문에 매우 느리다.
  - 현재 웹에서도 지도 기능등 Heavy한 기능들도 수행하고 있기에 현재는 더 나은 퍼포먼스를 위해 JIT 컴파일을 이용하고 있다.

### Nodejs runtime

- 런타임이란 프로그래밍 언어가 구동되는 환경을 말한다.
- 그러기에 Nodejs나 크롬 등의 여러 브라우저들에서 자바스크립트가 구동이 되기에 Nodejs나 브라우저들도 자바스크립트 런타임이다.
- Nodejs는 프로그래밍 언어도 프레임워크도 아닌 자바스크립트 런타임이다.

### Nodejs REPL

- REPL은 Read-Eval(evaluation)-Print Loop의 약어로 사용자가 특정 코드를 입력하면 그 코드를 평가하고 코드의 실행결과를 출력해주는 것을 반복해주는 환경을 말한다.
- READ -> EVAL -> PRINT -> READ ..... (LOOP!)

### Browser API & Nodejs API

- 브라우저와 nodejs 모두에서 사용하는 API

  - 대표적으로 console api

- 브라우저 API인 window 객체 사용

  - 이 window 객체는 자바스크립트가 아닌 브라우저에서 제공해주는 객체이다.
  - 그러므로 nodejs REPL 환경에서는 사용할 수 없다.

- Nodejs API인 Process 객체 사용
  - 이 process 객체는 자바스크립트가 아닌 nodejs에서 제공해주는 객체이다.

### Module

- Nodejs에서 module은 '필요한 함수들의 집합'을 의미한다.
- 사용하고자 하는 모든 기능을 다 자신이 처음부터 만들어서 사용할 수 없으므로 이미 만들어진 모듈을 이용하여 사용할 수 있다.
- 모듈을 가져와 사용할 때는 require 모듈을 이용해서 다른 모듈들을 가져올 수 있다.
- 모듈의 종류에는 Core Module, Local Module, Third Party Module이 있다.
- const module = require("modue_name");
- requre() 함수를 이용해서 자바스크립트 파일을 읽고 그 파일을 실행시켜 객체를 반환한다.
- 모듈을 가져와서 변수 또는 상수에 할당해서 사용할 수 있다.

- Core Module

  - Nodejs에서 기본적으로 제공하는(내제되어 있는)모듈.
  - http, url, querystring, path, fs, util ...

- 모듈의 장점
  - 재사용할 수 있다.
  - 관계가 있는 코드끼리 모아 놓아서 코드를 정리할 수 있다.
  - 관계없는 디테일한 부분은 숨기고 직접 사용되는 코드만 가져와서 보여줄 수 있다.
