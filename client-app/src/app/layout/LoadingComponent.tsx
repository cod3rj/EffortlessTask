import { Dimmer } from 'semantic-ui-react';
import './loadingStyle.css';

interface Props {
    inverted?: boolean;
    content?: string;
}

export const LoadingComponent = ({ inverted = true, content = 'Loading...' }: Props) => {
    return (
        <>
            <Dimmer active={true} inverted={inverted}>
                <div className="loader" content={content}></div>
            </Dimmer>
        </>
    );
};