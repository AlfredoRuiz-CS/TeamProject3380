import React, { PropsWithChildren } from 'react';

interface ErrorTextProps {}

const ErrorText: React.FC<PropsWithChildren<ErrorTextProps>> = ({ children }) => (
<span className="text-red-600">{children}</span>
);

export default ErrorText;