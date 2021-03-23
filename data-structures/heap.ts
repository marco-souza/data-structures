class Heap {
  constructor(
    public size = 0,
    private heapArray: number[] = Array.from({ length: 0 }),
    private capacity = 10,
  ) {}

  public peek() {
    if (this.size == 0) throw new Error("heap is empty");
    return this.heapArray[0];
  }

  public pool() {
    if (this.size == 0) throw new Error("heap is empty");
    const item = this.heapArray[0];
    this.heapArray[0] = this.heapArray[this.size - 1];
    this.size--;
    this.heapifyDown();
    return item;
  }

  public add(item: number) {
    this.ensureExtractCapacity();
    this.heapArray[this.size] = item;
    this.size++;
    this.heapifyUp();
  }

  private heapifyUp = () => {
    let index = this.size - 1;
    while (
      this.hasParent(index) && this.parent(index) > this.heapArray[index]
    ) {
      // bobble down heap value
      this.swap(this.getParentIndex(index), index);
      index = this.getParentIndex(index);
    }
  };
  private heapifyDown = () => {
    let index = 0;
    while (this.hasLeftChild(index)) {
      // fixup my heap
      let smallerChildIndex = this.getLeftChildIndex(index);
      if (
        this.hasRightChild(index) &&
        this.rightChild(index) < this.leftChild(index)
      ) {
        smallerChildIndex = this.getRightChildIndex(index);
      }

      if (this.heapArray[index] < this.heapArray[smallerChildIndex]) {
        // is ordered, stop!
        break;
      } else {
        this.swap(index, smallerChildIndex);
      }
      index = smallerChildIndex;
    }
  };

  private getLeftChildIndex = (parentIndex: number) => 2 * parentIndex + 1;
  private getRightChildIndex = (parentIndex: number) => 2 * parentIndex + 2;
  private getParentIndex = (childIndex: number) => Math.floor((childIndex) / 2);

  private hasLeftChild = (index: number) =>
    this.getLeftChildIndex(index) < this.size;
  private hasRightChild = (index: number) =>
    this.getRightChildIndex(index) < this.size;
  private hasParent = (index: number) => this.getParentIndex(index) < this.size;

  private leftChild = (index: number) =>
    this.heapArray[this.getLeftChildIndex(index)];
  private rightChild = (index: number) =>
    this.heapArray[this.getRightChildIndex(index)];
  private parent = (index: number) =>
    this.heapArray[this.getParentIndex(index)];

  private swap = (indexOne: number, indexTwo: number) => {
    [this.heapArray[indexTwo], this.heapArray[indexOne]] = [
      this.heapArray[indexOne],
      this.heapArray[indexTwo],
    ];
  };

  private ensureExtractCapacity = () => {
    if (this.size == this.capacity) {
      this.heapArray = [
        ...this.heapArray,
        ...Array.from({ length: this.capacity }).map(() => NaN),
      ];
      this.capacity *= 2;
    }
  };
}

export function run() {
  console.log("Running Heap Sort...")

  const list = [91, 23, 45, 5, 2, 3, 234, 123, 4];
  const sortedList = [];
  const sortHeap = new Heap();
  for (const item of list) {
    sortHeap.add(item);
  }
  while (sortHeap.size > 0) {
    const value = sortHeap.pool();
    sortedList.push(value);
  }

  console.log("Initial List", list);
  console.log("Ordered List", sortedList);
}

if (import.meta.main) {
  run();
}
