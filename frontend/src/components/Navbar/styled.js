import styled from 'styled-components';
import { Link } from 'react-router-dom';

const color = "#262020";

export const Navbar = styled.nav`
	padding: 1em 8%;
	display: flex;
	max-width: 1600px;
	margin: 0 auto;
	justify-content: ${props => !props.active && "space-between"};
	align-items: center;

	a:first-child {
		margin-right: 1em;
	}
	a {
		margin: 0 1em;
		color: white;
		font-weight: bold;
	}

	@media only screen and (max-width: 1000px) {
		padding: 1em 2%;
		flex-direction: column;
		width: 100%;
		section {
			width: 100%;
		}
		background-color: ${color};
		height: ${props => props.active && "100vh"};
		position: ${props => props.active && "fixed"};
		z-index: ${props => props.active && "9999"};
	}
`

export const NavbarHome = styled.section`
	display: flex;
	justify-content: space-between;
	align-items: center;
	button {
		display: none;
		* {
			font-size: 30px;
			font-weight: bold;
		}
	}

	@media only screen and (max-width: 1000px) {
		width: 100%;

		button {
			display: block;
		}
	}
`;

export const NavbarLink = styled(Link)`
	
`;


export const NavbarOthersLinks = styled.section`
	@media only screen and (max-width: 1000px) {
		margin: 20vh 0;
		font-size: 25px;
		display: ${props => props.active ? "flex" : "none"};
		flex-direction: column;
		align-items: center;
		gap: 30px;
	}
`;

export const ContainerWidth = styled.section`
	width: 100%;
	background-color: ${color};
`