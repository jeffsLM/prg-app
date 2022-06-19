

import { Input as ChakraInput,Select,SelectProps as ChakraSelectProps, FormLabel, FormControl, InputProps as ChakraInputProps, FormErrorMessage } from '@chakra-ui/react'

import { forwardRef, ForwardRefRenderFunction } from 'react';
import { useForm, FieldError } from 'react-hook-form'

type Array = {
    id: string;
    value: string;
}

interface SelectProps extends ChakraSelectProps {
    name: string;
    label?: string;
    error?: FieldError;
    objToMap: Array[]
}

const OptionBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = ({ name, error = null, size = "md", label,objToMap, ...rest }, ref) => {
    const { register } = useForm()

    return (
        <FormControl isInvalid={!!error}>
            {!!label && <FormLabel htmlFor={name}>
                {label}
            </FormLabel>}
            <Select
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
            >
                {
                    objToMap.map((data,index)=> <option key={`option_${name}_${index}`} style={{ background: "#051828" }} value={data.value}>{data.value}</option> )
                }
            </Select>
            {!!error && (<FormErrorMessage>{error.message}</FormErrorMessage>)}
        </FormControl>
    );
}

export const OptionSelector = forwardRef(OptionBase)