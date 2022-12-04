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
  slideInRight({delay = 0, duration = .3}): Variants {
    return {
      animate: {
        x: 0,
        transition: {
          delay,
          duration
        }
      },
      initial: {
        x: -10
      },
    }
  }
}

export default new AnimationService()
