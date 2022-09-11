interface OrderFormValues {
  productName: string;
  manufacture: string;
  productImgUrl: string;
  EA: string;
  price: string;
}

interface ReviewFormValues {
  content: string;
  date: string;
  score: number;
}

interface AllOfFormValues {
  orderFormValues: OrderFormValues;
  reviewFormValues: ReviewFormValues;
}

type FormType = keyof AllOfFormValues;
type PickFormSet<T extends FormType> = AllOfFormValues[T];

const d: FormType = 'reviewFormValues';

type FType = PickFormSet<typeof d>;
const f: keyof FType = 'content';

export type { OrderFormValues, AllOfFormValues, PickFormSet, FormType };
