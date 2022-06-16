import { Input as ChakraInput, FormLabel, FormControl, InputProps as ChakraInputProps,FormErrorMessage } from '@chakra-ui/react'
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { useForm,FieldError } from 'react-hook-form'

interface InputProps extends ChakraInputProps {
    name: string;
    label?: string;
    error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name,error = null,size="md", label, ...rest }, ref) => {
    const { register } = useForm()
    
    return (
        <FormControl isInvalid={!!error}>
            {!!label && <FormLabel htmlFor={name}>
                {label}
            </FormLabel>}
            <ChakraInput
                name={name}
                id={name}
                focusBorderColor="blue.500"
                bgColor="blue.900"
                variant="filled"
                _hover={{
                    bgColor: 'blue.900'
                }}
                size={size}
                ref={ref}
                {...rest}
            />
            {!!error && (<FormErrorMessage>{error.message}</FormErrorMessage>)}
        </FormControl>
    );
}

export const Input = forwardRef(InputBase)