import { showSunBackground } from '../../Utilities/helperFunctions';

const Message = ({ message }: { message : string }) => {
    return (
        <div className={`message ${showSunBackground(message)}`}>
            <p>{message}</p>
        </div>
    );
};

export default Message;
