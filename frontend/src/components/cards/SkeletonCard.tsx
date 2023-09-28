import { Card, Skeleton, SkeletonText } from "@chakra-ui/react"

const SkeletonCard = () => {
  const useSkeletonTextHeight = (): string => {
    if (window.innerWidth < 480) return '0.5rem';
    if (window.innerWidth < 640) return '0.6rem';
    if (window.innerWidth < 768) return '0.8rem';
    return '0.7rem';
  }

  const useSkeletonHeight = (): string => {
    if (window.innerWidth < 480) return '55%'
    if (window.innerWidth < 768) return '55%'
    return '45%'
  }

  const useSkeletonTextMarginTop = (): string => {
    if (window.innerWidth < 480) return '1.5rem'
    if (window.innerWidth < 768) return '1.5rem'
    return '0rem'
  }

  const useSkeletonTextSpacing = (): string => {
    if (window.innerWidth < 480) return '0.5rem'
    if (window.innerWidth < 700) return '0.8rem'
    return '0.5rem'
  }

  const useCardPaddingTop = (): string => {
    if (window.innerWidth < 320) return '80%'
    if (window.innerWidth < 480) return '80%'
    if (window.innerWidth < 700) return '75%'
    return '75%'
  }

  const useSkeletonTextNumLines = (): number => {
    if (window.innerWidth < 320) return 3 
    if (window.innerWidth < 632) return 3
    if (window.innerWidth < 700) return 2
    return 3
  }

  const responsiveTextHeight = useSkeletonTextHeight(); // no base value
  const responsiveHeight = useSkeletonHeight()
  const responsiveMarginTop = useSkeletonTextMarginTop()
  const responsiveTextSpacing = useSkeletonTextSpacing()
  const responsiveCardPaddingTop = useCardPaddingTop()
  const responsiveNumLines = useSkeletonTextNumLines()

  return (
    <article aria-busy='true' aria-label='Loading'>
      <Card
        borderRadius='0.8rem'
        pos='relative'
        height='0'
        pt={responsiveCardPaddingTop}
        bg='#1C222C'
      >
        <Skeleton
          role='img'
          pos='absolute'
          top='6%'
          left='5%'
          h={responsiveHeight}
          w='90%'
          borderRadius='0.4rem'
          startColor='#2F3740'
        />
        <SkeletonText
          pos='absolute'
          top='60%'
          left='5%'
          w='90%'
          mt={responsiveMarginTop}
          skeletonHeight={responsiveTextHeight}
          noOfLines={responsiveNumLines}
          spacing={responsiveTextSpacing}
          startColor='#2F3740'
        />
      </Card>
    </article>
  )
}

export default SkeletonCard