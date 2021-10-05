import { useEffect, useState } from 'react'
import { BehaviorSubject } from 'rxjs'

export function useBehaviorSubject<T>(
  subject$: BehaviorSubject<T> | undefined,
): T | undefined {
  const [subscribed, setSubscribed] = useState<T | undefined>(
    subject$?.getValue(),
  )

  useEffect(() => {
    if (subject$) {
      const sub = subject$.subscribe(setSubscribed)
      return () => sub.unsubscribe()
    }
  }, [subject$])

  return subscribed
}
