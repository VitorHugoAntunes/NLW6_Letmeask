import { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import googleIconImg from '../../assets/images/google-icon.svg';
import githubIcon from '../../assets/images/github-icon.svg';

import { Button } from '../../components/Button';

import '../../styles/auth.scss';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';

export function Home(){
    const history = useHistory();
    const { user, signInWithGoogle, signInWithGitHub } = useAuth();
    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoomWithGoogle(){
        if(!user) {
            await signInWithGoogle();
        }

        history.push('/rooms/new')
    }
    async function handleCreateRoomWithGitHub(){
        if(!user) {
            await signInWithGitHub();
        }

        history.push('/rooms/new')
    }

    async function handleJoinRoom(event: FormEvent){
        event.preventDefault();

        if(roomCode.trim() === ''){
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()){
            alert('Room does not exists.');
            return;
        }

        if(roomRef.val().endedAt) {
            alert('Room already closed.')
            return;
        }

        history.push(`rooms/${roomCode}`)
    }
    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração de perguntas e respostas" />
                <strong>Crie salas Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <button onClick={handleCreateRoomWithGoogle} className="create-room google">
                        <img src={googleIconImg} alt="Logo da Google" />
                        Crie uma sala com o Google
                    </button>
                    <button onClick={handleCreateRoomWithGitHub} className="create-room github">
                        <img src={githubIcon} alt="Logo do GitHub" />
                        Crie uma sala com o GitHub
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}