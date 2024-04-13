interface PaymentMethodProps {
  cardId?: number;
  nameOnCard: string;
  cardNumber: string;
  expirationDate: string;
}

const PaymentMethod = (props: PaymentMethodProps) => {
  return (
    <div className="my-auto flex h-10 w-[20rem] place-content-center rounded-lg bg-slate-700">
      <h1 className="pb-10">Payment Method #{props.cardId}</h1>
    </div>
  );
};

export default PaymentMethod;
