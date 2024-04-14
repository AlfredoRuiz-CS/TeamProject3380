interface PaymentMethodProps {
  cardId?: number;
  nameOnCard: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  cardtype?: string;
}

const PaymentMethod = (props: PaymentMethodProps) => {
  return (
    <div className="h-auto w-64 rounded-md border bg-cardwhite px-4 font-inter text-sm shadow-sm duration-300 ease-in-out hover:bg-cardwhite/90">
      <button>
        <h1 className="font-medium">
          {'Payment Method ' + '#' + props.cardId}{' '}
        </h1>
        <h1>{'\nName On Card: ' + props.nameOnCard}</h1>
        <h1>{'\nLast 4 Digits: ' + props.cardNumber.slice(-4)}</h1>
      </button>
    </div>
  );
};

export default PaymentMethod;
