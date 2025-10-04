import {
  CardBody,
  Heading,
  Icon,
  SimpleGrid,
  Text,
  VStack
} from '@chakra-ui/react'
import { features } from '../../assets'
import { useBrandColors } from '../../hooks/useBrandColors'
const FeatureList = () => {
  const { borderColor, bg } = useBrandColors()
  return (
    <SimpleGrid mt={8} columns={{ base: 1, sm: 1, md: 2, lg: 4 }} spacing={4}  >
      {Array.isArray(features) &&
        features.map((feature, index) => (
          <MotionCard
            key={index}
            textAlign="center"
            bg={bg}
            border={'1px solid'}
            borderColor={borderColor}
            direction="row"
            align="center"
            gap={3}
            p={4}
            w="100%"
            mx="auto"
            borderRadius="2xl"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            m={0}
          >
            <CardBody bg={'transparent'} m={0} >
              <VStack spacing={4}>

                {feature.icon && (
                  <Icon as={feature.icon} boxSize={8} color="brand.primary" />
                )}
                <Heading size="md">{String(feature.title || '')}</Heading>
                <Text color="gray.600" fontSize="sm">
                  {String(feature.description || '')}
                </Text>
              </VStack>
            </CardBody>
          </MotionCard>
        ))}
    </SimpleGrid>
  )
}

export default FeatureList