// p5.js 전역 이름 선언 — VS Code 빨간 줄(Cannot find name ...) 제거용
// p5.js는 <script> 태그로 불러오는 전역 라이브러리라 에디터가 이름을 알 수 없음

declare const p5: any;

declare const width: number;
declare const height: number;
declare const windowWidth: number;
declare const windowHeight: number;
declare const mouseX: number;
declare const mouseY: number;
declare const TWO_PI: number;
declare const ADD: number;
declare const BLEND: number;

declare function createCanvas(w: number, h: number): any;
declare function resizeCanvas(w: number, h: number): void;
declare function createVector(x?: number, y?: number, z?: number): any;
declare function background(...args: any[]): void;
declare function blendMode(mode: number): void;
declare function random(...args: any[]): any;
declare function circle(x: number, y: number, d: number): void;
declare function fill(...args: any[]): void;
declare function noStroke(): void;
