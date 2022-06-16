import { Flex, Text, Box ,BoxProps} from '@chakra-ui/react'
import { useState, useEffect } from 'react'

interface PlayerStatusProps extends BoxProps {
    value: number; 
    maxValue: number;
    colorActivate: string;
    colorDesactive: string;
    barsCount?: number;
}

export function PlayerStatus({ value, maxValue, colorActivate, colorDesactive,barsCount = 15,h=7,w=2,ml="1.4px" }: PlayerStatusProps) {
    const Life =  Object.keys(new Array(barsCount).fill(null)).map(Number);

    return (
        <Flex align="center">
            {Life.map((i, v) => {
                return (<Box
                    key={i.toString()}
                    w={w}
                    h={h}
                    ml={ml}
                    bgColor={i <= Math.ceil(Life.length * value / maxValue) ? colorActivate : colorDesactive}
                    borderRadius="full"
                    css={`transition: all 1.3s ease-out;`}
                />)

            }
            )}
            <Text ml="2">
                {value}/{maxValue}
            </Text>
        </Flex>

    )
}