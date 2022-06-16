import { Flex, Text, Box, HStack, Grid, FlexProps } from '@chakra-ui/react'

import { PrgIcon } from '../Design/PrgIcon'
import { PlayerStatus } from '../PlayerStatus'

interface PlayerProps extends FlexProps {
    hp: number;
    mp: number;
    maxHp: number;
    maxMp: number;
    PlayerName: string;
    Class: string;
    statusAtMoment?: string;
    placing: number;
    points: number;
}

export function Player({ points, hp, mp, maxHp, maxMp, PlayerName, placing, Class, onClick }: PlayerProps) {
    return (
        <Flex
            onClick={onClick}
            direction="column"
            w="100%"
            p="3"
            bgGradient={"linear(238deg, blue.900 0%,blue.700 100%)"}
            borderRadius={10}
            cursor="pointer"
        >
            <Flex pl="10" justify="space-between" align="center">
                <Text >{PlayerName}</Text>
                <Text fontSize="12" fontWeight="100" >{Class}</Text>

            </Flex>
            <HStack direction="row" spacing="6" w="100%" align="center" >
                <Text>{placing}</Text>
                <PrgIcon points={points} src="/images/mage@2x.png" boxSize='35px' />
                <Flex direction="column" >
                    <PlayerStatus value={hp} maxValue={maxHp} colorActivate="green.50" colorDesactive="green.800" />
                    <PlayerStatus value={mp} maxValue={maxMp} colorActivate="blue.300" colorDesactive="blue.800" />
                </Flex>
                <Box w="10px" h="10px" bg="green.100" borderRadius="full" />
            </HStack>
        </Flex>
    );
}