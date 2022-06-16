import { Box, Text } from "@chakra-ui/react";

interface StoryProps{
    title: string;
    content: string;
}

export function Story({title,content}) {
    return (
        <Box direction="column" alignSelf="stretch" align="start" justify="flex-start">
            <Text fontSize="xx-large" mb="5">
            {title}
            </Text>
            <Text fontWeight="200">
                {content}
            </Text>
        </Box>
    );

}