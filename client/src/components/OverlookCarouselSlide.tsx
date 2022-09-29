import {FC} from 'react'
import {Carousel} from "@mantine/carousel";
import {Image, Text} from "@mantine/core";

interface PropsType {
  text: string
  image: string
  imageWidth: string
}

const slideStyles: {} = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
}

const OverlookCarouselSlide: FC<PropsType> = ({text, image, imageWidth}) => {
  return (
    <Carousel.Slide style={slideStyles}>
      <Image
        src={image}
        alt={text}
        style={{width: imageWidth}}
      />
      <Text mt={"1.5rem"} weight={300} align={"center"}>{text}</Text>
    </Carousel.Slide>
  )
}

export default OverlookCarouselSlide
