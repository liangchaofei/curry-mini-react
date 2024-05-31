export type Heap<T extends Node> = Array<T>;

export type Node = {
  id: number; // 任务的唯一标识
  sortIndex: number; // 排序的依据
};
// 获取堆顶元素
export function peek<T extends Node>(heap: Heap<T>): T | null {
  return heap.length > 0 ? heap[0] : null;
}

// 给堆添加元素
export function push<T extends Node>(heap: Heap<T>, node: T): void {
  const index = heap.length;
  heap.push(node);
  siftUp(heap, node, index);
}
function siftUp<T extends Node>(heap: Heap<T>, node: T, i: number): void {
  let index = i;
  while (index > 0) {
    const parentIndex = (index - 1) >>> 1;
    const parent = heap[parentIndex];

    if (compare(parent, node) > 0) {
      heap[parentIndex] = node;
      heap[index] = parent;
      index = parentIndex;
    } else {
      return;
    }
  }
}
export function pop<T extends Node>(heap: Heap<T>): T | null {
  if (heap.length === 0) {
    return null;
  }
  const first = heap[0];
  const last = heap.pop();
  if (last !== first) {
    if (last) {
      heap[0] = last;
      siftDown(heap, last, 0);
    }
  }
  return first;
}

function siftDown<T extends Node>(heap: Heap<T>, node: T, i: number): void {
  let index = i;
  const length = heap.length;
  const halfLength = length >>> 1;
  while (index < halfLength) {
    const leftIndex = (index + 1) * 2 - 1;
    const left = heap[leftIndex];
    const rightIndex = leftIndex + 1;
    const right = heap[rightIndex];
    if (compare(left, node) < 0) {
      if (rightIndex < length && compare(right, left) < 0) {
        heap[index] = right;
        heap[rightIndex] = node;
        index = rightIndex;
      } else {
        heap[index] = left;
        heap[leftIndex] = node;
        index = leftIndex;
      }
    } else if (rightIndex < length && compare(right, node) < 0) {
      heap[index] = right;
      heap[rightIndex] = node;
      index = rightIndex;
    } else {
      return;
    }
  }
}

function compare(a: Node, b: Node) {
  const diff = a.sortIndex - b.sortIndex;

  return diff !== 0 ? diff : a.id - b.id;
}
