import { HStack, Box, Text, Flex, FlexProps } from '@chakra-ui/react'

interface BarsStatusProps extends FlexProps {
    Label?: string;
    visible?: boolean;
}

export function BarsStatus({ Label,visible=true,w }: BarsStatusProps) {
    const Life = [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,16,17,18, 19, 20, 21,22,23,24,25,26,27]


    return (
        <Flex direction="column" flex="1" w={w} >
            {Label && (<Text>{Label}</Text>)}
            <Flex direction="row" justify="space-between" align="center" >
                <HStack spacing="1">
                    {Life.map((i, v) =>
                        <Box
                            key={i.toString()}
                            w="2"
                            h="10"
                            bgColor="green.50"
                            borderRadius="full"
                        />
                    )}
                    {Life.map((i, v) =>
                        <Box
                            key={i.toString()}
                            w="2"
                            h="10"
                            bgColor="green.900"
                            borderRadius="full"
                        />
                    )}
                </HStack>
                <Text>
                   { visible? `650/1000`: '-/-'}
                </Text>
            </Flex>
        </Flex>
    );
}