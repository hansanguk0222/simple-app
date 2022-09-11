import { OverrideObject } from '@simple-app/ui-feature/lib/type/ui-component.types';
import { get, merge } from 'lodash';
import { useStyletron } from 'styletron-react';

type SubmitButtonOverrides = {
  Root?: Omit<OverrideObject<SubmitButtonProps>, 'component'>;
};

interface SubmitButtonProps
  extends React.InputHTMLAttributes<SubmitButtonProps> {
  overrides: SubmitButtonOverrides;
}

const SubmitButton = ({ overrides, value, ...props }: SubmitButtonProps) => {
  const [css] = useStyletron();
  return (
    <input
      type="submit"
      value={value}
      className={css(get(overrides, 'Root.style', {}))}
      {...merge(props, get(overrides, 'Root.props', {}))}
    />
  );
};

export { SubmitButton };
export type { SubmitButtonProps, SubmitButtonOverrides };
