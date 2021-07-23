import React from 'react';

export default function SignIn() {
  return (

	<form action="/authenticate" method="POST">
		<fieldset>
			<label for="email">E-mail</label>
			<input type="email" name="email" inputcode="email" autocomplate="username" />
		</fieldset>
		<fieldset>
			<label for="password">Senha</label>
			<input type="password" name="password" autocomplate="username" />
		</fieldset>
		<button type="submit">Entrar</button>
	</form>

	);
}



	