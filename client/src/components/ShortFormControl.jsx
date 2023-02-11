import { Input, FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@chakra-ui/react';

export default function ShortFormControl(props) {
  const { label, type = 'text', info } = props;
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input type={type} {...props} />
      {info ? <FormHelperText>{info}</FormHelperText> : ''}
    </FormControl>
  );
}
