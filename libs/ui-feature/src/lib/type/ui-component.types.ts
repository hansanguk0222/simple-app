import * as CSS from 'csstype';
import * as React from 'react';
import { FunctionComponent } from 'react';

type Properties = CSS.Properties<string | number>;
type StyleObject = Properties & {
  [key in string]: Properties[keyof Properties] | StyleObject;
};

type StyleOverride<Props> =
  | StyleObject
  | ((props: { $theme: any } & React.PropsWithChildren<Props>) => StyleObject);

export interface OverrideObject<Props> {
  component?: FunctionComponent<OverrideObject<Props>>;
  props?: Props;
  style?: StyleOverride<Props>;
}
