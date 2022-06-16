import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/react'

interface ButtonProps extends ChakraButtonProps {
    text: string;
    isEdited?: boolean;
}

export function Button({ text, type,isEdited, ...rest }: ButtonProps) {
    return (
        <ChakraButton
            boxShadow="md"
            p="4"
            rounded="md"
            type={type}
            size="lg"
            mt="6"
            bgGradient={isEdited ?"" : "linear( 258deg,blue.50 0%,blue.800 100%)"}
            variant={isEdited ? "outline" : "none"}
            fontWeight="400"
            colorScheme="whiteAlpha"
            cursor="pointer"
            {...rest}
        >
            {text}
        </ChakraButton>
    );
}