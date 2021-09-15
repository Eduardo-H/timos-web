import { ElementType, forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';
import { 
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Icon,
  InputLeftElement,
  InputGroup
} from '@chakra-ui/react';

interface InputProps extends ChakraInputProps{
  name: string;
  label?: string;
  icon?: ElementType;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> 
  = ({ name, label, icon, error = null, ...rest }, ref) => {
    return (
      <FormControl isInvalid={!!error}>
        { !!label && 
          <FormLabel htmlFor={name} mb="1">
            {label}
          </FormLabel> 
        }

        <InputGroup>
          { icon && (
            <InputLeftElement
              h="100%"
              pointerEvents="none"
              pl="2"
              children={<Icon as={icon} fontSize={20} color="gray.300" />}
            />
          ) }
          
          <ChakraInput
            name={name}
            id={name}
            bgColor="blue.800"
            variant="filled"
            _focus={{
              bgColor: 'blue.800',
              borderColor: 'blue.100'
            }}
            _hover={{
              bgColor: "blue.800"
            }}
            size="lg"
            ref={ref}
            placeholder={label}
            fontSize={{ base: '0.9rem', sm: '1rem' }}
            pl={icon && "2.75rem"}
            {...rest}
          />
        </InputGroup>

        { !!error && 
          <FormErrorMessage mt="1.5">
            {error.message}
          </FormErrorMessage>
        }
      </FormControl>
    );
}

export const Input = forwardRef(InputBase);