import { Center, Image, Text, Flex, CenterProps } from '@chakra-ui/react'


interface ContentNumberPRGProps extends CenterProps {
    title: string;
    value: number;
    data:{
        id_character: string;
        skill: string;
        class_group: string;
        icon: string;
        type: string;
        points: number;
        rules: string;
    }
}

export function ContentNumberPRG({title, value,minH = 5,maxWidth="150",...rest}:ContentNumberPRGProps) {
    return (
        <Center borderRadius="12" border='2px' borderColor='gray.200' w="100%" p="2" minH={minH} maxWidth="150" {...rest} bgColor="blue.800">
            <Flex justify="space-between" align="center" w="100%" >
                <Text fontWeight={250} fontSize={12}>{title}</Text>
                <Text>{value}</Text>
            </Flex>
        </Center>
    );
}