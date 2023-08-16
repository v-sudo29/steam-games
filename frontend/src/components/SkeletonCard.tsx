import { Card, Skeleton, SkeletonText, useBreakpointValue } from "@chakra-ui/react"

export default function SkeletonCard() {
  const skeletonHeight = useBreakpointValue({
    base: '45%',
    sm: '55%',
    md: '45%'
  })

  const cardPaddingTop = useBreakpointValue({
    base: '80%',
    xs: '60%',
    sm: '70%',
    md: '75%'
  })

  const skeletonTextMarginTop = useBreakpointValue({
    base: '0rem',
    sm: '1rem',
    md: '0rem',
  })

  const skeletonTextHeight = useBreakpointValue({
    base: '0.4rem',
    xs: '0.6rem',
    sm: '0.6rem',
    md: '0.6rem',
    lg: '0.8rem'
  })

  const spacing = useBreakpointValue({
    xs: '1rem',
    s: '1rem',
    md: '0.8rem',
    lg: '0.5rem'
  })

  return (
      <Card
        borderRadius='0.8rem'
        pos='relative'
        height='0'
        pt={cardPaddingTop}
      >
        <Skeleton 
          pos='absolute'
          top='6%'
          left='4%'
          h={skeletonHeight}
          w='92%'
          borderRadius='0.4rem'
        />
        <SkeletonText
          pos='absolute'
          top='60%'
          left='5%'
          w='90%'
          mt={skeletonTextMarginTop}
          skeletonHeight={skeletonTextHeight}
          noOfLines={3}
          spacing={spacing}
        />
      </Card>
  )
}
