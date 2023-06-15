import { LanguageCode } from '../../Models/app.data.models';
import { showSunBackground } from '../../Utilities/helperFunctions';

interface MessageProps {
    message: string;
    language: LanguageCode;
}

const Message = (props: MessageProps) => {
    const { message, language } = props;
    return (
        <div className={`message ${showSunBackground(message, language)}`}>
            <p>{message}</p>
        </div>
    );
};

export default Message;
