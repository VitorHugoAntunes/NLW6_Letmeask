import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import googleIconImg from '../../assets/images/google-icon.svg'
import githubIconImg from '../../assets/images/github-icon.svg'
import closeIcon from '../../assets/images/close.svg'

import './styles.scss'

type RoomParams = {
    id: string;
}

type CloseModalProps ={
    closeModal: () => void;
}

export function ModalComponent({ closeModal }: CloseModalProps){
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
        <div className="modal-background">
            <div className="modal-container">
                <button onClick={() => closeModal()}>
                    <img src={closeIcon} alt="Fechar" />
                </button>
                <div className="modal-content">
                    <div className="modal-title">Escolha um método de login abaixo:</div>
                    <div className="modal-body">
                        <button onClick={handleCreateRoomWithGoogle} className="login-button google">
                            <img src={googleIconImg} alt="Logo da Google" />
                            Login com o Google
                        </button>
                        <button onClick={handleCreateRoomWithGitHub} className="login-button github">
                            <img src={githubIconImg} alt="Logo do GitHub" />
                            Login com o GitHub
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}