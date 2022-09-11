import styled from 'styled-components';

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	margin: ${props => props.form && "5vh auto"};
	background-color: #262020;
	borderRadius: 8px;
	width: ${props => props.w || "40%"};
	* {
		color: white;
	}

	padding: 2em 4em;


	button {
		margin: 1em 0;
	}

	h1 {
		font-size: 25px;
		margin-bottom: 1em;
	}

	input {
		margin: 0.5em 0;
		background-color: #252323;
		border: none;
	}

	@media only screen and (max-width: 1000px) {
		width: 100%;
		padding: 1em 2em;
	}

`;

export const Container = styled.section`
	padding: 1em;
	background-color: #252323;
	min-height: 95vh;
	color: white;
	width: 100%;
`;

