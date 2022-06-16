import { Flex,FlexProps, Box, Heading ,Image} from '@chakra-ui/react'

interface LogoProps extends FlexProps{
    fontSize: string;
}
export function Logo({p=4,fontSize,flexDir,direction,boxSize,...rest}: LogoProps) {
    return (
        <Flex  direction={flexDir}>
            <Flex justify="center">
                <Box
                  boxShadow="md"
                  p={p}
                  alignItems="center"
                  rounded="lg"
                  bgGradient="linear( 258deg,blue.50 0%,blue.800 100%)"

                  {...rest}>
                    <Image src="/images/mage@2x.png" boxSize={boxSize}   alt="Jf Labs" />
                </Box>
            </Flex>
            <Flex direction={direction} pt="1.5" ml="2" alignItems="center">
                <Box>
                    <Heading as="h4" fontSize={fontSize} fontWeight="400">
                        PRG
                    </Heading>
                    <Heading as="h4" fontSize={fontSize} fontWeight="100" ml="5">
                        Table Master
                    </Heading>
                </Box>
            </Flex>
        </Flex>
    );
}