import { Box, BoxProps, Flex, Text, VStack, Center, Link } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { PrgIcon } from '../Design/PrgIcon'
import { Button } from '../Design/Button'

export const MotionBox = motion<BoxProps>(Box);

interface CardProps {
    hrefPlay?: string
    hrefEdit?: string
    itsCompleted?: boolean
    isActive?: boolean
}

export function Card({ hrefPlay, hrefEdit, itsCompleted = false, isActive }: CardProps) {
    return (
        <Flex
            minWidth={250}
            w="85%"
            maxW={550}
            ml={40}
            h="70vh"
            bg="blue.700"
            justify="center"
            p="8"
            direction="column"
            css={`transform: scale(${isActive ? "1" : "0.85"});
      transition: all 0.45s ease-out;
            `}
        >
            <VStack spacing="16" >
                <PrgIcon renderImage src="/images/mage@2x.png" boxSize="90px" alt="IconSelector" />
                <Center >
                    <Flex direction="column" pt="1.5" ml="2" alignItems="center">
                        <Text fontSize="22" fontWeight="500">
                            Elysium
                        </Text>
                        <Text fontSize="16" fontWeight="100">
                            Saga's
                        </Text>
                    </Flex>
                </Center>
            </VStack>
            <Link
                href={itsCompleted ? hrefPlay : hrefEdit}
                style={{ textDecoration: 'none' }}
            >
                <Button w="100%" text={itsCompleted ? "Play" : "Criar"} />
            </Link>
            {itsCompleted && (<Link
                href={hrefEdit}

                style={{ textDecoration: 'none' }}
            >
                <Button w="100%" text="Editar" isEdited />
            </Link>)}
        </Flex>
    );
}