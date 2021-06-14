import { useEffect, useState, useMemo } from 'react';
import debounced from 'lodash.debounce';
import { cloneDeep } from 'lodash';

/**
 * A batch object stored in the changeset, uses for appending changes in the front-end to the changeset.
 */
export interface Batch<T> {
  key: string | number;
  change: T;
}

/**
 * Hook to track changes in the front-end and debounce by the provided delay and call the callFunc.
 * @param callFunc The function to call on the last invocation after the delay.
 * @param delay In ms how long the last invocation should wait before executing another.
 */
export const useBatchUpdater = <T>(
  callFunc: (changes: Batch<T>[]) => any,
  delay: number,
): [Batch<T>[], (batchChange: Batch<T>) => void] => {
  // changeset store for the invocation period.
  const [batch, setBatch] = useState<Array<Batch<T>>>([]);

  /**
   * After the delay, call the provided function with the batch changes for that invocation period.
   * @private
   */
  const _triggerBatchUpdateDebounced = useMemo(() => {
    return debounced((batch: Array<Batch<T>>) => {
      callFunc(batch);
    }, delay);
  }, [callFunc, delay]);

  useEffect(() => {
    if (batch.length !== 0) {
      _triggerBatchUpdateDebounced(batch);
    }
    return () => {
      _triggerBatchUpdateDebounced.cancel();
    };
  }, [_triggerBatchUpdateDebounced, batch]);

  /**
   *
   * @param batchChange A change to track and store in the changeset for the next invocation.
   * @returns void
   */
  const appendChangeToBatch = (batchChange: Batch<T>): void => {
    _triggerBatchUpdateDebounced.cancel();
    const batchSet = cloneDeep(batch);
    const batchPosition = batchSet.findIndex((b: Batch<T>) => b.key === batchChange.key);
    if (batchPosition > -1) {
      batchSet[batchPosition] = batchChange;
      setBatch(batchSet);
      return;
    }
    batchSet.push(batchChange);
    setBatch(batchSet);
    return;
  };

  return [batch, appendChangeToBatch];
};
