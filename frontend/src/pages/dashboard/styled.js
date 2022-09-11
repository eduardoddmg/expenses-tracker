import styled from 'styled-components';
import { Container as ContainerGeral, Form as FormGeral } from '../../styles/geral';


export const Container = styled(ContainerGeral)`
	padding: 1em 8%;
	* {
		color: white;
	}
	h1 {
		font-size: 25px;
		margin: 1em 0;
	}

	button {
		margin-bottom: 10em 0;
	}

	@media only screen and (max-width: 1000px) {
		padding: 1em 2%;
	}
`;

export const Form = styled(FormGeral)``;

export const Button = styled.button`
	color: ${props => props.color};
	font-weight: bold;

	* {
		font-weight: bold;
		font-size: 20px;
		color: ${props => props.color};
	}
`;

export const ContainerSpinner = styled.section`
	margin: 10vh auto;
`

export const ContainerWidth = styled.section`
	max-width: 1600px;
	margin: 0 auto;
	padding: 1em 8%;
	
	h1 {
		font-size: 25px;
		margin: 1em 0;
	}

	button {
		margin-bottom: 10em 0;
	}

	@media only screen and (max-width: 1000px) {
		padding: 1em 2%;
	}
`;