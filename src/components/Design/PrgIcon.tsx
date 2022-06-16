import { Box, Flex, Image, ImageProps, Text, Tooltip } from '@chakra-ui/react';

interface PrgIconProps extends ImageProps {
    renderImage?: Boolean;
    points?: number;
}

export function PrgIcon({ points, renderImage = false, src, boxSize, ...rest }: PrgIconProps) {
    return (
        <Tooltip colorScheme="blue" label={renderImage ?'':'Especial Points'}>
            <Flex justify="center">
                <Box
                    boxShadow="lg"
                    p="4"
                    alignItems="center"
                    rounded="lg"
                    bgGradient="linear( 258deg,blue.50 0%,blue.800 100%)"
                >
                    {renderImage ? <Image src={src} alt="PrgIcon" boxSize={boxSize} /> : <Text minW="7" w={boxSize} textAlign="center">{points}</Text>}
                </Box>
            </Flex>
        </Tooltip>
    );
}