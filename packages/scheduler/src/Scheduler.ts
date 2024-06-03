// 实现一个单线程任务调度器
import { getCurrentTime } from "../../shared/utils";
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

export type Task = {
  id: number;
  callback: Callback | null;
  priorityLevel: PriorityLevel;
  startTime: number;
  expirationTime: number;
  sortIndex: number;
}
// 任务池，存成最小堆
const taskQueue: Array<Task> = [];

// 当前的任务
let currentTask: Task | null = null;
// 当前任务类型
let currentPriorityLevel: PriorityLevel = NoPriority;


let startTime = -1;
let frameInterval = 5;

let isPerformingWork = false;
function shouldYieldToHost() {
  const timeElapsed = getCurrentTime() - startTime;
  if (timeElapsed < frameInterval) {
    return false
  }
  return true
}

// 任务调度器的入口函数
function scheduleCallback(priorityLevel: PriorityLevel, callback: Callback) { }

// 取消某个任务, 由于最小堆没法直接删除,因此只能初步把task.callback设置null
// 调度过程中，当这个任务位于堆顶时，就删除
function cacelCallback() {
  currentTask!.callback = null;
}

// 有很多task, 
function workLoop(initialTime: number): boolean {
  let currentTime = initialTime;
  currentTask = peek(taskQueue)
  while (currentTask !== null) {
    if (currentTask.expirationTime > currentTime && shouldYieldToHost()) {
      break;
    }
    const callback = currentTask.callback;
    if (typeof callback === 'function') {
      currentTask.callback = null;
      currentPriorityLevel = currentTask.priorityLevel
      const didUserCallbackTimeout = currentTask.expirationTime <= currentTime;
      const continuationCallback = callback(didUserCallbackTimeout)
      if (typeof continuationCallback === 'function') {
        currentTask.callback = continuationCallback
        return true
      } else {
        if (currentTask === peek(currentTask)) {
          pop(taskQueue)
        }
      }
    } else {
      pop(taskQueue)
    }
    currentTask = peek(taskQueue)
  }

  if (currentTask !== null) {
    return true
  } else {
    return false
  }
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
