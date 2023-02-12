import { Input, FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@chakra-ui/react';

export default function ShortFormControl(props) {
  const { label, type = 'text', variant = 'outline', info } = props;
  return (
    <FormControl>
      {label ? <FormLabel>{label}</FormLabel> : ''}
      <Input {...{ type, variant }} {...props} />
      {info ? <FormHelperText>{info}</FormHelperText> : ''}
    </FormControl>
  );
}
