import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import googleIconImg from '../../assets/images/google-icon.svg'
import githubIconImg from '../../assets/images/github-icon.svg'

import './styles.scss'

type CloseModalProps ={
    closeModal: () => void;
}

type RoomParams = {
    id: string;
}

export function LoginButtons({ closeModal }: CloseModalProps){
    const { user, signInWithGoogle, signInWithGitHub } = useAuth();
    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;

    async function handleCreateRoomWithGoogle(){
        if(!user) {
            await signInWithGoogle();
        }
    
        closeModal()
        history.push(`/rooms/${roomId}`)
    }
    
    async function handleCreateRoomWithGitHub(){
        if(!user) {
            await signInWithGitHub();
        }
    
        closeModal()
        history.push(`/rooms/${roomId}`)
    }

    return (
        <>
            <button onClick={handleCreateRoomWithGoogle} className="login-button google">
                <img src={googleIconImg} alt="Logo da Google" />
                Login com o Google
            </button>
            <button onClick={handleCreateRoomWithGitHub} className="login-button github">
                <img src={githubIconImg} alt="Logo do GitHub" />
                Login com o GitHub
            </button>
        </>
    );
}