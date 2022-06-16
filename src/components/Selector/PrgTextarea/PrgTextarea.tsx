import { ForwardRefRenderFunction, forwardRef } from 'react'
import { Textarea as ChakraTextarea, TextareaProps as ChakraTextareaProps, FormControl,FormErrorMessage } from '@chakra-ui/react'
import { useForm, FieldError } from 'react-hook-form'
interface TextareaProps extends ChakraTextareaProps {
    label?: string;
    error?: FieldError;
}


const Textarea: ForwardRefRenderFunction<HTMLTextAreaElement, TextareaProps> = ({ error = null, ...rest }, ref) => {

    return (
        <FormControl isInvalid={!!error}>
    
            <ChakraTextarea
                w="100%"
                minH="22"
                variant="filled"
                bg="blue.900"
                borderColor="blue.900"
                resize="none"
                colorScheme="blue"
                ref={ref}
                focusBorderColor="blue.500"
                _hover={{
                    bgColor: "blue.900",
                }}
                css={{
                    '&::-webkit-scrollbar': { width: '4px' },
                    '&::-webkit-scrollbar-track': { width: '6px' },
                    '&::-webkit-scrollbar-thumb': {
                        background: `rgba(1,24,40,1)`,
                        borderRadius: '24px',
                    },
                }}
                {...rest}
            />
             {!!error && (<FormErrorMessage>{error.message}</FormErrorMessage>)}
        </FormControl>
    );
}

export const PrgTextarea = forwardRef(Textarea)