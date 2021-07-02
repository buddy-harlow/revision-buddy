import React from 'react';

import FormInput from '../Form-Input'
import { SignInBlock, Buttons, Title, Button, Container, PageContainer} from './SignInElements'

import { auth, signInWithGoogle } from '../../firebase/firebase.utils'

class SignIn extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''

        }
    }

    handleChange = event => {
       const { value, name } = event.target;
            this.setState({ [name]: value })
            
    }

    handleSubmit = async  event => {
        event.preventDefault();

        const { email, password } = this.state;

        try {
          await auth.signInWithEmailAndPassword(email, password);
          this.setState({email: '', password: ''})  
        } catch (error){
            console.log(error);

        }

    };

    render() {
        return(
            <PageContainer>
            <Container>
            <SignInBlock>
                <Title>I already have an account</Title>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name="email" type="email" placeholder="Email" value={this.state.email} label="email" handleChange={this.handleChange} required />
                    <FormInput name="password" type="password" placeholder="Password" value={this.state.password} label="password" handleChange={this.handleChange} required />
                    <Buttons>
                    <Button type="submit">Sign in</Button>
                    <Button onClick={signInWithGoogle} type="button" isGoogleSignIn>Sign in with Google</Button>
                    </Buttons>
                </form>
            </SignInBlock>
            </Container>
            </PageContainer>
        )
    }
}

export default SignIn;