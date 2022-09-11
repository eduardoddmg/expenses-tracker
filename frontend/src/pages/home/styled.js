import styled from 'styled-components';

export const Container = styled.section`
	padding: 1em 8%;
	max-width: 1600px;
	display: flex;
	margin: 0 auto;

	section {
		padding: 1em 0;
		width: 50%;
		display: flex;
		flex-direction: column;

		* {
			margin: 0.3em 0;
		}

		h1 {
			margin-top: 1.5em;
			font-size: 30px;
			font-weight: bold;
		}

		p {
			font-size: 18px;
		}

		button {
			align-self: flex-start;
			padding: 1em 3em;
		}

		img {
			text-align: center;
			width: 50%;
		}

	}
	@media only screen and (max-width: 1000px) {
		flex-direction: ${props => props.reverse ? "column-reverse" : "column"};
		padding: 1em 2%;

		section {
			width: 100%;
		}

		img {
			width: 100%;
		}
	}
`;

export const ContainerWidth = styled.section`
	width: 100%;
`