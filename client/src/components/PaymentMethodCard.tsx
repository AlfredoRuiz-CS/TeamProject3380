import { Button } from '@/components/ui/button';
import { PaymentMethod } from '@/pages/Profile';

interface PaymentMethodProps {
  cardId?: number;
  passedPaymentMethod: PaymentMethod;
  onSelect: (p: PaymentMethod) => void;
  onDelete: (p: PaymentMethod) => void;
}

const PaymentMethodCard = (props: PaymentMethodProps) => {
  return (
    <div className="h-auto w-64 gap-2 rounded-md border bg-cardwhite px-4 pb-3 font-inter text-sm shadow-sm duration-300 ease-in-out hover:bg-cardwhite/90">
      <button>
        <h1 className="font-medium">
          {'Payment Method ' + '#' + props.cardId}{' '}
        </h1>
        <h1>{'\nName On Card: ' + props.passedPaymentMethod?.nameOnCard}</h1>
        <h1>
          {'\nLast 4 Digits: ' +
            props.passedPaymentMethod?.cardnumber.slice(-4)}
        </h1>
      </button>
      <div className="mx-auto w-full flex-row pt-2">
        <Button
          className="mr-2 bg-blue-500 text-black"
          onClick={() => props.onSelect(props.passedPaymentMethod)}>
          Select
        </Button>
        <Button
          className="bg-red-500 text-black"
          onClick={() => props.onDelete(props.passedPaymentMethod)}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethodCard;
