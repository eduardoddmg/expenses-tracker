export * from './auth';
export * from './transaction';

import { TransactionProvider} from './transaction';
import { AuthProvider } from './auth';

export const ContextProvider = ({ children }) => {
	return (
		<>	
			<AuthProvider>
				<TransactionProvider>
					{children}					
				</TransactionProvider>
			</AuthProvider>
		</>
	)
}