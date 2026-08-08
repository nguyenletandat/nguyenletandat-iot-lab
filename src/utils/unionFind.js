/**
 * Cấu trúc Union-Find (Disjoint Set) dùng chung cho các engine kiểm tra tính liên
 * thông của mạch điện (passiveCircuit.js, activeCircuit.js) — gộp các "nút" (chân
 * linh kiện) nối với nhau qua dây hoặc qua linh kiện dẫn điện xuyên 2 chân.
 */
export class UnionFind {
  constructor() { this.parent = new Map(); }
  ensure(x) { if (!this.parent.has(x)) this.parent.set(x, x); }
  find(x) {
    this.ensure(x);
    while (this.parent.get(x) !== x) {
      this.parent.set(x, this.parent.get(this.parent.get(x)));
      x = this.parent.get(x);
    }
    return x;
  }
  union(a, b) {
    const ra = this.find(a), rb = this.find(b);
    if (ra !== rb) this.parent.set(ra, rb);
  }
}

export const nodeKey = (compId, portId) => `${compId}:${portId}`;
