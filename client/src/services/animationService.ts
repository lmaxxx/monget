import {Variants} from 'framer-motion'

class AnimationService {
  fadeInDown({delay = 0, duration = .3}): Variants {
    return {
      whileInView: {
        opacity: 1,
        y: 0,
        transition: {
          delay,
          duration
        }
      },
      initial: {
        opacity: 0,
        y: -10
      },
    }
  }

  fadeInRight({delay = 0, duration = .3}): Variants {
    return {
      whileInView: {
        opacity: 1,
        x: 0,
        transition: {
          delay,
          duration
        }
      },
      initial: {
        opacity: 0,
        x: -20
      },
    }
  }

  navbarSlide(isMobile: boolean): Variants {
    if (isMobile) {
      return {animate: {x: 0}, initial: {x: "-100vw"}}
    }

    return {}
  }
}

export default new AnimationService()
