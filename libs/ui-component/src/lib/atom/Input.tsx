import { OverrideObject } from '@simple-app/ui-feature/lib/type/ui-component.types';
import { get, merge } from 'lodash';
import React, { PropsWithChildren } from 'react';
import { useStyletron } from 'styletron-react';
import { useForm } from 'react-hook-form';
import {
  AllOfFormValues,
  FormType,
  PickFormSet,
} from '@simple-app/ui-feature/lib/type/form.type';

type InputOverrides = {
  Root?: Omit<OverrideObject<InputProps>, 'component'>;
};

interface InputProps extends React.InputHTMLAttributes<InputProps> {
  overrides?: InputOverrides;
  formType: FormType;
  valueKey: keyof PickFormSet<InputProps['formType']>;
}

const Input = ({
  overrides,
  autoComplete,
  placeholder,
  defaultValue,
  formType,
  valueKey,
  id,
  ...props
}: PropsWithChildren<InputProps>) => {
  const [css] = useStyletron();
  const { register } = useForm<AllOfFormValues[typeof formType]>();

  return (
    <input
      autoComplete={autoComplete}
      placeholder={placeholder}
      id={id}
      defaultValue={defaultValue}
      className={css(get(overrides, 'Root.style', {}))}
      {...merge(props, get(overrides, 'Root.props', {}))}
      {...register(valueKey)}
    />
  );
};

export { Input };
export type { InputProps, InputOverrides };
