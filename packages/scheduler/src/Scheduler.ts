// 实现一个单线程任务调度器
import {
  PriorityLevel,
  NoPriority,
  ImmediatePriority,
  UserBlockingPriority,
  NormalPriority,
  LowPriority,
  IdlePriority,
} from "./SchedulerPriorities";

type Callback = (arg: boolean) => Callback | null | undefined;

// 任务池，存成最小堆
const taskQueue: Array<Task> = [];

// 当前的任务
let currentTask: Task | null = null;
// 当前任务类型
let currentPriorityLevel: PriorityLevel = NoPriority;

// 任务调度器的入口函数
function scheduleCallback(priorityLevel: PriorityLevel, callback: Callback) {}

// 取消某个任务, 由于最小堆没法直接删除,因此只能初步把task.callback设置null
// 调度过程中，当这个任务位于堆顶时，就删除
function cacelCallback() {
  currentTask.callback = null;
}

// 获取当前执行任务的优先级
function getCurrentPriorityLevel(): PriorityLevel {
  return currentPriorityLevel;
}

export {
  NoPriority,
  ImmediatePriority,
  UserBlockingPriority,
  NormalPriority,
  LowPriority,
  IdlePriority,
  scheduleCallback,
  cacelCallback,
  getCurrentPriorityLevel,
};
