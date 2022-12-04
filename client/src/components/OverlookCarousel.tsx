import {Carousel} from "@mantine/carousel";
import OverlookCarouselSlide from "./OverlookCarouselSlide";
import LogoWithName from '../assets/logoWithName.png'
import AddExpenses from '../assets/addExpenses.svg'
import Charts from '../assets/charts.svg'
import SpendingMoney from '../assets/spendingMoney.svg'
import AnimationService from "../services/animationService";
import AnimatedWrapper from "../hoc/AnimatedWrapper";

const indicatorStyles = {
  width: 12,
  height: 8,
  transition: 'width 250ms ease',
  backgroundColor: "#BFC3C3",
  '&[data-active]': {
    width: 40,
    backgroundColor: "#1FA98A"
  },
}

const OverlookCarousel = () => {
  const carouselAnimationsVariants = AnimationService.fadeInDown({delay: 0.3})

  return (
    <AnimatedWrapper whileInView={"whileInView"} initial={"initial"} variants={carouselAnimationsVariants}>
      <Carousel
        sx={{maxWidth: 720}}
        mx={"1rem"}
        withIndicators
        withControls={false}
        height={400}
        styles={{indicator: indicatorStyles}}
      >
        <OverlookCarouselSlide
          text={"We are a community, together we are helping people to control their budget"}
          imageWidth={"100%"}
          image={LogoWithName}
        />
        <OverlookCarouselSlide
          text={"Add your expenses and incomes"}
          imageWidth={"40%"}
          image={AddExpenses}
        />
        <OverlookCarouselSlide
          text={"See the charts and statics of your data"}
          imageWidth={"60%"}
          image={Charts}
        />
        <OverlookCarouselSlide
          text={"Draw conclusions and spend your money wisely"}
          imageWidth={"40%"}
          image={SpendingMoney}
        />
      </Carousel>
    </AnimatedWrapper>
  )
}

export default OverlookCarousel
