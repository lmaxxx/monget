import {Children, cloneElement, FC, ReactElement, ReactNode, useEffect} from 'react'
import { useInView } from 'react-intersection-observer';

interface PropsType {
  children: ReactNode
  fetch: () => void
  loadMore: boolean
}

const LazyLoader: FC<PropsType> = ({children, loadMore, fetch}) => {
  const items = Children.toArray(children)
  const {ref, inView} = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if(loadMore && inView) fetch()
  }, [inView]);

  return (
    <>
      {
        Children.map(items, (child, index) => {
          const isLast = index === items.length - 1

          return cloneElement(child as ReactElement, isLast ? {ref}: {})
        })
      }
    </>
  )
}

export default LazyLoader
