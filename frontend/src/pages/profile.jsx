import { Heading, Text, Box, Button, VStack } from '@chakra-ui/react';
import { useAuth } from '../context';
import { NavbarProfile } from '../components';
import { Link } from 'react-router-dom';

const Profile = () => {
	const auth = useAuth();
	const username = auth.username[0].toUpperCase() + auth.username.slice(1);

	// const goToHome = () => navigate('/');
	return (
		<>
			<NavbarProfile />
        	<Box py={5} px="15%">
				<Heading size="md">
					{username}
				</Heading>
				<Box py={5}>
	          		<Heading size="md">
	          			Descrição
	          		</Heading>
	          		<Text>Eu quero conseguir dinheiro para alcançar liberdade financeira</Text>
				</Box>
				<Box>
	          		<Heading size="md" pb={4}>
          				Objetivos
          			</Heading>
          			<Button colorScheme="green" variant="outline">Adiconar</Button>
				</Box>
			</Box>
		</>
	)
};

export default Profile;