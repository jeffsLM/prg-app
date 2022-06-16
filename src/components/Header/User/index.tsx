import { HStack, Box, Icon, Text, useBreakpointValue } from '@chakra-ui/react'
import { AiOutlineDoubleRight } from "react-icons/ai";

interface UserProps { isWideVersion: boolean }

export function User({ isWideVersion }: UserProps) {


  return (
    <HStack
      align="center"
      spacing={["2", "8"]}
      bg="blue.700"
      borderRadius={["none","full"]}
      maxHeight="10"
      p={["2", "4"]}>
      {isWideVersion && (
        <>
          <Box
            bgGradient="linear(238deg, blue.50 0%,blue.900 100%)"
            borderRadius={["none", "full"]}
            h="5"
            w="5" />
          <Text
            fontSize="14"
            justify="start">
            Mestre
          </Text>
        </>)}
      <Icon as={AiOutlineDoubleRight} />
    </HStack>
  );
}