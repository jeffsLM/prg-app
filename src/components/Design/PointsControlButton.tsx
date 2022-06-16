import { HStack, Button, ButtonProps } from '@chakra-ui/react';

interface PointsControlButtonProps extends ButtonProps {
    simple?: boolean;
}


export function PointsControlButton({ simple = false }: PointsControlButtonProps) {
    if (simple) {
        return (
            <HStack spacing="6" w="100%" justify="center" m="2">
                <Button colorScheme='blue' fontWeight="500" variant='solid'>
                    -1
                </Button>
                <Button colorScheme='blue' fontWeight="500" variant='solid'>
                    +1
                </Button>
            </HStack>)
    }

    return (
        <HStack spacing="6" w="100%" justify="center" m="2">
            <Button colorScheme='blue' fontWeight="500" variant='solid'>
                -10
            </Button>
            <Button colorScheme='blue' fontWeight="500" variant='solid'>
                -1
            </Button>
            <Button colorScheme='blue' fontWeight="500" variant='solid'>
                +1
            </Button>
            <Button colorScheme='blue' fontWeight="500" variant='solid'>
                +10
            </Button>
        </HStack>

    );
}