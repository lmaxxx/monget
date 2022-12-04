import {Children, cloneElement, forwardRef, ReactElement, ReactNode} from 'react'
import {motion} from "framer-motion";

interface PropsType {
  children: ReactNode
}

const AnimatedWrapper = forwardRef<HTMLDivElement, PropsType>(({children}, ref) => {
  const item = Children.toArray(children)

  return (
    <>
      {
        Children.map(item, child => {
          return cloneElement(child as ReactElement, {ref})
        })
      }
    </>
  )
})

export default motion(AnimatedWrapper)
