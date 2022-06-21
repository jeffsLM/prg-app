import { Center, Image, Text, Flex, CenterProps } from '@chakra-ui/react'


interface ContentTextWithModalPRGProps extends CenterProps {
    title: string;
    rules: string;
    value: number;
    data: {
        id_character: string;
        skill: string;
        class_group: string;
        icon: string;
        type: string;
        points: number;
        rules: string;
    }
}

export function ContentTextPRG({ title, rules, value, minH = "100", maxWidth = "20", ...rest }: ContentTextWithModalPRGProps) {
    return (
        <Center
            borderRadius="24"
            border='2px'
            borderColor='gray.200'
            w="100%"
            p="2"
            minH={minH}
            minWidth={200}
            bgColor="blue.800"
            {...rest}>
            <Flex
                justify="space-between"
                direction="column"
                align="center"
                w="100%">
                <Text
                    align="center"
                    mb="2"
                    w="100%"
                    fontSize="sm"
                    >{title}</Text>
                <Text
                    fontWeight={250}
                    fontSize={12}
                    mb="2"
                    noOfLines={1}>{rules}</Text>
                <Text
                    noOfLines={1}
                    fontSize={12}
                    fontWeight={800}>{value}</Text>
            </Flex>
        </Center>
    );
}