import { 
  Button as ChakraButton, 
  ButtonProps as ChakraButtonProps 
} from '@chakra-ui/button';

interface ButtonProps extends ChakraButtonProps {
  title: string;

}

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <ChakraButton
      bg="blue.100"
      fontWeight="medium"
      _hover={{
        bg: 'blue.150'
      }}
      {...rest}
    >
      { title }
    </ChakraButton>
  )
}